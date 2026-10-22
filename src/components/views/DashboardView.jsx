import React from 'react';
import { 
  PawPrint, 
  Ticket, 
  Stethoscope, 
  Receipt, 
  Clock, 
  FileText, 
  ShieldAlert, 
  Bed, 
  DollarSign, 
  AlertTriangle, 
  CalendarCheck, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  User,
  HeartPulse
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DashboardView({ 
  patients, 
  queue, 
  consultations, 
  vaccinations, 
  kennels, 
  pharmacy, 
  invoices, 
  doctors,
  onOpenRegister, 
  onOpenToken, 
  onSwitchTab, 
  onStartConsultation,
  onCallPatient
}) {
  const { t } = useLanguage();

  const waitingQueue = queue.filter(q => q.status === 'Waiting');
  const lowStockCount = pharmacy.filter(m => m.stock <= 5).length;
  const occupiedKennels = kennels.filter(k => k.status === 'Occupied').length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const vaccinesDueCount = vaccinations.filter(v => v.status !== 'Completed').length;
  const overdueVaccinesCount = vaccinations.filter(v => v.status === 'Overdue').length;

  return (
    <div className="space-y-6 fade-enter">
      {/* Banner & Quick Action Launchers */}
      <div className="bg-gradient-to-r from-[#0F385E] via-slate-800 to-[#00A896] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6 rtl:pl-6">
          <HeartPulse className="w-56 h-56 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <PawPrint className="w-3.5 h-3.5 text-teal-300" />
            <span>SIFTP Vaternity Management Cloud</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('dashGreeting')}
          </h1>
          <p className="text-slate-200 text-sm mt-1 mb-4 leading-relaxed">
            {t('dashSubtitle')}
          </p>
          
          {/* Big Touch Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button 
              onClick={onOpenRegister} 
              className="bg-[#00A896] hover:bg-teal-600 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
            >
              <PawPrint className="w-4 h-4" />
              <span>{t('btnRegisterAnimal')}</span>
            </button>
            <button 
              onClick={onOpenToken} 
              className="bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl backdrop-blur transition flex items-center gap-2 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>{t('btnGenerateToken')}</span>
            </button>
            <button 
              onClick={() => onSwitchTab('vetDashboard')} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t('btnConsultationRoom')}</span>
            </button>
            <button 
              onClick={() => onSwitchTab('billing')} 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
            >
              <Receipt className="w-4 h-4" />
              <span>{t('btnPosBilling')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 PRIMARY SUMMARY KPI METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Registered Animals */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiRegistered')}
            </p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {patients.length}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8 today
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <PawPrint className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Waiting Queue */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiWaiting')}
            </p>
            <h3 className="text-2xl font-black text-[#00A896] mt-1">
              {waitingQueue.length}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {t('kpiAvgWait')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A896] flex items-center justify-center text-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Consultations */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiConsultations')}
            </p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {consultations.length}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> completed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Vaccines Due */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiVaccineDue')}
            </p>
            <h3 className="text-2xl font-black text-purple-600 mt-1">
              {vaccinesDueCount}
            </h3>
            <p className="text-[11px] text-rose-500 font-semibold mt-1">
              {overdueVaccinesCount} Overdue
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Card 5: Inpatient Kennels */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiKennels')}
            </p>
            <h3 className="text-2xl font-black text-indigo-600 mt-1">
              {occupiedKennels} / {kennels.length}
            </h3>
            <p className="text-[11px] text-indigo-500 font-medium mt-1">
              {kennels.length - occupiedKennels} Kennels Free
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
            <Bed className="w-6 h-6" />
          </div>
        </div>

        {/* Card 6: Today's Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiRevenue')}
            </p>
            <h3 className="text-2xl font-black text-green-700 mt-1">
              ₨ {totalRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Collected
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 7: Low Stock */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiLowStock')}
            </p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">
              {lowStockCount}
            </h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              Reorder Required
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 8: Appointments Booked */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t('kpiAppointments')}
            </p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">11</h3>
            <p className="text-[11px] text-slate-500 mt-1">4 remaining today</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* TWO COLUMN DASHBOARD: LIVE PATIENT QUEUE & TODAY'S PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Patient Queue Column (2 spans) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A896] animate-ping"></span>
                <span>{t('liveQueueTitle')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('liveQueueSubtitle')}
              </p>
            </div>
            <button 
              onClick={onOpenToken} 
              className="text-xs bg-[#00A896]/10 hover:bg-[#00A896]/20 text-[#00A896] font-semibold px-3 py-1.5 rounded-lg transition active:scale-95"
            >
              + {t('addToken')}
            </button>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{t('colToken')}</th>
                  <th className="py-2.5 px-3">{t('colPatient')}</th>
                  <th className="py-2.5 px-3">{t('colSpecies')}</th>
                  <th className="py-2.5 px-3">{t('colOwner')}</th>
                  <th className="py-2.5 px-3">{t('colDoctor')}</th>
                  <th className="py-2.5 px-3">{t('colStatus')}</th>
                  <th className="py-2.5 px-3 text-right rtl:text-left">{t('colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {waitingQueue.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-slate-400">
                      No patients waiting in queue. All clear!
                    </td>
                  </tr>
                ) : (
                  waitingQueue.map((q) => (
                    <tr key={q.token} className="hover:bg-slate-50 transition border-b border-slate-100">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#00A896]">
                        {q.token}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">
                        {q.patientName}
                        <span className="text-[10px] text-slate-400 block font-normal">{q.patientId}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        {q.species}
                        <span className="text-[10px] text-slate-400 block font-normal">({q.breed})</span>
                      </td>
                      <td className="py-2.5 px-3">{q.ownerName}</td>
                      <td className="py-2.5 px-3">{q.doctor}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold text-[10px]">
                          {q.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right rtl:text-left">
                        <div className="flex items-center justify-end rtl:justify-start gap-1.5">
                          <button 
                            onClick={() => onCallPatient(q)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-2 py-1 rounded-lg text-[10px] transition active:scale-95"
                            title="Play chime and announce waiting display"
                          >
                            {t('callPatient')}
                          </button>
                          <button 
                            onClick={() => onStartConsultation(q.token)}
                            className="bg-[#00A896] hover:bg-teal-600 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] transition shadow-sm active:scale-95"
                          >
                            {t('startConsultation')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue & Department Workload Column (1 span) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-slate-800">
                {t('revenueChartTitle')}
              </h2>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                PKR Currency
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {t('revenueChartSub')}
            </p>

            {/* Visual Breakdown Bar Graph */}
            <div className="space-y-3.5 text-xs font-medium">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Pharmacy & Injections</span>
                  <span className="font-bold text-slate-800">₨ 24,000 (49%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Vet Consultations</span>
                  <span className="font-bold text-slate-800">₨ 13,500 (28%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#00A896] h-full rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Vaccination Protocols</span>
                  <span className="font-bold text-slate-800">₨ 6,500 (13%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Kennel Boarding & Surgery</span>
                  <span className="font-bold text-slate-800">₨ 4,500 (10%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor on Duty Roster */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              {t('vetsOnDuty')}
            </p>
            <div className="space-y-2.5">
              {doctors.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px]">
                      {doc.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.title}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                    {t('inClinic')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
