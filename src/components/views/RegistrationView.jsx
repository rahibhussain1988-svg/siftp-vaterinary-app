import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  PawPrint, 
  Ticket, 
  FileText, 
  User, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RegistrationView({ 
  patients, 
  onOpenRegister, 
  onIssueTokenForPatient, 
  onViewPatientHistory 
}) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerPhone.includes(search) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase());

    const matchesSpecies = 
      selectedSpecies === 'all' || 
      p.species.toLowerCase() === selectedSpecies.toLowerCase();

    return matchesSearch && matchesSpecies;
  });

  const speciesOptions = [
    { id: 'all', label: t('filterAll') },
    { id: 'Dog', label: t('filterDogs') },
    { id: 'Cat', label: t('filterCats') },
    { id: 'Cattle', label: t('filterCattle') },
    { id: 'Buffalo', label: t('filterBuffalo') },
    { id: 'Goat', label: t('filterGoat') },
    { id: 'Horse', label: t('filterHorse') }
  ];

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('regTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('regSubtitle')}
          </p>
        </div>
        <button 
          onClick={onOpenRegister} 
          className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t('btnRegisterNewAnimal')}</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-3 text-slate-400" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder={t('searchPatientPlaceholder')} 
            className="w-full pl-9 pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A896]"
          />
        </div>

        {/* Species filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {speciesOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedSpecies(opt.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition active:scale-95 whitespace-nowrap ${
                selectedSpecies === opt.id 
                  ? 'bg-[#0F385E] text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPatients.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
            <PawPrint className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>{t('noAnimalsFound')}</p>
          </div>
        ) : (
          filteredPatients.map((p) => (
            <div 
              key={p.id} 
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                      <PawPrint className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{p.name}</h3>
                      <span className="font-mono text-[10px] text-[#00A896] font-bold">{p.id}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {p.species}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">{t('colBreed')}</span>{' '}
                    <span className="font-medium text-slate-700">{p.breed || 'Local'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{t('colSex')}</span>{' '}
                    <span className="font-medium text-slate-700">{p.sex}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{t('colAge')}</span>{' '}
                    <span className="font-medium text-slate-700">{p.age}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{t('colWeight')}</span>{' '}
                    <span className="font-medium text-slate-700">{p.weight} kg</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="text-slate-700 font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{p.ownerName}</span>
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{p.ownerPhone}</span>
                    </span>
                  </div>
                  {p.allergies && p.allergies !== 'None' && (
                    <div className="mt-1.5 text-[11px] text-rose-700 bg-rose-50 border border-rose-200/50 px-2 py-0.5 rounded-lg font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-rose-500" />
                      <span>{t('cautionBadge')} {p.allergies}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button 
                  onClick={() => onIssueTokenForPatient(p.id)} 
                  className="flex-1 bg-[#00A896]/10 hover:bg-[#00A896]/20 text-[#00A896] font-bold text-xs py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>{t('btnIssueToken')}</span>
                </button>
                <button 
                  onClick={() => onViewPatientHistory(p.id)} 
                  className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs py-1.5 rounded-lg transition font-medium flex items-center gap-1 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('btnHistory')}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
