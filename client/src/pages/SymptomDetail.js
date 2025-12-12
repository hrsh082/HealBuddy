import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SymptomDetail = () => {
  const { symptomId } = useParams();
  const [symptom, setSymptom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Symptom solutions mapping
  const solutions = {
    Fever: [
      'Stay hydrated - drink water, coconut water, or herbal tea',
      'Rest as much as possible',
      'Use paracetamol or ibuprofen as recommended',
      'Apply cool compress to forehead',
      'Monitor temperature regularly',
      'Consult doctor if fever persists beyond 3 days',
    ],
    Cough: [
      'Stay hydrated',
      'Use honey (1 tsp for adults)',
      'Try steam inhalation',
      'Avoid irritants like smoke and dust',
      'Use cough drops or lozenges',
      'Consult doctor if cough persists for more than 2 weeks',
    ],
    Sprain: [
      'Rest - avoid activities that put weight on the sprain',
      'Ice - apply ice for 15-20 minutes, several times a day',
      'Compression - wrap the area with an elastic bandage',
      'Elevation - raise the injured area above heart level',
      'Pain relief - take over-the-counter pain medication',
      'Physical therapy exercises once acute pain subsides',
    ],
    Headache: [
      'Rest in a quiet, dark room',
      'Apply a warm or cold compress',
      'Stay hydrated',
      'Take pain relief medication (paracetamol/ibuprofen)',
      'Practice relaxation techniques',
      'Avoid caffeine and alcohol',
    ],
    Nausea: [
      'Rest and relax',
      'Sip small amounts of water or ginger tea',
      'Avoid strong smells',
      'Eat small, frequent meals',
      'Get fresh air',
      'Consult doctor if persistent',
    ],
    Vomiting: [
      'Stop eating and drinking for a while',
      'Sip small amounts of clear fluids',
      'Rest with head elevated',
      'Avoid solid foods initially',
      'Gradually return to bland foods',
      'Seek medical help if severe or persistent',
    ],
    Rash: [
      'Keep the area clean and dry',
      'Avoid scratching',
      'Use mild, fragrance-free soap',
      'Apply hydrating lotion or cream',
      'Avoid irritants and allergens',
      'Consult dermatologist if spreads',
    ],
    Chills: [
      'Dress warmly in layers',
      'Drink warm fluids like tea or broth',
      'Use warm blankets',
      'Stay in a warm room',
      'Rest and avoid cold exposure',
      'Monitor for fever',
    ],
    Fatigue: [
      'Get adequate sleep (7-9 hours)',
      'Eat balanced, nutritious meals',
      'Exercise regularly and moderately',
      'Manage stress with relaxation',
      'Stay hydrated',
      'Consult doctor if persistent',
    ],
    'Body Ache': [
      'Rest and elevate affected areas',
      'Apply heat or cold compress',
      'Gentle stretching and massage',
      'Take pain relief medication',
      'Stay hydrated',
      'Light exercise once acute pain subsides',
    ],
  };

  useEffect(() => {
    // Load symptom from localStorage
    const stored = localStorage.getItem('symptoms');
    if (stored) {
      const allSymptoms = JSON.parse(stored);
      const found = allSymptoms.find(s => s._id === symptomId);
      if (found) {
        setSymptom(found);
      } else {
        toast.error('Symptom not found');
      }
    } else {
      toast.error('Symptom not found');
    }
    setLoading(false);
  }, [symptomId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="text-4xl animate-spin text-blue-600" />
      </div>
    );
  }

  if (!symptom) {
    return (
      <div className="container py-8">
        <p className="text-gray-600">Symptom not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="card mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{symptom.symptomName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Severity</h3>
            <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
              symptom.severity === 'Mild'
                ? 'bg-yellow-100 text-yellow-800'
                : symptom.severity === 'Moderate'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {symptom.severity}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Duration</h3>
            <p className="text-gray-600">{symptom.duration}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
            <p className="text-gray-600">{symptom.status}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Started</h3>
            <p className="text-gray-600">{new Date(symptom.startDate).toLocaleDateString()}</p>
          </div>
        </div>

        {symptom.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">{symptom.description}</p>
          </div>
        )}
      </div>

      {/* Immediate Aid & Solutions */}
      <div className="card bg-green-50 border-l-4 border-green-600">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Immediate Aid & Solutions</h2>

        <div className="space-y-4">
          {(solutions[symptom.symptomName] || solutions.Fever)?.map((aid, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-semibold">
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="text-gray-700">{aid}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
          <p className="text-gray-700 font-semibold">Next Steps:</p>
          <p className="text-gray-600 mt-2">If symptoms persist or worsen, please consult a healthcare professional immediately.</p>
        </div>
      </div>
    </div>
  );
};

export default SymptomDetail;
