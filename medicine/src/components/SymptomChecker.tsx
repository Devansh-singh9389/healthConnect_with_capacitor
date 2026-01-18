import React, { useState } from 'react';
import { Stethoscope, Search, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Symptom {
  id: number;
  name: string;
  selected: boolean;
}

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: 1, name: 'Headache', selected: false },
    { id: 2, name: 'Fever', selected: false },
    { id: 3, name: 'Cough', selected: false },
    { id: 4, name: 'Fatigue', selected: false },
    { id: 5, name: 'Body Aches', selected: false },
    { id: 6, name: 'Sore Throat', selected: false },
    { id: 7, name: 'Nausea', selected: false },
    { id: 8, name: 'Dizziness', selected: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (id: number) => {
    setSymptoms(
      symptoms.map((symptom) =>
        symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
      )
    );
  };

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const selectedCount = symptoms.filter((s) => s.selected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-2xl">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">AI Symptom Checker</h1>
              <p className="text-gray-600">Get instant guidance on your symptoms</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Symptoms Grid */}
        {!showResults && (
          <div className="card mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Select Your Symptoms</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {symptoms
                .filter((symptom) =>
                  symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      symptom.selected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={symptom.selected ? 'text-red-700 font-semibold' : 'text-gray-700'}>
                        {symptom.name}
                      </span>
                      {symptom.selected && (
                        <CheckCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
            </div>

            {selectedCount > 0 && (
              <div className="mt-6 flex items-center justify-between bg-red-50 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>{selectedCount}</strong> symptom{selectedCount !== 1 ? 's' : ''} selected
                </p>
                <button onClick={handleAnalyze} className="btn-primary">
                  Analyze Symptoms
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-slide-up">
            {/* Main Assessment */}
            <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-12 h-12 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Possible Condition</h3>
                  <p className="text-xl text-gray-700 mb-3">Common Cold / Flu</p>
                  <div className="flex items-center space-x-2 bg-yellow-100 rounded-lg px-3 py-2 inline-flex">
                    <span className="text-sm font-semibold text-yellow-800">Confidence: 78%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What This Means</h3>
              <p className="text-gray-700 leading-relaxed">
                Based on your symptoms, you may be experiencing a common cold or flu. These are viral infections 
                that typically resolve on their own within 7-10 days. Your symptoms suggest a mild to moderate case.
              </p>
            </div>

            {/* Recommendations */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended Actions</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Rest & Hydration</h4>
                    <p className="text-sm text-gray-600">
                      Get plenty of rest and drink 8-10 glasses of water daily to help your body fight the infection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Over-the-Counter Medication</h4>
                    <p className="text-sm text-gray-600">
                      Acetaminophen or ibuprofen can help reduce fever and relieve body aches. Follow dosage instructions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Monitor Your Symptoms</h4>
                    <p className="text-sm text-gray-600">
                      Keep track of your symptoms. If they worsen or persist beyond 10 days, consult a healthcare provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* When to Seek Immediate Care */}
            <div className="card bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Seek Immediate Care If:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Fever above 103°F (39.4°C) or lasting more than 3 days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Difficulty breathing or chest pain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Severe or persistent vomiting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Confusion or difficulty staying awake</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card bg-gray-50 border-2 border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Disclaimer:</strong> This is not a medical diagnosis. AI symptom checker provides 
                general guidance only. Always consult with a qualified healthcare professional for accurate 
                diagnosis and treatment.
              </p>
            </div>

            <button
              onClick={() => {
                setShowResults(false);
                setSymptoms(symptoms.map((s) => ({ ...s, selected: false })));
              }}
              className="btn-secondary w-full"
            >
              Check Different Symptoms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
