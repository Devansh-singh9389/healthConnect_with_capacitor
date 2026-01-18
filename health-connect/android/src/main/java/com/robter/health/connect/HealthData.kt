package com.robter.health.connect

data class HealthMetrics(
    val steps: Long = 0,
    val heartRate: Long = 0,
    val calories: Double = 0.0,
    val distance: Double = 0.0,
    val sleepDuration: Long = 0,
    val bloodPressureSystolic: Int = 0,
    val bloodPressureDiastolic: Int = 0,
    val bloodGlucose: Double = 0.0,
    val oxygenSaturation: Double = 0.0,
    val timestamp: Long = System.currentTimeMillis()
)

data class HealthDataResponse(
    val success: Boolean = false,
    val data: HealthMetrics? = null,
    val message: String = "",
    val availableDataTypes: List<String> = emptyList()
)
