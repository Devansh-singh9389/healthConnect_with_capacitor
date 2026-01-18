/**
 * Health Connect Integration Examples
 * 
 * This file shows how to use the Healthconnect plugin to access health data
 */

import { Healthconnect } from './index';

/**
 * Get all health metrics at once
 */
export async function getAllHealthMetrics() {
  try {
    const data = await Healthconnect.getHealthData();
    if (data.success) {
      console.log('Steps:', data.data?.steps);
      console.log('Heart Rate:', data.data?.heartRate);
      console.log('Calories:', data.data?.calories);
      console.log('Distance:', data.data?.distance);
      console.log('Sleep Duration:', data.data?.sleepDuration);
      console.log('Blood Pressure:', `${data.data?.bloodPressureSystolic}/${data.data?.bloodPressureDiastolic}`);
      console.log('Blood Glucose:', data.data?.bloodGlucose);
      console.log('Oxygen Saturation:', data.data?.oxygenSaturation);
      return data.data;
    }
  } catch (error) {
    console.error('Error getting health data:', error);
  }
}

/**
 * Get steps for a specific number of days
 */
export async function getStepsData(days: number = 7) {
  try {
    const stepsData = await Healthconnect.getSteps({ days });
    console.log('Steps by date:', stepsData);
    return stepsData;
  } catch (error) {
    console.error('Error getting steps:', error);
  }
}

/**
 * Get heart rate history
 */
export async function getHeartRateData(days: number = 7) {
  try {
    const heartRateData = await Healthconnect.getHeartRateHistory({ days });
    console.log('Heart rate history:', heartRateData.history);
    return heartRateData.history;
  } catch (error) {
    console.error('Error getting heart rate history:', error);
  }
}

/**
 * Check and request permissions
 */
export async function setupHealthConnectPermissions() {
  try {
    const hasPerms = await Healthconnect.hasPermissions();
    
    if (!hasPerms.hasPermissions) {
      console.log('Requesting Health Connect permissions...');
      const result = await Healthconnect.requestPermissions();
      console.log('Granted permissions:', result.permissions);
    } else {
      console.log('Already has Health Connect permissions');
    }
  } catch (error) {
    console.error('Error managing permissions:', error);
  }
}

/**
 * Initialize Health Connect connection
 */
export async function initializeHealthConnect() {
  try {
    const isAvailable = await Healthconnect.isAvailable();
    
    if (isAvailable.value) {
      console.log('Health Connect is available');
      await Healthconnect.connect({ value: true });
      console.log('Connected to Health Connect');
      
      // Setup permissions
      await setupHealthConnectPermissions();
      
      return true;
    } else {
      console.log('Health Connect is not available on this device');
      return false;
    }
  } catch (error) {
    console.error('Error initializing Health Connect:', error);
    return false;
  }
}
