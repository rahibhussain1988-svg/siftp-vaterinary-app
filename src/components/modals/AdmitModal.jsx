import React, { useState, useEffect } from 'react';
import { X, Bed, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdmitModal({ 
  isOpen, 
  onClose, 
  patients, 
  kennels, 
  onAdmit, 
  initialKennelId 
}) {
  const { t } = useLanguage();
  const [patientId, setPatientId] = useState('');
  const [kennelId, setKennelId] = useState('');
  const [notes, setNotes] = useState('');

  const availableKennels = kennels.filter(k => k.status === 'Available');

  useEffect(() => {
    if (initialKennelId) {
      setKennelId(initialKennelId);
    } else if (availableKennels.length > 0 && !kennelId) {
      setKennelId(availableKennels[0].id);
    }
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
  }, [initialKennelId, availableKennels, patients]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    const kennel = kennels.find(k => k.id === kennelId);
    if (!patient || !kennel) return;

    onAdmit(patientId, kennelId, notes.trim());
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
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-lg">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {t('admitModalTitle')}
            </h2>
            <p className="text-xs text-slate-500">Assign animal to inpatient care ward or recovery bay</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Animal Patient *</label>
            <select 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-cyan-600 focus:outline-none font-medium"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.species}) - {p.ownerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Choose Available Kennel / Pen *</label>
            <select 
              value={kennelId}
              onChange={(e) => setKennelId(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-cyan-600 focus:outline-none font-medium"
            >
              {availableKennels.length === 0 ? (
                <option value="">No available kennels! Please discharge first.</option>
              ) : (
                availableKennels.map(k => (
                  <option key={k.id} value={k.id}>
                    {k.name} ({k.type})
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Admission Diagnosis & Diet Instructions</label>
            <textarea 
              rows="3" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Post-orthopedic surgery observation. Soft food twice daily." 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-cyan-600 focus:outline-none"
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
              disabled={availableKennels.length === 0}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Admission</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
