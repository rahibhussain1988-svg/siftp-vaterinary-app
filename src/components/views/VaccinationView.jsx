import React, { useState } from 'react';
import { 
  Syringe, 
  CalendarCheck, 
  Bell, 
  AlertTriangle, 
  Plus 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function VaccinationView({ 
  vaccinations, 
  onOpenRecordVaccine 
}) {
  const { t } = useLanguage();
  const [filterType, setFilterType] = useState('all');

  const filteredVaccinations = vaccinations.filter(v => {
    if (filterType === 'due') {
      return v.status !== 'Completed';
    }
    return true;
  });

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('vacTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('vacSubtitle')}
          </p>
        </div>
        <button 
          onClick={onOpenRecordVaccine} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
        >
          <Syringe className="w-4 h-4" />
          <span>{t('btnRecordVaccine')}</span>
        </button>
      </div>

      {/* Vaccine Status Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{t('vacStatCompleted')}</p>
            <h3 className="text-xl font-black text-slate-800">42 Doses</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{t('vacStatDue7')}</p>
            <h3 className="text-xl font-black text-amber-600">9 Animals</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{t('vacStatOverdue')}</p>
            <h3 className="text-xl font-black text-rose-600">3 Alerts</h3>
          </div>
        </div>
      </div>

      {/* Vaccination Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-slate-800">
            {t('vacRegistryTitle')}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilterType('all')} 
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === 'all' 
                  ? 'bg-[#0F385E] text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t('filterAll')}
            </button>
            <button 
              onClick={() => setFilterType('due')} 
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === 'due' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
              }`}
            >
              {t('filterUpcomingDue')}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Patient ID</th>
                <th className="py-2.5 px-3">Animal & Species</th>
                <th className="py-2.5 px-3">Owner Contact</th>
                <th className="py-2.5 px-3">{t('colVaccineName')}</th>
                <th className="py-2.5 px-3">{t('colBatch')}</th>
                <th className="py-2.5 px-3">{t('colAdminDate')}</th>
                <th className="py-2.5 px-3">{t('colNextDueDate')}</th>
                <th className="py-2.5 px-3">{t('colStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVaccinations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-slate-400">
                    No vaccination records found.
                  </td>
                </tr>
              ) : (
                filteredVaccinations.map((v) => {
                  let statusBadge = (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-[10px]">
                      {t('statusCurrent')}
                    </span>
                  );
                  if (v.status === 'Due Today' || v.status === 'Upcoming') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold text-[10px]">
                        {t('statusDueSoon')}
                      </span>
                    );
                  } else if (v.status === 'Overdue') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold text-[10px]">
                        {t('statusOverdue')}
                      </span>
                    );
                  }

                  return (
                    <tr key={v.id} className="hover:bg-slate-50 border-b border-slate-100">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#00A896]">{v.patientId}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">
                        {v.patientName} <span className="text-[10px] text-slate-400 block font-normal">{v.species}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        {v.ownerName} <span className="text-[10px] text-slate-400 block font-normal">{v.ownerPhone}</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-purple-900">{v.vaccineName}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{v.batch}</td>
                      <td className="py-2.5 px-3 text-slate-600">{v.adminDate}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">{v.nextDueDate}</td>
                      <td className="py-2.5 px-3">{statusBadge}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
