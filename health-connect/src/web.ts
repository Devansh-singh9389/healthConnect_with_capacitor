import { WebPlugin } from '@capacitor/core';

import type { HealthconnectPlugin, HealthDataResponse } from './definitions';

export class HealthconnectWeb extends WebPlugin implements HealthconnectPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async connect(options: { value: boolean }): Promise<{ value: boolean }> {
    console.log('Health Connect Web: connect called with value:', options.value);
    return { value: options.value };
  }

  async isAvailable(): Promise<{ value: boolean }> {
    console.log('Health Connect Web: isAvailable called');
    return { value: true };
  }

  async getHealthData(): Promise<HealthDataResponse> {
    console.log('Health Connect Web: getHealthData called');
    // Return mock data for web platform
    return {
      success: true,
      data: {
        steps: 8523,
        heartRate: 72,
        calories: 2150,
        distance: 6.5,
        sleepDuration: 7.5,
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        bloodGlucose: 95,
        oxygenSaturation: 98,
      },
      message: 'Health data retrieved (mock data for web)',
      availableDataTypes: {
        steps: true,
        heartRate: true,
        calories: true,
        distance: true,
        sleep: true,
      },
    };
  }

  async getSteps(options: { days?: number }): Promise<Record<string, number>> {
    console.log('Health Connect Web: getSteps called with days:', options.days);
    const days = options.days || 7;
    const data: Record<string, number> = {};
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      data[dateStr] = Math.floor(Math.random() * 10000) + 5000;
    }
    
    return data;
  }

  async getHeartRateHistory(options: { days?: number }): Promise<{ history: Array<{ timestamp: number; heartRate: number }> }> {
    console.log('Health Connect Web: getHeartRateHistory called with days:', options.days);
    const days = options.days || 7;
    const history = [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < days; i++) {
      for (let j = 0; j < 10; j++) {
        history.push({
          timestamp: now - (i * dayMs) - (Math.random() * dayMs),
          heartRate: 60 + Math.floor(Math.random() * 40),
        });
      }
    }
    
    return { history };
  }

  async requestPermissions(): Promise<{ permissions: string[] }> {
    console.log('Health Connect Web: requestPermissions called');
    return {
      permissions: ['steps', 'heartRate', 'calories', 'distance', 'sleep'],
    };
  }

  async hasPermissions(): Promise<{ hasPermissions: boolean }> {
    console.log('Health Connect Web: hasPermissions called');
    return { hasPermissions: true };
  }
}
