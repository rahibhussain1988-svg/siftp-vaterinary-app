import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Sparkles, 
  Globe, 
  RotateCcw, 
  ShieldCheck, 
  HeartHandshake, 
  Stethoscope, 
  Pill, 
  Receipt,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ 
  currentRole, 
  onChangeRole, 
  onStartDemo, 
  onResetData, 
  onToggleMobileMenu,
  onNavigateHome 
}) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-[#0F385E] text-white sticky top-0 z-40 shadow-md">
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 flex-wrap">
        
        {/* Brand & Mobile Menu */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button 
            onClick={onToggleMobileMenu} 
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none transition"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={onNavigateHome} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00A896] to-emerald-400 flex items-center justify-center text-white font-black text-xl shadow-inner shadow-teal-900/30 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" opacity="0.3"/>
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-xl text-white">SIFTP</span>
                <span className="text-[10px] tracking-widest uppercase bg-[#00A896] px-1.5 py-0.5 rounded font-bold text-white shadow-sm">
                  {t('appTag')}
                </span>
              </div>
              <p className="text-[11px] text-teal-200 font-medium hidden sm:block">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Live Clock Display */}
          <div className="hidden xl:flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg text-xs font-mono text-teal-200 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{clock}</span>
          </div>

          {/* Demo Badge */}
          <div className="flex items-center bg-amber-500/20 border border-amber-400/40 text-amber-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5 rtl:ml-1.5 rtl:mr-0 animate-pulse"></span>
            <span className="text-[11px]">{t('demoBadge')}</span>
          </div>

          {/* 1-Click Guided Demo Walkthrough */}
          <button 
            onClick={onStartDemo} 
            className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-[#00A896] hover:from-teal-600 hover:to-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition active:scale-95"
            title="Start automated clinical workflow walkthrough"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('quickTour')}</span>
          </button>

          {/* Role Selector */}
          <div className="relative inline-block text-left">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg p-0.5 text-xs">
              <span className="px-2 text-slate-300 hidden sm:inline">{t('roleLabel')}</span>
              <select 
                value={currentRole} 
                onChange={(e) => onChangeRole(e.target.value)} 
                className="bg-transparent text-white font-semibold py-1 px-1.5 focus:outline-none cursor-pointer text-xs"
              >
                <option value="admin" className="text-slate-900">{t('roleAdmin')}</option>
                <option value="reception" className="text-slate-900">{t('roleReception')}</option>
                <option value="vet" className="text-slate-900">{t('roleVet')}</option>
                <option value="pharmacy" className="text-slate-900">{t('rolePharmacy')}</option>
                <option value="cashier" className="text-slate-900">{t('roleCashier')}</option>
              </select>
            </div>
          </div>

          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg transition active:scale-95"
            title="Toggle English / سنڌي"
          >
            <Globe className="w-3.5 h-3.5 text-teal-300" />
            <span className="font-semibold">{lang === 'sd' ? 'English' : 'سنڌي'}</span>
          </button>

          {/* Reset Demo Seed Data */}
          <button 
            onClick={onResetData} 
            title={t('resetDemoBtn')}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition text-xs active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
