import React, { useState, useEffect } from 'react';
import { X, Pill, Check } from 'lucide-react';

export default function DispenseModal({ 
  isOpen, 
  onClose, 
  pharmacy, 
  patients, 
  onDispense, 
  initialMedicineId 
}) {
  const [medicineId, setMedicineId] = useState('');
  const [qty, setQty] = useState(1);
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    if (initialMedicineId) {
      setMedicineId(initialMedicineId);
    } else if (pharmacy.length > 0 && !medicineId) {
      setMedicineId(pharmacy[0].id);
    }
  }, [initialMedicineId, pharmacy]);

  if (!isOpen) return null;

  const selectedMed = pharmacy.find(m => m.id === medicineId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMed) return;
    onDispense(medicineId, parseInt(qty) || 1, patientId);
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
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Dispense Medicine</h2>
            <p className="text-xs text-slate-500">Deducts physical clinic stock and pushes to cashier invoice</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Medicine Item *</label>
            <select 
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              required 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-amber-600 focus:outline-none font-medium"
            >
              {pharmacy.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} (Stock: {m.stock}) - ₨ {m.salePrice}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Quantity to Dispense *</label>
              <input 
                type="number" 
                min="1" 
                max={selectedMed ? selectedMed.stock : 99}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-amber-600 focus:outline-none font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Unit Price (PKR)</label>
              <input 
                type="text" 
                readOnly 
                value={selectedMed ? `₨ ${selectedMed.salePrice}` : '₨ 0'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Assign to Patient (Optional)</label>
            <select 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-amber-600 focus:outline-none font-medium"
            >
              <option value="">-- Direct Over-The-Counter Sale --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.species}) - {p.ownerName}
                </option>
              ))}
            </select>
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
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Dispense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
