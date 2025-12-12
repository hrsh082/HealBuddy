import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { aiAPI } from '../services/api';
import { FiMessageCircle, FiFileText } from 'react-icons/fi';

// Import custom icons
import FeverIcon from '../Icons/Fever.png';
import CoughIcon from '../Icons/Cough.png';
import SprainIcon from '../Icons/Sprain.png';
import HeadacheIcon from '../Icons/Headache.png';
import NauseaIcon from '../Icons/Nausea.png';
import VomitIcon from '../Icons/Vomit.png';
import RashIcon from '../Icons/Rash.png';
import EyePainIcon from '../Icons/Eye Pain.png';
import FatigueIcon from '../Icons/Fatigue.png';
import BodyPainIcon from '../Icons/Body Pain.png';

const Dashboard = () => {
  const [activeSymptoms, setActiveSymptoms] = useState([]);
  const [formData, setFormData] = useState({
    symptomName: 'Fever',
    severity: 'Mild',
    duration: '',
    description: '',
    affectedArea: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [assessment, setAssessment] = useState(null);
  const assessmentRef = useRef(null);

  

  const durationOptions = [
    'Less than 1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
  ];

  const symptomsData = [
    { name: 'Fever', icon: FeverIcon, bgColor: 'bg-red-50 hover:bg-red-100' },
    { name: 'Cough', icon: CoughIcon, bgColor: 'bg-yellow-50 hover:bg-yellow-100' },
    { name: 'Sprain', icon: SprainIcon, bgColor: 'bg-orange-50 hover:bg-orange-100' },
    { name: 'Headache', icon: HeadacheIcon, bgColor: 'bg-purple-50 hover:bg-purple-100' },
    { name: 'Nausea', icon: NauseaIcon, bgColor: 'bg-green-50 hover:bg-green-100' },
    { name: 'Vomiting', icon: VomitIcon, bgColor: 'bg-pink-50 hover:bg-pink-100' },
    { name: 'Rash', icon: RashIcon, bgColor: 'bg-indigo-50 hover:bg-indigo-100' },
    { name: 'Chills', icon: EyePainIcon, bgColor: 'bg-blue-50 hover:bg-blue-100' },
    { name: 'Fatigue', icon: FatigueIcon, bgColor: 'bg-teal-50 hover:bg-teal-100' },
    { name: 'Body Ache', icon: BodyPainIcon, bgColor: 'bg-cyan-50 hover:bg-cyan-100' },
  ];

  const symptoms = symptomsData.map(s => s.name);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load symptoms from localStorage if available
    const stored = localStorage.getItem('symptoms');
    if (stored) {
      setActiveSymptoms(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSymptom = async (e) => {
    e.preventDefault();
    const newSymptom = {
      _id: Date.now().toString(),
      ...formData,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };

    const updated = [newSymptom, ...activeSymptoms];
    setActiveSymptoms(updated);
    localStorage.setItem('symptoms', JSON.stringify(updated));

    toast.success('Symptom recorded successfully!');

    try {
      const { data } = await aiAPI.assessSymptoms({
        symptoms: [formData.symptomName],
        duration: formData.duration,
        severity: formData.severity,
      });
      setAssessment({
        symptomName: formData.symptomName,
        duration: formData.duration,
        severity: formData.severity,
        ...data,
      });
      setTimeout(() => {
        assessmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      toast.error('Failed to fetch AI assessment');
    }

    setFormData({
      symptomName: 'Fever',
      severity: 'Mild',
      duration: '',
      description: '',
      affectedArea: '',
      startDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="container py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HealBuddy</h1>
          <p className="text-gray-600">Clean, modern healthcare assistant</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <Link to="/chatbot" className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">AI Chat</Link>
          <Link to="/upload-report" className="px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold border border-blue-200 hover:bg-blue-50">Upload Report</Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select a symptom</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {symptomsData.map((symptomObj) => (
            <button
              key={symptomObj.name}
              onClick={() => {
                setFormData((prev) => ({ ...prev, symptomName: symptomObj.name }));
                setShowModal(true);
              }}
              className="group relative overflow-hidden p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              title={symptomObj.name}
            >
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-blue-200 transition" />
              <div className="flex flex-col items-center gap-3">
                <img src={symptomObj.icon} alt={symptomObj.name} className="w-20 h-20 object-contain transition-transform duration-200 group-hover:scale-105" />
                <span className="text-sm font-semibold text-gray-800 text-center">{symptomObj.name}</span>
              </div>
            </button>
          ))}
        </div>

        {assessment && (
          <div ref={assessmentRef} className="mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Assessment</h3>
                <p className="text-sm text-gray-600">{assessment.symptomName} • {assessment.severity} • {assessment.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={`/chatbot?from=symptom&symptom=${encodeURIComponent(assessment.symptomName)}&duration=${encodeURIComponent(assessment.duration)}&severity=${encodeURIComponent(assessment.severity)}`}
                  title="Chat with AI"
                  aria-label="Chat with AI"
                  className="group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
                >
                  <FiMessageCircle className="text-2xl transition-transform group-hover:scale-110 group-hover:rotate-3" />
                  <span className="text-sm font-semibold">Chat</span>
                </Link>
                <Link
                  to="/upload-report"
                  title="Upload report"
                  aria-label="Upload report"
                  className="group flex items-center gap-2 px-4 py-3 rounded-2xl bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
                >
                  <FiFileText className="text-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3" />
                  <span className="text-sm font-semibold">Upload</span>
                </Link>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-500 font-semibold">Assessment</p>
                <p className="text-gray-900 font-medium">{assessment.primaryCondition}</p>
              </div>
              {assessment.possibleConditions && assessment.possibleConditions.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Possible conditions</p>
                  <ul className="list-disc list-inside text-gray-900">
                    {assessment.possibleConditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {assessment.recommendedActions && assessment.recommendedActions.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Recommended actions</p>
                  <ul className="list-disc list-inside text-gray-900">
                    {assessment.recommendedActions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 font-semibold">Next step</p>
                <p className="text-gray-900 font-medium">{assessment.doctorConsultationNeeded ? 'Consider consulting a doctor.' : 'Monitor symptoms and follow the actions provided.'}</p>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl z-10 p-8 border border-[var(--border)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Report symptom</h3>
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
                  ×
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  handleSubmitSymptom(e);
                  setShowModal(false);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="form-label">Symptom</label>
                    <select name="symptomName" value={formData.symptomName} onChange={handleChange} className="form-input bg-white cursor-pointer font-medium">
                      {symptoms.map((symptom) => (
                        <option key={symptom} value={symptom}>
                          {symptom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Severity</label>
                    <div className="flex gap-2">
                      {['Mild','Moderate','Severe'].map((level) => (
                        <button
                          type="button"
                          key={level}
                          onClick={() => setFormData((prev) => ({ ...prev, severity: level }))}
                          className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
                            formData.severity === level
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-gray-800 border-[var(--border)] hover:bg-[var(--surface-strong)]'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="form-input bg-white cursor-pointer font-medium"
                      required
                    >
                      <option value="" disabled>Select duration</option>
                      {durationOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-95 transition-opacity">
                    Record symptom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        symptomName: 'Fever',
                        severity: 'Mild',
                        duration: '',
                        description: '',
                        affectedArea: '',
                        startDate: new Date().toISOString().split('T')[0],
                      });
                      setShowModal(false);
                    }}
                    className="btn-secondary flex-1 py-3 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900">HealBuddy</h4>
              <p className="text-gray-600">Your clean, modern healthcare companion.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Quick Links</h4>
              <div className="mt-2 flex gap-3">
                <Link to="/chatbot" className="text-blue-700 hover:underline">AI Chat</Link>
                <Link to="/upload-report" className="text-blue-700 hover:underline">Upload Report</Link>
                <Link to="/profile" className="text-blue-700 hover:underline">Profile</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Support</h4>
              <p className="text-gray-600">support@healbuddy.com</p>
              <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
            </div>
          </div>
          <div className="mt-6 text-gray-600">© 2025 HealBuddy</div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
