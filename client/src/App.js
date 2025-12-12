import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Dashboard from './pages/Dashboard';
import SymptomDetail from './pages/SymptomDetail';
import ReportUpload from './pages/ReportUpload';
import ChatBot from './pages/ChatBot';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/symptom/:symptomId" element={<SymptomDetail />} />

          <Route path="/upload-report" element={<ReportUpload />} />

          <Route path="/chatbot" element={<ChatBot />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
