import React, { useState } from 'react';
import { 
  Pill, 
  Plus, 
  Search, 
  HandMetal, 
  AlertTriangle 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PharmacyView({ 
  pharmacy, 
  onOpenDispense, 
  onOpenAddMedicine, 
  onQuickDispense 
}) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredMedicines = pharmacy.filter((m) => {
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.batch.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('pharmTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('pharmSubtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onOpenDispense} 
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
          >
            <Pill className="w-4 h-4" />
            <span>{t('btnDispense')}</span>
          </button>
          <button 
            onClick={onOpenAddMedicine} 
            className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btnAddItem')}</span>
          </button>
        </div>
      </div>

      {/* Pharmacy Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-slate-800">
            {t('stockTableTitle')}
          </h2>
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 rtl:left-auto rtl:right-3 top-3 text-slate-400" />
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder={t('searchMedPlaceholder')} 
              className="w-full pl-8 pr-3 rtl:pr-8 rtl:pl-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A896]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t('colItemName')}</th>
                <th className="py-2.5 px-3">{t('colCategory')}</th>
                <th className="py-2.5 px-3">{t('colBatch')}</th>
                <th className="py-2.5 px-3">{t('colExpiry')}</th>
                <th className="py-2.5 px-3">{t('colStockUnits')}</th>
                <th className="py-2.5 px-3">{t('colPurchasePrice')}</th>
                <th className="py-2.5 px-3">{t('colRetailPrice')}</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right rtl:text-left">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-slate-400">
                    No medicine items found.
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((m) => {
                  const isLow = m.stock <= 5;
                  return (
                    <tr key={m.id} className="hover:bg-slate-50 border-b border-slate-100">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{m.name}</td>
                      <td className="py-2.5 px-3 text-slate-500">{m.category}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{m.batch}</td>
                      <td className="py-2.5 px-3 text-slate-600">{m.expiry}</td>
                      <td className={`py-2.5 px-3 font-black ${isLow ? 'text-rose-600' : 'text-slate-800'}`}>
                        {m.stock} Units
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">₨ {m.purchasePrice}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">₨ {m.salePrice}</td>
                      <td className="py-2.5 px-3">
                        {isLow ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px] inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>{t('statusLowStock')}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold text-[10px]">
                            {t('statusAdequate')}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right rtl:text-left">
                        <button 
                          onClick={() => onQuickDispense(m.id)} 
                          className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-2 py-1 rounded text-[10px] transition active:scale-95"
                        >
                          {t('quickDispense')}
                        </button>
                      </td>
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
