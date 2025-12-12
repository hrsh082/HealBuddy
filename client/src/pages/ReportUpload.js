import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { aiAPI } from '../services/api';

const ReportUpload = () => {
  const [files, setFiles] = useState([]);
  const [reportType, setReportType] = useState('Blood Test');
  const [reports, setReports] = useState(() => {
    const stored = localStorage.getItem('reports');
    return stored ? JSON.parse(stored) : [];
  });

  const reportTypes = ['Blood Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'Other'];

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select a file');
      return;
    }
    try {
      const analyzed = await Promise.all(
        files.map(async (file) => {
          const localId = Date.now().toString() + Math.random();
          const { data } = await aiAPI.analyzeReport(localId, {
            reportType,
            extractedText: `File: ${file.name}`,
          });

          return {
            _id: localId,
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            reportType,
            uploadDate: new Date().toISOString(),
            scanStatus: 'Completed',
            aiSummary: data.summary,
            findings: data.findings || [],
            recommendations: data.recommendations || [],
            confidence: data.confidence || 80,
          };
        })
      );

      const updated = [...reports, ...analyzed];
      setReports(updated);
      localStorage.setItem('reports', JSON.stringify(updated));

      toast.success('Reports uploaded and analyzed successfully!');
      setFiles([]);
    } catch (err) {
      toast.error('Failed to analyze reports');
    }
  };

  const handleDelete = (id) => {
    const updated = reports.filter(r => r._id !== id);
    setReports(updated);
    localStorage.setItem('reports', JSON.stringify(updated));
    toast.info('Report deleted');
  };

  return (
    <div className="container py-10 min-h-screen">
      <div className="card max-w-3xl mx-auto bg-[var(--surface)]">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload medical report</h1>
        <p className="text-gray-600 text-base mb-8">Store your reports securely and review quick AI summaries.</p>

        <div className="mb-8">
          <label className="form-label">Report type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="form-input bg-white cursor-pointer font-medium"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-[var(--accent)] bg-[var(--surface-strong)]'
              : 'border-[var(--border)] hover:border-[var(--accent)] bg-[var(--surface)]'
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className={`text-5xl mx-auto mb-3 ${isDragActive ? 'text-[var(--text)]' : 'text-gray-500'}`} />
          {isDragActive ? (
            <p className="text-[var(--text)] font-semibold text-lg">Drop your reports</p>
          ) : (
            <div>
              <p className="text-gray-800 font-semibold text-lg">Drag and drop reports</p>
              <p className="text-gray-600 text-sm mt-1">or click to select files (PDF, JPG, PNG).</p>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Selected files</h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
                  <FiFileText className="text-[var(--text)] text-xl" />
                  <span className="flex-1 text-gray-800 font-medium truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={false}
              className="btn-primary w-full mt-8 py-3 font-semibold rounded-lg"
            >
              Upload & analyze
            </button>
          </div>
        )}
      </div>



      {/* Previously Uploaded Reports */}
      {reports.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your medical reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report._id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{report.fileName}</h3>
                    <p className="text-sm text-[var(--text)] font-semibold mt-1">{report.reportType}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      {report.scanStatus}
                    </span>
                    <p className="text-xs text-gray-600 font-semibold">Confidence: {report.confidence}%</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI summary</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{report.aiSummary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key findings</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {report.findings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {report.recommendations && report.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {report.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex">
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="btn-danger text-sm flex-1 font-semibold rounded-lg py-2"
                    >
                      Delete report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUpload;
