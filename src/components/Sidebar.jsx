import React from 'react';
import { 
  PieChart, 
  Tv, 
  Contact, 
  Stethoscope, 
  Syringe, 
  Pill, 
  Receipt, 
  Hotel, 
  FileBarChart,
  CircleDot
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({ 
  currentTab, 
  onSelectTab, 
  waitingCount, 
  currentRole, 
  mobileOpen, 
  onCloseMobile 
}) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('menuDashboard'), icon: PieChart, color: 'text-[#00A896]' },
    { id: 'kiosk', label: t('menuKiosk'), icon: Tv, color: 'text-indigo-500' },
    { id: 'registration', label: t('menuRegistration'), icon: Contact, color: 'text-blue-500' },
    { id: 'vetDashboard', label: t('menuVetConsultation'), icon: Stethoscope, color: 'text-emerald-500' },
    { id: 'vaccination', label: t('menuVaccination'), icon: Syringe, color: 'text-purple-500' },
    { id: 'pharmacy', label: t('menuPharmacy'), icon: Pill, color: 'text-amber-500' },
    { id: 'billing', label: t('menuBilling'), icon: Receipt, color: 'text-green-600' },
    { id: 'kennels', label: t('menuKennels'), icon: Hotel, color: 'text-cyan-600' },
    { id: 'reports', label: t('menuReports'), icon: FileBarChart, color: 'text-rose-500' }
  ];

  const roleNames = {
    admin: t('roleAdmin'),
    reception: t('roleReception'),
    vet: t('roleVet'),
    pharmacy: t('rolePharmacy'),
    cashier: t('roleCashier')
  };

  const progressPct = Math.min(100, Math.max(15, waitingCount * 25));

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      <aside className={`
        w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col justify-between 
        transition-all duration-200 z-30 lg:static fixed inset-y-0 left-0 rtl:left-auto rtl:right-0 top-[53px] lg:top-0 
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:translate-x-0'} 
        shadow-xl lg:shadow-none
      `}>
        <div className="p-3 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {t('navCategoryMain')}
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition active:scale-98 text-left rtl:text-right ${
                  isActive 
                    ? 'bg-[#00A896]/10 text-[#00A896] font-bold shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.id === 'kiosk' && waitingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A896] text-white">
                    {waitingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Stats Card in Sidebar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span>{t('activeQueue')}</span>
              <span className="font-bold text-[#00A896]">
                {waitingCount} {t('waitingSuffix')}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#00A896] h-full transition-all duration-300" 
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="font-medium text-slate-600">
                {roleNames[currentRole] || t('roleAdmin')}
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CircleDot className="w-3 h-3 animate-pulse text-emerald-500" />
                <span>{t('liveStatus')}</span>
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
