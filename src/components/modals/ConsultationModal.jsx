import React, { useState, useEffect } from 'react';
import { 
  X, 
  Stethoscope, 
  HeartPulse, 
  FileText, 
  Plus, 
  Trash2, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ConsultationModal({ 
  isOpen, 
  onClose, 
  queueItem, 
  patient, 
  pharmacy, 
  onSaveConsultation 
}) {
  const { t } = useLanguage();
  const [temp, setTemp] = useState('101.5');
  const [weight, setWeight] = useState('');
  const [heartRate, setHeartRate] = useState('90');
  const [respRate, setRespRate] = useState('24');
  const [complaint, setComplaint] = useState('');
  const [exam, setExam] = useState('Alert, hydrated, mucous membranes pink, CRT < 2s.');
  const [diagnosis, setDiagnosis] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [rxItems, setRxItems] = useState([]);

  useEffect(() => {
    if (queueItem && patient) {
      setWeight(patient.weight ? patient.weight.toString() : '');
      setComplaint(queueItem.reason || '');
      setDiagnosis('');
      setRxItems([
        { item: pharmacy[0]?.name || 'Oxytetracycline 20% L.A. (100ml)', dosage: '1 vial OD', duration: '3 days' }
      ]);
    }
  }, [queueItem, patient, pharmacy]);

  if (!isOpen || !queueItem || !patient) return null;

  const handleAddRx = () => {
    setRxItems([
      ...rxItems,
      { item: pharmacy[0]?.name || 'Amoxicillin 625mg', dosage: '1 tab BD', duration: '5 days' }
    ]);
  };

  const handleRemoveRx = (index) => {
    setRxItems(rxItems.filter((_, i) => i !== index));
  };

  const handleUpdateRx = (index, field, value) => {
    const updated = [...rxItems];
    updated[index][field] = value;
    setRxItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!diagnosis.trim()) return;

    onSaveConsultation({
      tokenId: queueItem.token,
      patientId: patient.id,
      patientName: patient.name,
      species: patient.species,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctor: queueItem.doctor || 'Dr. Fahad Khan',
      temp: parseFloat(temp) || 101.5,
      weight: parseFloat(weight) || patient.weight,
      heartRate: parseInt(heartRate) || 90,
      respRate: parseInt(respRate) || 24,
      complaint: complaint.trim(),
      exam: exam.trim(),
      diagnosis: diagnosis.trim(),
      treatment: rxItems.map(r => r.item).join(", ") || 'Supportive clinical care',
      prescription: rxItems,
      followUp: followUp || 'None'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute right-5 rtl:right-auto rtl:left-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-[#00A896] flex items-center justify-center text-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                {t('consultModalTitle')}
              </h2>
              <span className="bg-teal-100 text-[#00A896] text-xs font-mono font-bold px-2 py-0.5 rounded">
                {queueItem.token}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {patient.id} — {patient.name} ({patient.species} / {patient.breed}) — Owner: {patient.ownerName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Physical Vitals Quadrant */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-[#0F385E] uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>Vital Signs & Triage</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-500 mb-0.5">Temperature (°F)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  placeholder="101.5" 
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-0.5">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="24.0" 
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-0.5">Heart Rate (bpm)</label>
                <input 
                  type="number" 
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  placeholder="90" 
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-0.5">Resp Rate (/min)</label>
                <input 
                  type="number" 
                  value={respRate}
                  onChange={(e) => setRespRate(e.target.value)}
                  placeholder="24" 
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold focus:border-[#00A896] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Clinical Notes SOAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Chief Complaint & History</label>
              <textarea 
                rows="2" 
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none" 
                placeholder="e.g. Not eating for 2 days, lethargic, fever"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Physical Examination Findings</label>
              <textarea 
                rows="2" 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none" 
                placeholder="e.g. Dehydration 5%, mild abdominal discomfort"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinical Diagnosis *</label>
              <input 
                type="text" 
                required 
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Acute Gastroenteritis / Tick Fever / Mastitis" 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Follow-Up Date</label>
              <input 
                type="date" 
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
              />
            </div>
          </div>

          {/* Electronic Rx Prescription Generator */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-teal-50/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                <FileText className="w-4 h-4 text-[#00A896]" />
                <span>Prescribe Medicines (Auto-linked to Pharmacy & Cashier Billing)</span>
              </h4>
              <button 
                type="button" 
                onClick={handleAddRx} 
                className="text-xs bg-[#00A896] text-white px-2.5 py-1 rounded-lg font-semibold hover:bg-teal-600 transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-2">
              {rxItems.map((rx, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <select 
                    value={rx.item}
                    onChange={(e) => handleUpdateRx(idx, 'item', e.target.value)}
                    className="flex-1 border border-slate-200 rounded-lg p-1.5 bg-white font-medium focus:outline-none"
                  >
                    {pharmacy.map(m => (
                      <option key={m.id} value={m.name}>
                        {m.name} (₨ {m.salePrice})
                      </option>
                    ))}
                    <option value="Normal Saline 1000ml IV Infusion">Normal Saline 1000ml IV Infusion</option>
                  </select>
                  <input 
                    type="text" 
                    value={rx.dosage}
                    onChange={(e) => handleUpdateRx(idx, 'dosage', e.target.value)}
                    placeholder="Dosage (e.g. 1 vial OD)" 
                    className="w-40 border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none"
                  />
                  <input 
                    type="text" 
                    value={rx.duration}
                    onChange={(e) => handleUpdateRx(idx, 'duration', e.target.value)}
                    placeholder="Duration (e.g. 3 days)" 
                    className="w-28 border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveRx(idx)} 
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-[#00A896] hover:bg-teal-600 text-white font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Consultation & Forward to Billing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
