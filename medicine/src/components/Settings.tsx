import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Lock, 
  Mail,
  Smartphone,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SettingsProps {
  patientName?: string;
  patientEmail?: string;
}

const Settings: React.FC<SettingsProps> = ({ 
  patientName = 'John Doe',
  patientEmail = 'john.doe@example.com'
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    healthAlerts: true,
    medicationReminders: true,
    appointmentReminders: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    shareHealthData: false,
    analyticsTracking: true,
    locationServices: false,
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'devices', name: 'Connected Devices', icon: Smartphone },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
    { id: 'support', name: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.name}</span>
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {patientName.charAt(0)}
                      </div>
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:bg-gray-50">
                        <User className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <button className="btn-primary mb-2">Change Photo</button>
                      <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size 5MB</p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={patientName}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={patientEmail}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        defaultValue="1990-01-15"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Health Info */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Health Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                        <input
                          type="number"
                          defaultValue="175"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                        <input
                          type="number"
                          defaultValue="72"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                        <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option>O+</option>
                          <option>O-</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6">
                    <button className="btn-secondary">Cancel</button>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive notifications about {key.toLowerCase()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [key]: !value })}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                              value ? 'transform translate-x-7' : ''
                            }`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy & Security</h2>

                  {/* Privacy Settings */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
                    {Object.entries(privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                            </p>
                            <p className="text-sm text-gray-600">
                              {key === 'shareHealthData' && 'Share your health data with healthcare providers'}
                              {key === 'analyticsTracking' && 'Help us improve our services'}
                              {key === 'locationServices' && 'Enable location-based health features'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                              value ? 'transform translate-x-7' : ''
                            }`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Security Actions */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">Change Password</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">Two-Factor Authentication</span>
                      </div>
                      <span className="text-sm text-green-600 font-semibold">Enabled</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-800">Login Activity</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Data Management */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                        <span className="font-semibold text-blue-700">Download My Data</span>
                        <ChevronRight className="w-5 h-5 text-blue-600" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                        <span className="font-semibold text-red-700">Delete Account</span>
                        <ChevronRight className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {['devices', 'subscription', 'support'].includes(activeTab) && (
                <div className="text-center py-12 animate-fade-in">
                  <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {activeTab === 'devices' && <Smartphone className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'subscription' && <CreditCard className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'support' && <HelpCircle className="w-12 h-12 text-gray-400" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h3>
                  <p className="text-gray-600">This section is coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
