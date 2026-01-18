import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import Onboarding, { PatientData } from './components/Onboarding';
import Dashboard from './components/Dashboard';
import DashboardSimple from './components/DashboardSimple';
import ChatAssistant from './components/ChatAssistant';
import ReportTranslator from './components/ReportTranslator';
import SymptomChecker from './components/SymptomChecker';
import Settings from './components/Settings';
import EmergencyContacts from './components/EmergencyContacts';
import Navbar from './components/Navbar';

type View = 'splash' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'chat' | 'report' | 'symptom' | 'settings' | 'emergency';

function App() {
  const [currentView, setCurrentView] = useState<View>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleSplashFinish = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard'); // Always go to onboarding to check wearable status
  };

  const handleSignup = () => {
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (data: PatientData) => {
    setPatientData(data);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'login':
        return <Login onLogin={handleLogin} onSignup={() => setCurrentView('signup')} />;
      case 'signup':
        return <Signup onSignup={handleSignup} onLogin={() => setCurrentView('login')} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        // Show different dashboard based on wearable availability
        if (patientData?.hasWearable) {
          return <Dashboard patientName={patientData?.emergencyContact?.name || 'User'} />;
        } else {
          return <DashboardSimple patientName={patientData?.emergencyContact?.name || 'User'} />;
        }
      case 'chat':
        return <ChatAssistant />;
      case 'report':
        return <ReportTranslator />;
      case 'symptom':
        return <SymptomChecker />;
      case 'settings':
        return <Settings patientName={patientData?.emergencyContact?.name} />;
      case 'emergency':
        return <EmergencyContacts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative">
      {renderView()}
      <Navbar isAuthenticated={isAuthenticated} currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
