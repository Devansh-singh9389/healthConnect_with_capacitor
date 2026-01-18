import React, { useState, useEffect } from 'react';
import { Activity, Moon, Droplet, TrendingUp, Clock, Pill, Brain, Heart, Smartphone, Zap, Plus, ArrowRight, Calendar, X, Utensils, Dumbbell, ChevronRight } from 'lucide-react';
import { Healthconnect, getAllHealthMetrics, HealthMetrics } from 'health-connect';

interface DashboardSimpleProps {
  patientName?: string;
}

const DashboardSimple: React.FC<DashboardSimpleProps> = ({ patientName = 'User' }) => {
  const [waterCount] = useState(6);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showDietPlan, setShowDietPlan] = useState(false);
  const [showFitnessPlan, setShowFitnessPlan] = useState(false);
  const [healthData, setHealthData] = useState<HealthMetrics | null>(null);
  const [medications] = useState([
    { id: 1, name: 'Morning Vitamins', time: '8:00 AM', frequency: 'Daily' },
  ]);

  // Load health data on component mount
  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const data = await getAllHealthMetrics();
      setHealthData(data || null);
    } catch (error) {
      console.error('Error loading health data:', error);
    }
  };

  const connect = async () => {
    try {
      // First check if Health Connect is available
      const available = await Healthconnect.isAvailable();
      
      if (!available.value) {
        alert('Health Connect is not available on this device. Please install it from Google Play Store.');
        return;
      }

      // Connect to Health Connect
      const result = await Healthconnect.connect({ value: true });
      
      if (result.value) {
        alert('Successfully connected to Health Connect!');
        // Load health data after successful connection
        await loadHealthData();
      } else {
        alert('To use Health Connect features, please:\n1. Open the Health Connect app\n2. Go to Settings\n3. Grant permissions to this app\n\nThen try connecting again.');
      }
    } catch (error) {
      console.error('Error connecting to Health Connect:', error);
      alert('Error connecting to Health Connect: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 text-white px-6 py-10 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Header Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 border-2 border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-1 drop-shadow-lg">Hello, {patientName}! 👋</h1>
            <p className="text-purple-100 text-base">Let's build healthy habits together</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <Heart className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs mb-1">Today's Health Score</p>
              <p className="text-3xl font-bold">{healthData ? Math.round((healthData.heartRate / 100) * 85) : 85}%</p>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-xs mb-1">Steps Today</p>
              <p className="text-2xl font-bold">{healthData ? (healthData.steps / 1000).toFixed(1) : '0'}k 👟</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        {/* Connect Device CTA - Featured */}
        <div className="card bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white mb-6 shadow-2xl border-0 transform hover:scale-[1.02] transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                  RECOMMENDED
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Your Device</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Sync your smartwatch or fitness tracker for automatic health monitoring, real-time insights, and personalized AI recommendations.
              </p>
              <button onClick={connect} className="w-full bg-white text-purple-600 py-3 rounded-xl text-sm font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Connect Device Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Activity Card */}
          <div className="card hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Steps</h3>
            <p className="text-2xl font-bold text-gray-800 mb-1">{healthData?.steps?.toLocaleString() || '0'}</p>
            <p className="text-xs text-blue-600 font-semibold">From Health Connect →</p>
          </div>

          {/* Heart Rate Card */}
          <div className="card hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Heart Rate</h3>
            <p className="text-2xl font-bold text-gray-800 mb-1">{healthData?.heartRate || '0'} bpm</p>
            <p className="text-xs text-red-600 font-semibold">Current reading →</p>
          </div>

          {/* Calories Card */}
          <div className="card hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Calories</h3>
            <p className="text-2xl font-bold text-gray-800 mb-1">{Math.round(healthData?.calories || 0)}</p>
            <p className="text-xs text-orange-600 font-semibold">Weekly total →</p>
          </div>

          {/* Sleep Card */}
          <div className="card hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Sleep</h3>
            <p className="text-2xl font-bold text-gray-800 mb-1">{(healthData?.sleepDuration || 0).toFixed(1)}h</p>
            <p className="text-xs text-purple-600 font-semibold">Last night →</p>
          </div>
        </div>

        {/* Health Insights */}
        <div className="card mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">AI Health Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white border-2 border-green-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Great Progress! 🎉</p>
                  <p className="text-xs text-gray-600 mt-1">You're doing amazing! Just 2 more glasses to reach your daily water goal.</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-blue-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Time to Move! 🚶</p>
                  <p className="text-xs text-gray-600 mt-1">Try to get at least 30 minutes of activity today for optimal health.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Diet & Fitness Plans - Same as Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Custom Diet Plan */}
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">Custom Diet Plan</h3>
                <p className="text-xs text-gray-600 mt-1">AI-generated based on your goals</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">Today's Goal</span>
                  <span className="text-xs text-green-600 font-bold">2,150 cal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">1,462 consumed • 688 remaining</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Recommended Meals:</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    High-protein breakfast with oats
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Grilled chicken with vegetables
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Light dinner with salmon
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setShowDietPlan(true)}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
              <span>View Full Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Custom Fitness Plan */}
          <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">Custom Fitness Plan</h3>
                <p className="text-xs text-gray-600 mt-1">Personalized workout schedule</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">Weekly Progress</span>
                  <span className="text-xs text-blue-600 font-bold">4/5 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">1 workout remaining this week</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Today's Workout:</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    30 min cardio workout
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Upper body strength training
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    15 min stretching & cooldown
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setShowFitnessPlan(true)}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
              <span>Start Workout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Medications & Reminders */}
        <div className="card mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Medication Reminders</h3>
                <p className="text-xs text-gray-600">Stay on track with your meds</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddMedication(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3 relative z-10">
            {medications.map((med) => (
              <div key={med.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-purple-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Pill className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{med.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{med.time}</span>
                        <span className="text-purple-600">• {med.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 bg-green-100 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-md">
                    Take
                  </button>
                </div>
              </div>
            ))}
          </div>

          {medications.length === 0 && (
            <div className="text-center py-8 text-gray-500 relative z-10">
              <Pill className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No medications added yet</p>
              <p className="text-xs mt-1">Click + to add your first medication</p>
            </div>
          )}
        </div>

        {/* Add Medication Modal */}
        {showAddMedication && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add Medication</h3>
                <button 
                  onClick={() => setShowAddMedication(false)}
                  className="text-gray-400 hover:text-gray-600 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Medication Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Aspirin, Vitamin C"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Daily</option>
                    <option>Twice Daily</option>
                    <option>Three Times Daily</option>
                    <option>Weekly</option>
                    <option>As Needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    placeholder="e.g., Take with food"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddMedication(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add medication logic here
                    setShowAddMedication(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Health Goals */}
        <div className="card mb-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
          <div className="flex items-center space-x-3 mb-5">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Your Health Goals</h3>
          </div>
          <div className="space-y-5">
            {/* Water Goal */}
            <div className="bg-white rounded-xl p-4 border-2 border-cyan-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Droplet className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-bold text-gray-700">Daily Water</span>
                </div>
                <span className="text-sm font-bold text-cyan-600">{waterCount}/8 glasses</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(waterCount / 8) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Activity Goal */}
            <div className="bg-white rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-gray-700">Weekly Activity</span>
                </div>
                <span className="text-sm font-bold text-green-600">3/5 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all shadow-lg" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Sleep Goal */}
            <div className="bg-white rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-gray-700">Sleep Quality</span>
                </div>
                <span className="text-sm font-bold text-purple-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all shadow-lg" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-2.5 rounded-xl shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">This Week</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center border-2 border-amber-200">
              <p className="text-2xl font-bold text-amber-600">52</p>
              <p className="text-xs text-gray-600 mt-1">Glasses</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center border-2 border-green-200">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-xs text-gray-600 mt-1">Workouts</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center border-2 border-purple-200">
              <p className="text-2xl font-bold text-purple-600">7.5h</p>
              <p className="text-xs text-gray-600 mt-1">Avg Sleep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Same Modals as Dashboard */}
      {showDietPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Custom Diet Plan</h3>
              </div>
              <button onClick={() => setShowDietPlan(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center text-gray-600 py-8">Same diet plan content as Dashboard...</div>
          </div>
        </div>
      )}

      {showFitnessPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Custom Fitness Plan</h3>
              </div>
              <button onClick={() => setShowFitnessPlan(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center text-gray-600 py-8">Same fitness plan content as Dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSimple;
