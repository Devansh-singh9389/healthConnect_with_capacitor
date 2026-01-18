package com.robter.health.connect;

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.ActivityCallback
import androidx.activity.result.ActivityResult
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@CapacitorPlugin(name = "Healthconnect")
class HealthconnectPlugin : Plugin() {
    private lateinit var healthConnectManager: HealthConnectManager
    private var savedCall: PluginCall? = null

    override fun load() {
        super.load()
        healthConnectManager = HealthConnectManager(context)
    }

    @PluginMethod
    fun connect(call: PluginCall) {
        try {
            // Check if Health Connect is available
            val sdkStatus = androidx.health.connect.client.HealthConnectClient.getSdkStatus(context)
            android.util.Log.d("HealthConnect", "SDK Status: $sdkStatus")
            
            if (sdkStatus == androidx.health.connect.client.HealthConnectClient.SDK_UNAVAILABLE) {
                val result = JSObject()
                result.put("success", false)
                result.put("value", false)
                result.put("message", "Health Connect is not installed. Please install it from Play Store.")
                call.resolve(result)
                return
            }
            
            if (sdkStatus == androidx.health.connect.client.HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
                val result = JSObject()
                result.put("success", false)
                result.put("value", false)
                result.put("message", "Health Connect needs to be updated. Please update from Play Store.")
                call.resolve(result)
                return
            }
            
            // Store the call for the activity result callback
            savedCall = call
            
            // Launch Health Connect permission request
            val intent = healthConnectManager.createPermissionRequestIntent()
            startActivityForResult(call, intent, "healthConnectPermission")
        } catch (e: Exception) {
            android.util.Log.e("HealthConnect", "Error in connect: ${e.message}", e)
            val result = JSObject()
            result.put("success", false)
            result.put("value", false)
            result.put("message", "Failed to open Health Connect: ${e.message}")
            call.resolve(result)
        }
    }

    @ActivityCallback
    private fun healthConnectPermission(call: PluginCall, result: ActivityResult) {
        android.util.Log.d("HealthConnect", "Permission result received - resultCode: ${result.resultCode}")
        
        Thread {
            try {
                val sdkStatus = androidx.health.connect.client.HealthConnectClient.getSdkStatus(context)
                
                // Check if the user granted permissions in Health Connect UI
                val permissions = kotlinx.coroutines.runBlocking {
                    healthConnectManager.hasPermissions()
                }
                
                android.util.Log.d("HealthConnect", "Has permissions after result: $permissions")
                
                val response = JSObject()
                
                if (permissions) {
                    response.put("success", true)
                    response.put("value", true)
                    response.put("message", "Successfully connected to Health Connect")
                } else {
                    response.put("success", false)
                    response.put("value", false)
                    response.put("message", "No permissions granted. Please allow access in Health Connect.")
                }
                
                call.resolve(response)
            } catch (e: Exception) {
                android.util.Log.e("HealthConnect", "Error in callback: ${e.message}", e)
                val response = JSObject()
                response.put("success", false)
                response.put("value", false)
                response.put("message", "Error: ${e.message}")
                call.resolve(response)
            }
        }.start()
    }

    @PluginMethod
    fun isAvailable(call: PluginCall) {
        val result = JSObject()
        try {
            val sdkStatus = androidx.health.connect.client.HealthConnectClient.getSdkStatus(context)
            val isAvailable: Boolean = (sdkStatus == androidx.health.connect.client.HealthConnectClient.SDK_AVAILABLE)
            result.put("value", isAvailable)
            
            if (!isAvailable) {
                android.util.Log.d("HealthConnect", "SDK Status: $sdkStatus")
            }
        } catch (e: Exception) {
            android.util.Log.e("HealthConnect", "Error checking availability: ${e.message}")
            result.put("value", false)
        }
        call.resolve(result)
    }

    @PluginMethod
    fun getHealthData(call: PluginCall) {
        Thread {
            try {
                val healthData = kotlinx.coroutines.runBlocking {
                    healthConnectManager.getRecentHealthData()
                }
                
                val result = JSObject()
                result.put("success", healthData.success)
                result.put("message", healthData.message)
                
                healthData.data?.let { metrics ->
                    val dataObj = JSObject()
                    dataObj.put("steps", metrics.steps)
                    dataObj.put("heartRate", metrics.heartRate)
                    dataObj.put("calories", metrics.calories)
                    dataObj.put("distance", metrics.distance)
                    dataObj.put("sleepDuration", metrics.sleepDuration)
                    dataObj.put("bloodPressureSystolic", metrics.bloodPressureSystolic)
                    dataObj.put("bloodPressureDiastolic", metrics.bloodPressureDiastolic)
                    dataObj.put("bloodGlucose", metrics.bloodGlucose)
                    dataObj.put("oxygenSaturation", metrics.oxygenSaturation)
                    result.put("data", dataObj)
                }
                
                val availableTypes = JSObject()
                healthData.availableDataTypes.forEach { type ->
                    availableTypes.put(type, true)
                }
                result.put("availableDataTypes", availableTypes)
                
                call.resolve(result)
            } catch (e: Exception) {
                val error = JSObject()
                error.put("error", e.message)
                call.reject(e.message)
            }
        }.start()
    }

    @PluginMethod
    fun getSteps(call: PluginCall) {
        val days = call.getInt("days") ?: 7
        
        Thread {
            try {
                val stepsData = kotlinx.coroutines.runBlocking {
                    healthConnectManager.getSteps(days)
                }
                
                val result = JSObject()
                stepsData.forEach { (date, steps) ->
                    result.put(date, steps)
                }
                
                call.resolve(result)
            } catch (e: Exception) {
                call.reject(e.message)
            }
        }.start()
    }

    @PluginMethod
    fun getHeartRateHistory(call: PluginCall) {
        val days = call.getInt("days") ?: 7
        
        Thread {
            try {
                val heartRateHistory = kotlinx.coroutines.runBlocking {
                    healthConnectManager.getHeartRateHistory(days)
                }
                
                val result = JSObject()
                val historyArray = com.getcapacitor.JSArray()
                heartRateHistory.forEach { entry ->
                    val item = JSObject()
                    item.put("timestamp", entry["timestamp"])
                    item.put("heartRate", entry["heartRate"])
                    historyArray.put(item)
                }
                result.put("history", historyArray)
                
                call.resolve(result)
            } catch (e: Exception) {
                call.reject(e.message)
            }
        }.start()
    }

    @PluginMethod
    override fun requestPermissions(call: PluginCall) {
        Thread {
            try {
                val permissions = kotlinx.coroutines.runBlocking {
                    healthConnectManager.requestPermissions()
                }
                
                val result = JSObject()
                val permissionsArray = com.getcapacitor.JSArray()
                permissions.forEach { permission ->
                    permissionsArray.put(permission)
                }
                result.put("permissions", permissionsArray)
                
                call.resolve(result)
            } catch (e: Exception) {
                call.reject(e.message)
            }
        }.start()
    }

    @PluginMethod
    fun hasPermissions(call: PluginCall) {
        Thread {
            try {
                val hasPermissions = kotlinx.coroutines.runBlocking {
                    healthConnectManager.hasPermissions()
                }
                
                val result = JSObject()
                result.put("hasPermissions", hasPermissions)
                
                call.resolve(result)
            } catch (e: Exception) {
                call.reject(e.message)
            }
        }.start()
    }
}
