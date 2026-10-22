import React from 'react';
import { 
  Stethoscope, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function VetConsultationView({ 
  queue, 
  patients, 
  consultations, 
  onStartConsultation, 
  onViewConsultationNote 
}) {
  const { t } = useLanguage();

  const waitingQueue = queue.filter(q => q.status === 'Waiting');

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('vetTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('vetSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">{t('attendingDoctor')}</span>
          <span className="text-xs font-bold text-[#0F385E] bg-white border border-slate-300 px-3 py-1 rounded-lg shadow-2xs">
            Dr. Fahad Khan (DVM)
          </span>
        </div>
      </div>

      {/* Waiting Patients Cards */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00A896]" />
          <span>{t('vetQueueHeading')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {waitingQueue.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500 opacity-60" />
              <p>{t('allQueuesCleared')}</p>
            </div>
          ) : (
            waitingQueue.map((q) => {
              const patient = patients.find(p => p.id === q.patientId) || {};
              return (
                <div 
                  key={q.token} 
                  className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-[#00A896] transition shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-black text-sm bg-teal-100 text-[#00A896] px-2 py-0.5 rounded">
                        {q.token}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{q.time}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-base font-extrabold text-slate-800">{q.patientName}</h3>
                    <p className="text-xs text-slate-500">
                      {patient.id || q.patientId} • {q.species} ({patient.breed || 'Breed'}) • {patient.weight || '--'} kg
                    </p>
                    
                    <div className="mt-2.5 bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700">
                      <span className="font-bold text-slate-500 block text-[10px] uppercase">Reason for Visit:</span>
                      <p className="font-medium text-slate-800 mt-0.5">{q.reason || 'General checkup'}</p>
                    </div>

                    {patient.allergies && patient.allergies !== 'None' && (
                      <div className="mt-2 text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        <span>Caution: {patient.allergies}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t flex gap-2">
                    <button 
                      onClick={() => onStartConsultation(q.token)} 
                      className="flex-1 bg-[#00A896] hover:bg-teal-600 text-white font-bold text-xs py-2 rounded-xl shadow transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span>{t('startConsultation')}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Completed Consultations History Today */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-800 mb-3">
          {t('consultHistoryHeading')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t('colDateTime')}</th>
                <th className="py-2.5 px-3">Patient ID</th>
                <th className="py-2.5 px-3">Animal Name</th>
                <th className="py-2.5 px-3">Species</th>
                <th className="py-2.5 px-3">{t('colDiagnosis')}</th>
                <th className="py-2.5 px-3">{t('colPrescription')}</th>
                <th className="py-2.5 px-3">Doctor</th>
                <th className="py-2.5 px-3 text-right rtl:text-left">{t('colAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-slate-400">
                    {t('noConsultations')}
                  </td>
                </tr>
              ) : (
                consultations.slice().reverse().map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 border-b border-slate-100">
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{c.date}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#00A896]">{c.patientId}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{c.patientName}</td>
                    <td className="py-2.5 px-3">{c.species}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{c.diagnosis}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">{c.treatment}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">{c.doctor}</td>
                    <td className="py-2.5 px-3 text-right rtl:text-left whitespace-nowrap">
                      <button 
                        onClick={() => onViewConsultationNote(c)} 
                        className="text-[#00A896] hover:underline font-semibold"
                      >
                        {t('viewNote')}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
