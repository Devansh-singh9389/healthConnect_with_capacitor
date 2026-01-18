package com.robter.health.connect

import android.content.Context
import android.content.Intent
import androidx.activity.result.contract.ActivityResultContract
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.HeartRateRecord
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.records.ActiveCaloriesBurnedRecord
import androidx.health.connect.client.records.DistanceRecord
import androidx.health.connect.client.records.SleepSessionRecord
import androidx.health.connect.client.records.BloodPressureRecord
import androidx.health.connect.client.records.BloodGlucoseRecord
import androidx.health.connect.client.records.OxygenSaturationRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.core.os.BuildCompat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.time.Instant
import java.time.Duration

class HealthConnectManager(private val context: Context) {
    private var healthConnectClient: HealthConnectClient? = null
    
    init {
        try {
            // Check if Health Connect is available on this device
            val sdkStatus = HealthConnectClient.getSdkStatus(context)
            if (sdkStatus == HealthConnectClient.SDK_AVAILABLE) {
                healthConnectClient = HealthConnectClient.getOrCreate(context)
                android.util.Log.d("HealthConnectManager", "Health Connect client initialized successfully")
            } else {
                android.util.Log.e("HealthConnectManager", "Health Connect is not available. SDK Status: $sdkStatus")
            }
        } catch (e: Exception) {
            android.util.Log.e("HealthConnectManager", "Failed to initialize Health Connect: ${e.message}")
        }
    }
    
    private val permissions = setOf(
        // Read permissions
        HealthPermission.getReadPermission(StepsRecord::class),
        HealthPermission.getReadPermission(HeartRateRecord::class),
        HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class),
        HealthPermission.getReadPermission(DistanceRecord::class),
        HealthPermission.getReadPermission(SleepSessionRecord::class),
        HealthPermission.getReadPermission(BloodPressureRecord::class),
        HealthPermission.getReadPermission(BloodGlucoseRecord::class),
        HealthPermission.getReadPermission(OxygenSaturationRecord::class),
        // Write permissions (required for Health Connect to show this app)
        HealthPermission.getWritePermission(StepsRecord::class),
        HealthPermission.getWritePermission(HeartRateRecord::class),
        HealthPermission.getWritePermission(ActiveCaloriesBurnedRecord::class),
        HealthPermission.getWritePermission(DistanceRecord::class),
        HealthPermission.getWritePermission(SleepSessionRecord::class),
        HealthPermission.getWritePermission(BloodPressureRecord::class),
        HealthPermission.getWritePermission(BloodGlucoseRecord::class),
        HealthPermission.getWritePermission(OxygenSaturationRecord::class)
    )

    suspend fun hasPermissions(): Boolean = withContext(Dispatchers.IO) {
        try {
            if (healthConnectClient == null) return@withContext false
            val grantedPermissions = healthConnectClient!!.permissionController.getGrantedPermissions()
            permissions.all { it in grantedPermissions }
        } catch (e: Exception) {
            android.util.Log.e("HealthConnectManager", "Error checking permissions: ${e.message}")
            false
        }
    }

    suspend fun requestPermissions(): List<String> = withContext(Dispatchers.IO) {
        try {
            if (healthConnectClient == null) return@withContext emptyList()
            
            // Get the currently granted permissions
            val grantedPermissions = healthConnectClient!!.permissionController.getGrantedPermissions()
            android.util.Log.d("HealthConnectManager", "Granted permissions: ${grantedPermissions.size}")
            grantedPermissions.toList()
        } catch (e: Exception) {
            android.util.Log.e("HealthConnectManager", "Error requesting permissions: ${e.message}")
            emptyList()
        }
    }
@OptIn(BuildCompat.PrereleaseSdkCheck::class)
    
    fun createPermissionRequestIntent(): Intent {
        // Use the PermissionController to create and get the permission request intent
        return PermissionController.createRequestPermissionResultContract()
            .createIntent(context, permissions)
    }

    suspend fun getRecentHealthData(): HealthDataResponse = withContext(Dispatchers.IO) {
        try {
            if (healthConnectClient == null) {
                return@withContext HealthDataResponse(
                    success = false,
                    message = "Health Connect is not available"
                )
            }
            
            val now = Instant.now()
            val startTime = now.minus(Duration.ofDays(7))

            val timeRange = TimeRangeFilter.between(startTime, now)

            // Get Steps
            var steps: Long = 0
            try {
                val stepsResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(StepsRecord::class, timeRange)
                )
                steps = stepsResponse.records.sumOf { it.count }
            } catch (e: Exception) {
                // Steps not available
            }

            // Get Heart Rate
            var heartRate: Long = 0
            try {
                val hrResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(HeartRateRecord::class, timeRange)
                )
                heartRate = hrResponse.records.lastOrNull()?.samples?.lastOrNull()?.beatsPerMinute ?: 0L
            } catch (e: Exception) {
                // Heart rate not available
            }

            // Get Calories
            var calories: Double = 0.0
            try {
                val caloriesResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(ActiveCaloriesBurnedRecord::class, timeRange)
                )
                calories = caloriesResponse.records.sumOf { it.energy.inKilocalories }
            } catch (e: Exception) {
                // Calories not available
            }

            // Get Distance
            var distance: Double = 0.0
            try {
                val distanceResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(DistanceRecord::class, timeRange)
                )
                distance = distanceResponse.records.sumOf { it.distance.inKilometers }
            } catch (e: Exception) {
                // Distance not available
            }

            // Get Sleep
            var sleepDuration: Long = 0
            try {
                val sleepResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(SleepSessionRecord::class, timeRange)
                )
                sleepDuration = sleepResponse.records.sumOf {
                    Duration.between(it.startTime, it.endTime).toHours()
                }
            } catch (e: Exception) {
                // Sleep data not available
            }

            // Get Blood Pressure
            var systolic = 0
            var diastolic = 0
            try {
                val bpResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(BloodPressureRecord::class, timeRange)
                )
                bpResponse.records.lastOrNull()?.let {
                    systolic = it.systolic.inMillimetersOfMercury.toInt()
                    diastolic = it.diastolic.inMillimetersOfMercury.toInt()
                }
            } catch (e: Exception) {
                // Blood pressure not available
            }

            // Get Blood Glucose
            var bloodGlucose: Double = 0.0
            try {
                val bgResponse = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(BloodGlucoseRecord::class, timeRange)
                )
                bloodGlucose = bgResponse.records.lastOrNull()?.level?.inMillimolesPerLiter ?: 0.0
            } catch (e: Exception) {
                // Blood glucose not available
            }

            // Get Oxygen Saturation
            var oxygenSaturation: Double = 0.0
            try {
                val o2Response = healthConnectClient!!.readRecords(
                    ReadRecordsRequest(OxygenSaturationRecord::class, timeRange)
                )
                oxygenSaturation = o2Response.records.lastOrNull()?.percentage?.value?.toDouble() ?: 0.0
            } catch (e: Exception) {
                // Oxygen saturation not available
            }

            val metrics = HealthMetrics(
                steps = steps,
                heartRate = heartRate,
                calories = calories,
                distance = distance,
                sleepDuration = sleepDuration,
                bloodPressureSystolic = systolic,
                bloodPressureDiastolic = diastolic,
                bloodGlucose = bloodGlucose,
                oxygenSaturation = oxygenSaturation
            )

            HealthDataResponse(
                success = true,
                data = metrics,
                message = "Health data retrieved successfully",
                availableDataTypes = getAvailableDataTypes()
            )
        } catch (e: Exception) {
            HealthDataResponse(
                success = false,
                message = "Error retrieving health data: ${e.message}"
            )
        }
    }

    suspend fun getSteps(days: Int = 7): Map<String, Long> = withContext(Dispatchers.IO) {
        try {
            if (healthConnectClient == null) return@withContext emptyMap()
            
            val now = Instant.now()
            val startTime = now.minus(Duration.ofDays(days.toLong()))
            val timeRange = TimeRangeFilter.between(startTime, now)

            val response = healthConnectClient!!.readRecords(
                ReadRecordsRequest(StepsRecord::class, timeRange)
            )

            response.records.groupBy { record ->
                record.startTime.toString().split("T")[0]
            }.mapValues { (_, records) ->
                records.sumOf { it.count }
            }
        } catch (e: Exception) {
            emptyMap()
        }
    }

    suspend fun getHeartRateHistory(days: Int = 7): List<Map<String, Any>> = withContext(Dispatchers.IO) {
        try {
            if (healthConnectClient == null) return@withContext emptyList()
            
            val now = Instant.now()
            val startTime = now.minus(Duration.ofDays(days.toLong()))
            val timeRange = TimeRangeFilter.between(startTime, now)

            val response = healthConnectClient!!.readRecords(
                ReadRecordsRequest(HeartRateRecord::class, timeRange)
            )

            response.records.flatMap { record ->
                record.samples.map { sample ->
                    mapOf(
                        "timestamp" to record.startTime.toEpochMilli(),
                        "heartRate" to sample.beatsPerMinute
                    )
                }
            }
        } catch (e: Exception) {
            emptyList()
        }
    }

    private suspend fun getAvailableDataTypes(): List<String> = withContext(Dispatchers.IO) {
        val availableTypes = mutableListOf<String>()

        try {
            if (healthConnectClient == null) return@withContext availableTypes
            
            val now = Instant.now()
            val startTime = now.minus(Duration.ofDays(1))
            val timeRange = TimeRangeFilter.between(startTime, now)

            // Check each data type
            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(StepsRecord::class, timeRange))
                availableTypes.add("steps")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(HeartRateRecord::class, timeRange))
                availableTypes.add("heartRate")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(ActiveCaloriesBurnedRecord::class, timeRange))
                availableTypes.add("calories")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(DistanceRecord::class, timeRange))
                availableTypes.add("distance")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(SleepSessionRecord::class, timeRange))
                availableTypes.add("sleep")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(BloodPressureRecord::class, timeRange))
                availableTypes.add("bloodPressure")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(BloodGlucoseRecord::class, timeRange))
                availableTypes.add("bloodGlucose")
            } catch (e: Exception) {}

            try {
                healthConnectClient!!.readRecords(ReadRecordsRequest(OxygenSaturationRecord::class, timeRange))
                availableTypes.add("oxygenSaturation")
            } catch (e: Exception) {}
        } catch (e: Exception) {
            android.util.Log.e("HealthConnectManager", "Error checking available data types: ${e.message}")
        }

        availableTypes
    }
}
