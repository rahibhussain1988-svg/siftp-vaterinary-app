import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  PawPrint, 
  Ticket, 
  Search, 
  Receipt, 
  Volume2, 
  Clock, 
  User, 
  Stethoscope, 
  Tv 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KioskView({ 
  queue, 
  onOpenRegister, 
  onOpenToken, 
  onSwitchTab, 
  onCallPatient,
  onStartConsultation
}) {
  const { t } = useLanguage();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const waitingList = queue.filter(q => q.status === 'Waiting');

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('kioskHeading')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('kioskSubtitle')}
          </p>
        </div>
        <button 
          onClick={onOpenToken} 
          className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('btnNewToken')}</span>
        </button>
      </div>

      {/* POS / KIOSK LARGE ACTION TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={onOpenRegister} 
          className="cursor-pointer bg-white border-2 border-slate-200 hover:border-[#00A896] rounded-2xl p-5 shadow-sm transition hover:shadow-md active:scale-95 text-center group"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-teal-50 group-hover:bg-[#00A896] text-[#00A896] group-hover:text-white flex items-center justify-center text-2xl transition">
            <PawPrint className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-[#00A896] transition">
            {t('kioskTile1')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {t('kioskTile1Sub')}
          </p>
        </div>

        <div 
          onClick={onOpenToken} 
          className="cursor-pointer bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-5 shadow-sm transition hover:shadow-md active:scale-95 text-center group"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center text-2xl transition">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition">
            {t('kioskTile2')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {t('kioskTile2Sub')}
          </p>
        </div>

        <div 
          onClick={() => onSwitchTab('registration')} 
          className="cursor-pointer bg-white border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-5 shadow-sm transition hover:shadow-md active:scale-95 text-center group"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center text-2xl transition">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition">
            {t('kioskTile3')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {t('kioskTile3Sub')}
          </p>
        </div>

        <div 
          onClick={() => onSwitchTab('billing')} 
          className="cursor-pointer bg-white border-2 border-slate-200 hover:border-green-500 rounded-2xl p-5 shadow-sm transition hover:shadow-md active:scale-95 text-center group"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-green-50 group-hover:bg-green-600 text-green-600 group-hover:text-white flex items-center justify-center text-2xl transition">
            <Receipt className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-green-600 transition">
            {t('kioskTile4')}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            {t('kioskTile4Sub')}
          </p>
        </div>
      </div>

      {/* LIVE TOKEN BOARD (Simulating Waiting Room TV) */}
      <div className="bg-[#0F385E] text-white rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Tv className="w-5 h-5 text-teal-300" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <h2 className="text-lg font-bold tracking-wider uppercase text-teal-300">
              {t('tvBoardTitle')}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">Sound Chime Enabled</span>
            <div className="text-xs text-slate-200 font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/10">
              {clock}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {waitingList.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-slate-400">
              <Tv className="w-12 h-12 mx-auto mb-2 text-slate-600 opacity-50" />
              <p>{t('waitingEmpty')}</p>
            </div>
          ) : (
            waitingList.map((q, idx) => {
              const isNext = idx === 0;
              return (
                <div 
                  key={q.token} 
                  className={`p-4 rounded-xl border ${
                    isNext 
                      ? 'bg-[#00A896]/20 border-[#00A896] ring-2 ring-[#00A896]' 
                      : 'bg-slate-800/80 border-slate-700'
                  } text-white shadow-md relative flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-mono font-black text-amber-300">
                        {q.token}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        isNext ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {isNext ? t('callingNow') : t('inLine')}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="text-base font-bold">
                        {q.patientName} <span className="text-xs text-slate-300 font-normal">({q.species})</span>
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Owner: {q.ownerName}
                      </div>
                      <div className="text-[11px] text-teal-300 mt-1 flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                        <span>{q.doctor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                    <button 
                      onClick={() => onCallPatient(q)} 
                      className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs py-1.5 rounded-lg border border-amber-400/30 transition flex items-center justify-center gap-1 active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Chime & Call</span>
                    </button>
                    <button 
                      onClick={() => onStartConsultation(q.token)} 
                      className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition active:scale-95"
                    >
                      Enter Room
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
