export interface HealthMetrics {
  steps: number;
  heartRate: number;
  calories: number;
  distance: number;
  sleepDuration: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodGlucose: number;
  oxygenSaturation: number;
}

export interface HealthDataResponse {
  success: boolean;
  data?: HealthMetrics;
  message: string;
  availableDataTypes: Record<string, boolean>;
}

export interface HealthconnectPlugin {
  connect(options: { value: boolean }): Promise<{ value: boolean }>;
  isAvailable(): Promise<{ value: boolean }>;
  getHealthData(): Promise<HealthDataResponse>;
  getSteps(options: { days?: number }): Promise<Record<string, number>>;
  getHeartRateHistory(options: { days?: number }): Promise<{ history: Array<{ timestamp: number; heartRate: number }> }>;
  requestPermissions(): Promise<{ permissions: string[] }>;
  hasPermissions(): Promise<{ hasPermissions: boolean }>;
}
