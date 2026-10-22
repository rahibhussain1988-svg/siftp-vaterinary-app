import React, { useState, useEffect } from 'react';
import { X, Ticket } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function TokenModal({ 
  isOpen, 
  onClose, 
  patients, 
  onIssue, 
  preSelectedPatientId 
}) {
  const { t } = useLanguage();
  const [patientId, setPatientId] = useState('');
  const [department, setDepartment] = useState('General OPD');
  const [doctor, setDoctor] = useState('Dr. Fahad Khan');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (preSelectedPatientId) {
      setPatientId(preSelectedPatientId);
    } else if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
  }, [preSelectedPatientId, patients]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    onIssue({
      patientId: patient.id,
      patientName: patient.name,
      species: patient.species,
      breed: patient.breed,
      ownerName: patient.ownerName,
      department,
      doctor,
      reason: reason.trim() || 'Consultation'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute right-5 rtl:right-auto rtl:left-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {t('tokenModalTitle')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('tokenModalSub')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Animal Patient *</label>
            <select 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-medium"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.species} / {p.breed}) - {p.ownerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Service / Department *</label>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-medium"
            >
              <option value="General OPD">General OPD Consultation</option>
              <option value="Vaccination">Vaccination & Deworming</option>
              <option value="Emergency & Trauma">Emergency & Trauma Care</option>
              <option value="Surgery Pre-Op">Surgery Pre-Op Evaluation</option>
              <option value="Kennel Boarding">Inpatient Kennel Admission</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Assign Veterinarian *</label>
            <select 
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-medium"
            >
              <option value="Dr. Fahad Khan">Dr. Fahad Khan (Surgery & Small Animal)</option>
              <option value="Dr. Ayesha Baloch">Dr. Ayesha Baloch (Livestock & Bovine)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Visit Reason / Chief Complaint</label>
            <input 
              type="text" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. High fever, anorexia, limp, vaccination" 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition active:scale-95"
            >
              Generate Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
