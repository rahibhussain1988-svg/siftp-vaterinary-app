import React from 'react';
import { 
  X, 
  FileText, 
  PawPrint, 
  Syringe, 
  Receipt, 
  Calendar, 
  AlertTriangle 
} from 'lucide-react';

export default function PatientHistoryModal({ 
  isOpen, 
  onClose, 
  patient, 
  consultations, 
  vaccinations, 
  invoices 
}) {
  if (!isOpen || !patient) return null;

  const patientConsultations = consultations.filter(c => c.patientId === patient.id);
  const patientVaccines = vaccinations.filter(v => v.patientId === patient.id);
  const patientInvoices = invoices.filter(inv => inv.patientId === patient.id);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute right-5 rtl:right-auto rtl:left-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Patient Header Card */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#00A896] flex items-center justify-center text-xl font-bold">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">{patient.name}</h2>
              <span className="font-mono text-xs font-bold text-[#00A896] bg-teal-50 px-2 py-0.5 rounded">
                {patient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {patient.species} ({patient.breed || 'Standard'}) • {patient.sex} • {patient.age} • {patient.weight} kg
            </p>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Owner: {patient.ownerName} ({patient.ownerPhone}) • {patient.ownerAddress}
            </p>
          </div>
        </div>

        {patient.allergies && patient.allergies !== 'None' && (
          <div className="my-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Critical Drug Caution: {patient.allergies}</span>
          </div>
        )}

        <div className="mt-4 space-y-6 text-xs">
          
          {/* Consultations History */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
              <FileText className="w-4 h-4 text-[#00A896]" />
              <span>Medical Consultations ({patientConsultations.length})</span>
            </h3>
            {patientConsultations.length === 0 ? (
              <p className="text-slate-400 italic bg-slate-50 p-3 rounded-xl">No prior consultations recorded for this animal.</p>
            ) : (
              <div className="space-y-2">
                {patientConsultations.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex justify-between items-center text-slate-500 text-[11px]">
                      <span className="font-semibold text-slate-700">{c.date}</span>
                      <span className="font-medium">{c.doctor}</span>
                    </div>
                    <div className="font-bold text-slate-900">Diagnosis: {c.diagnosis}</div>
                    <div className="text-slate-600 text-[11px]"><span className="font-semibold">Treatment / Rx:</span> {c.treatment}</div>
                    {c.complaint && <div className="text-slate-500 text-[11px]"><span className="font-semibold">History:</span> {c.complaint}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vaccination History */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
              <Syringe className="w-4 h-4 text-purple-600" />
              <span>Vaccination Records ({patientVaccines.length})</span>
            </h3>
            {patientVaccines.length === 0 ? (
              <p className="text-slate-400 italic bg-slate-50 p-3 rounded-xl">No vaccination records on file.</p>
            ) : (
              <div className="space-y-2">
                {patientVaccines.map((v) => (
                  <div key={v.id} className="p-3 rounded-xl border border-slate-200 bg-purple-50/30 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-purple-900">{v.vaccineName}</div>
                      <div className="text-[11px] text-slate-500">Batch: {v.batch} • Administered: {v.adminDate}</div>
                    </div>
                    <div className="text-right rtl:text-left">
                      <span className="font-bold text-slate-800 text-[11px]">Next Due: {v.nextDueDate}</span>
                      <span className="block text-[10px] text-purple-700 font-semibold">{v.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Billing & Invoice History */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
              <Receipt className="w-4 h-4 text-green-600" />
              <span>Invoice Receipts ({patientInvoices.length})</span>
            </h3>
            {patientInvoices.length === 0 ? (
              <p className="text-slate-400 italic bg-slate-50 p-3 rounded-xl">No invoices billed to this patient yet.</p>
            ) : (
              <div className="space-y-2">
                {patientInvoices.map((inv) => (
                  <div key={inv.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-800">{inv.id}</div>
                      <div className="text-[11px] text-slate-500">{inv.date} • Mode: {inv.paymentMode}</div>
                    </div>
                    <div className="text-right rtl:text-left">
                      <div className="font-black text-slate-900">₨ {inv.paid.toLocaleString()}</div>
                      {inv.balance > 0 && (
                        <div className="text-[10px] text-rose-600 font-bold">Bal: ₨ {inv.balance.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="mt-6 pt-3 border-t flex justify-end">
          <button 
            onClick={onClose} 
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
}
