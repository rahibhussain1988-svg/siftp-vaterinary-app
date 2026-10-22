import React, { useState, useEffect } from 'react';
import { X, Syringe, Check } from 'lucide-react';

export default function VaccineModal({ 
  isOpen, 
  onClose, 
  patients, 
  onSave 
}) {
  const [patientId, setPatientId] = useState('');
  const [vaccineName, setVaccineName] = useState('Rabies Monovalent (Inactivated)');
  const [batch, setBatch] = useState('RB-8890');
  const [adminDate, setAdminDate] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [doctor, setDoctor] = useState('Dr. Fahad Khan');

  useEffect(() => {
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
    const today = new Date().toISOString().split('T')[0];
    setAdminDate(today);

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    setNextDueDate(nextYear.toISOString().split('T')[0]);
  }, [patients]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    onSave({
      patientId: patient.id,
      patientName: patient.name,
      species: patient.species,
      ownerName: patient.ownerName,
      ownerPhone: patient.ownerPhone,
      vaccineName,
      batch: batch.trim() || 'B-2026-X9',
      adminDate,
      nextDueDate,
      doctor,
      status: "Upcoming"
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
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Record Vaccine Dose</h2>
            <p className="text-xs text-slate-500">Creates booster recall and updates animal health passport</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Patient *</label>
            <select 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.species} / {p.breed}) - {p.ownerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Vaccine Name *</label>
            <select 
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none font-medium"
            >
              <option value="Rabies Monovalent (Inactivated)">Rabies Monovalent (Inactivated)</option>
              <option value="Canine DHPP 5-in-1">Canine DHPP 5-in-1</option>
              <option value="FMD Oil Adjuvanted (Foot & Mouth)">FMD (Bovine Foot & Mouth)</option>
              <option value="HS Vaccine (Haemorrhagic Septicaemia)">HS Vaccine (Haemorrhagic Septicaemia)</option>
              <option value="Enterotoxaemia + Tetanus">Enterotoxaemia + Tetanus (Sheep/Goat)</option>
              <option value="Feline Tricat Trio">Feline Tricat Trio</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Batch Number</label>
              <input 
                type="text" 
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="B-2026-X9" 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Admin Date</label>
              <input 
                type="date" 
                value={adminDate}
                onChange={(e) => setAdminDate(e.target.value)}
                required 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Next Due Booster Date *</label>
              <input 
                type="date" 
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                required 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none font-bold text-purple-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Administering Vet</label>
              <select 
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none"
              >
                <option value="Dr. Fahad Khan">Dr. Fahad Khan</option>
                <option value="Dr. Ayesha Baloch">Dr. Ayesha Baloch</option>
              </select>
            </div>
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
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Vaccination</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
