import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const ReportTranslator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Medical Report Translator</h1>
              <p className="text-gray-600">Transform complex lab results into simple insights</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {!showResults && (
          <div className="card mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Medical Report</h3>
              <p className="text-gray-600 mb-4">PDF, JPEG, PNG - Maximum file size 10MB</p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="btn-primary inline-block cursor-pointer">
                Choose File
              </label>
              {selectedFile && (
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <p className="text-green-700 font-semibold">{selectedFile.name}</p>
                  <button onClick={handleAnalyze} className="btn-primary mt-3">
                    {analyzing ? 'Analyzing...' : 'Analyze Report'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 animate-slide-up">
            {/* Overall Health Score */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Overall Health Score</h3>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-5xl font-bold text-green-600">82</span>
                <span className="text-2xl text-gray-600 mb-2">/100</span>
              </div>
              <p className="text-gray-700 mt-2">Good overall health with some areas for improvement</p>
            </div>

            {/* Lab Results Breakdown */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Lab Results - Simplified</h3>
              <div className="space-y-4">
                {/* HbA1c */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-800">HbA1c (Blood Sugar)</h4>
                    </div>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Normal
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">5.4%</p>
                      <p className="text-sm text-gray-600">Normal Range: 4.0 - 5.6%</p>
                    </div>
                    <TrendingDown className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>What this means:</strong> Your blood sugar control is excellent. Keep up your healthy lifestyle!
                  </p>
                </div>

                {/* Cholesterol */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-gray-800">Total Cholesterol</h4>
                    </div>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Borderline
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">205 mg/dL</p>
                      <p className="text-sm text-gray-600">Optimal: Below 200 mg/dL</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>What this means:</strong> Slightly elevated. Consider reducing saturated fats and increasing exercise.
                  </p>
                </div>

                {/* Vitamin D */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Vitamin D</h4>
                    </div>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Normal
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">42 ng/mL</p>
                      <p className="text-sm text-gray-600">Normal Range: 30 - 100 ng/mL</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>What this means:</strong> Healthy vitamin D levels. Maintain sun exposure and diet.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Reduce intake of saturated fats to manage cholesterol levels</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Increase physical activity to 30 minutes daily</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Schedule a follow-up in 3 months to recheck cholesterol</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowResults(false);
                setSelectedFile(null);
              }}
              className="btn-secondary w-full"
            >
              Analyze Another Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTranslator;
