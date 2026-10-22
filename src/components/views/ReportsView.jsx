import React, { useState } from 'react';
import { 
  FileBarChart, 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Syringe 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ReportsView({ 
  patients, 
  consultations, 
  invoices, 
  vaccinations, 
  onExportCSV 
}) {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('today');
  const [doctorFilter, setDoctorFilter] = useState('all');

  // Species distribution breakdown
  const speciesCounts = {};
  patients.forEach(p => {
    speciesCounts[p.species] = (speciesCounts[p.species] || 0) + 1;
  });

  const totalPatients = patients.length || 1;

  // Financial realization totals
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.net, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalBal = invoices.reduce((sum, inv) => sum + inv.balance, 0);

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('repTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('repSubtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onExportCSV('consultations')} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t('exportConsultCsv')}</span>
          </button>
          <button 
            onClick={() => onExportCSV('revenue')} 
            className="bg-[#0F385E] hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{t('exportInvoicesCsv')}</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4 text-slate-400" />
          <label className="font-bold text-slate-600">Date Range:</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)} 
            className="border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-[#00A896]"
          >
            <option value="today">Today (22 Oct 2026)</option>
            <option value="week">Past 7 Days</option>
            <option value="month">Current Month</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <label className="font-bold text-slate-600">Doctor Filter:</label>
          <select 
            value={doctorFilter} 
            onChange={(e) => setDoctorFilter(e.target.value)} 
            className="border border-slate-200 rounded-lg p-1.5 text-xs focus:outline-none focus:border-[#00A896]"
          >
            <option value="all">All Doctors</option>
            <option value="Dr. Fahad Khan">Dr. Fahad Khan</option>
            <option value="Dr. Ayesha Baloch">Dr. Ayesha Baloch</option>
          </select>
        </div>
      </div>

      {/* Species Distribution Statistics & Financial Realization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Species Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 mb-3.5">
            {t('speciesBreakdown')}
          </h3>
          <div className="space-y-3 text-xs">
            {Object.entries(speciesCounts).map(([species, count]) => {
              const pct = Math.round((count / totalPatients) * 100);
              return (
                <div key={species}>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span className="font-semibold">{species}</span>
                    <span className="font-mono text-slate-800">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#00A896] h-full rounded-full transition-all duration-300" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Realization */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-800 mb-3.5">
              {t('revenueSummary')}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600">{t('totalBilled')}</span>
                <span className="font-black text-slate-900 text-sm">₨ {totalBilled.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-100">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('totalReceived')}</span>
                </span>
                <span className="font-black text-sm">₨ {totalPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl text-rose-800 border border-rose-100">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{t('outstandingBalance')}</span>
                </span>
                <span className="font-black text-sm">₨ {totalBal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl text-blue-800 border border-blue-100">
                <span className="flex items-center gap-1.5">
                  <Syringe className="w-4 h-4 text-blue-600" />
                  <span>{t('vaccinesPeriod')}</span>
                </span>
                <span className="font-black text-sm">{vaccinations.length * 8} Doses</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
