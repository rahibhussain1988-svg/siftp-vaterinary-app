import React from 'react';
import { 
  Hotel, 
  PlusCircle, 
  Bed, 
  Sparkles, 
  User, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KennelsView({ 
  kennels, 
  onOpenAdmit, 
  onAdmitToKennel, 
  onDischargeKennel 
}) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('kennelTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('kennelSubtitle')}
          </p>
        </div>
        <button 
          onClick={onOpenAdmit} 
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('btnAdmitAnimal')}</span>
        </button>
      </div>

      {/* Kennel Capacity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {kennels.map((k) => {
          const isOccupied = k.status === 'Occupied';
          return (
            <div 
              key={k.id} 
              className={`p-4 rounded-2xl border-2 ${
                isOccupied ? 'bg-white border-amber-300' : 'bg-slate-50/70 border-slate-200'
              } shadow-sm transition flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">{k.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isOccupied ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {k.status}
                  </span>
                </div>
                
                <div className="text-xs text-slate-400 mb-2.5">
                  Category: <span className="font-medium text-slate-600">{k.type}</span>
                </div>

                {isOccupied ? (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-800">{k.patientName}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{k.owner}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Admitted: {k.admittedDate}</span>
                    </p>
                    {k.notes && (
                      <p className="text-[11px] text-slate-600 mt-1 italic font-medium pt-1 border-t border-slate-200">
                        "{k.notes}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    <Bed className="w-10 h-10 text-slate-300 mx-auto mb-2 stroke-1" />
                    <span>{t('readyForAdmit')}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100">
                {isOccupied ? (
                  <button 
                    onClick={() => onDischargeKennel(k.id)} 
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs py-2 rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('dischargeBtn')}</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => onAdmitToKennel(k.id)} 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs py-2 rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{t('admitHereBtn')}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
