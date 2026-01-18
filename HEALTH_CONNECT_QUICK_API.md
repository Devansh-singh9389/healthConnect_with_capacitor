# Health Connect - Quick API Guide

Simple reference for using Health Connect in React

---

## Functions Overview

### Connection Functions

#### `isAvailable()`
Check if Health Connect is installed
```typescript
const result = await Healthconnect.isAvailable();
// Returns: { value: true/false }

if (result.value) {
  // Health Connect installed
} else {
  // Open Play Store
  window.open('https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata');
}
```

---

#### `connect()`
Request permission from user
```typescript
const result = await Healthconnect.connect({ value: true });
// Returns: { success: true/false, value: true/false, message: string }

if (result.success) {
  // Permissions granted - fetch data now
} else {
  console.log(result.message); // Show error
}
```

---

#### `hasPermissions()`
Check if already connected (use on app startup)
```typescript
const result = await Healthconnect.hasPermissions();
// Returns: { hasPermissions: true/false }

if (result.hasPermissions) {
  // Already connected - can fetch data
  fetchData();
} else {
  // Show connect button
  showConnectButton();
}
```

---

## Data Functions

### `getHealthData()`
Get all health metrics (last 7 days)

```typescript
const result = await Healthconnect.getHealthData();
// Returns: { success, data?, message, availableDataTypes }

if (result.success) {
  console.log(result.data.steps);                  // Number
  console.log(result.data.heartRate);              // Number (bpm)
  console.log(result.data.calories);               // Number (kcal)
  console.log(result.data.distance);               // Number (km)
  console.log(result.data.sleepDuration);          // Number (hours)
  console.log(result.data.bloodPressureSystolic);  // Number (mmHg)
  console.log(result.data.bloodPressureDiastolic); // Number (mmHg)
  console.log(result.data.bloodGlucose);           // Number (mmol/L)
  console.log(result.data.oxygenSaturation);       // Number (%)
}
```

**Use in React to display:**
```tsx
<div>
  <p>Steps: {data.steps.toLocaleString()}</p>
  <p>Heart Rate: {data.heartRate} bpm</p>
  <p>Calories: {data.calories.toFixed(1)} kcal</p>
  <p>Distance: {data.distance.toFixed(2)} km</p>
  <p>Sleep: {data.sleepDuration.toFixed(1)} hours</p>
  <p>BP: {data.bloodPressureSystolic}/{data.bloodPressureDiastolic}</p>
  <p>Blood Glucose: {data.bloodGlucose.toFixed(1)}</p>
  <p>SpO2: {data.oxygenSaturation}%</p>
</div>
```

---

### `getSteps()`
Get daily steps for N days

```typescript
const steps = await Healthconnect.getSteps({ days: 7 });
// Returns: { "2026-01-18": 8543, "2026-01-17": 12043, ... }

// Display all days:
Object.entries(steps).map(([date, count]) => (
  <div key={date}>{date}: {count} steps</div>
))

// Get today:
const today = new Date().toISOString().split('T')[0];
const todaySteps = steps[today] || 0;
console.log(`Today: ${todaySteps} steps`);

// Total:
const total = Object.values(steps).reduce((sum, val) => sum + val, 0);
console.log(`Total: ${total} steps`);
```

---

### `getHeartRateHistory()`
Get heart rate measurements with timestamps

```typescript
const result = await Healthconnect.getHeartRateHistory({ days: 7 });
// Returns: { history: [{timestamp, heartRate}, ...] }

// Display all:
result.history.map((record, i) => (
  <div key={i}>
    {new Date(record.timestamp).toLocaleString()}: {record.heartRate} bpm
  </div>
))

// Get latest:
const latest = result.history[result.history.length - 1];
console.log(`Latest: ${latest.heartRate} bpm`);

// Average:
const avg = result.history.reduce((sum, r) => sum + r.heartRate, 0) / result.history.length;
console.log(`Average: ${avg.toFixed(1)} bpm`);
```

---

## Display Variables Quick Reference

### Direct Variables to Use

From `getHealthData()`:
```typescript
data.steps                    // Display as: {data.steps.toLocaleString()}
data.heartRate                // Display as: {data.heartRate} bpm
data.calories                 // Display as: {data.calories.toFixed(1)} kcal
data.distance                 // Display as: {data.distance.toFixed(2)} km
data.sleepDuration            // Display as: {data.sleepDuration.toFixed(1)}h
data.bloodPressureSystolic    // Display as: {sys}/{dia}
data.bloodPressureDiastolic
data.bloodGlucose             // Display as: {data.bloodGlucose.toFixed(1)}
data.oxygenSaturation         // Display as: {data.oxygenSaturation}%
```

From `getSteps()`:
```typescript
steps["2026-01-18"]           // Display as: {steps[date].toLocaleString()}
Object.keys(steps)            // All dates
Object.values(steps)          // All step counts
```

From `getHeartRateHistory()`:
```typescript
record.timestamp              // Display as: {new Date(record.timestamp).toLocaleString()}
record.heartRate              // Display as: {record.heartRate} bpm
```

---

## Complete Simple Example

```tsx
import React, { useState, useEffect } from 'react';
import { Healthconnect } from 'health-connect';

export function HealthDashboard() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  // Check on startup
  useEffect(() => {
    checkAndFetch();
  }, []);

  const checkAndFetch = async () => {
    const perm = await Healthconnect.hasPermissions();
    if (perm.hasPermissions) {
      setConnected(true);
      fetchData();
    }
  };

  const handleConnect = async () => {
    const result = await Healthconnect.connect({ value: true });
    if (result.success) {
      setConnected(true);
      fetchData();
    }
  };

  const fetchData = async () => {
    const result = await Healthconnect.getHealthData();
    if (result.success) {
      setData(result.data);
    }
  };

  if (!connected) {
    return <button onClick={handleConnect}>Connect Health Connect</button>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Your Health</h2>
      <p>Steps: <strong>{data.steps.toLocaleString()}</strong></p>
      <p>Heart Rate: <strong>{data.heartRate} bpm</strong></p>
      <p>Calories: <strong>{data.calories.toFixed(1)} kcal</strong></p>
      <p>Distance: <strong>{data.distance.toFixed(2)} km</strong></p>
      <p>Sleep: <strong>{data.sleepDuration.toFixed(1)}h</strong></p>
      <p>BP: <strong>{data.bloodPressureSystolic}/{data.bloodPressureDiastolic}</strong></p>
      <p>Blood Glucose: <strong>{data.bloodGlucose.toFixed(1)}</strong></p>
      <p>SpO2: <strong>{data.oxygenSaturation}%</strong></p>
      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}
```

---

## Function Returns Summary

| Function | Returns |
|----------|---------|
| `isAvailable()` | `{ value: boolean }` |
| `connect()` | `{ success: boolean, value: boolean, message: string }` |
| `hasPermissions()` | `{ hasPermissions: boolean }` |
| `getHealthData()` | `{ success: boolean, data: HealthMetrics, message: string }` |
| `getSteps({days})` | `{ "YYYY-MM-DD": number, ... }` |
| `getHeartRateHistory({days})` | `{ history: [{timestamp: number, heartRate: number}, ...] }` |

---

**That's it! Use the examples above to display your health data in React.**
