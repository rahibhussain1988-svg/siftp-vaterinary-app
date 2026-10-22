import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';

export default function AddMedicineModal({ 
  isOpen, 
  onClose, 
  onAdd 
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Antibiotic',
    batch: '',
    expiry: '',
    stock: 20,
    purchasePrice: 300,
    salePrice: 450
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onAdd({
      id: "MED-" + Date.now().toString().slice(-4),
      name: formData.name.trim(),
      category: formData.category,
      batch: formData.batch.trim() || 'MED-' + Math.floor(Math.random() * 900 + 100),
      expiry: formData.expiry || '2027-12',
      stock: parseInt(formData.stock) || 1,
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      salePrice: parseFloat(formData.salePrice) || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute right-5 rtl:right-auto rtl:left-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#00A896] flex items-center justify-center text-lg">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Add Pharmacy Inventory</h2>
            <p className="text-xs text-slate-500">Record veterinary medical supplies and pricing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Item Name *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Enrofloxacin 10% 100ml" 
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
              >
                <option value="Antibiotic">Antibiotic</option>
                <option value="Anthelmintic">Anthelmintic (Dewormer)</option>
                <option value="NSAID Analgesic">NSAID Analgesic</option>
                <option value="Biologics">Biologics / Vaccine</option>
                <option value="Metabolic">Metabolic Infusion</option>
                <option value="Emergency Antidote">Emergency Antidote</option>
                <option value="Surgical">Surgical Supply</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Batch Number</label>
              <input 
                type="text" 
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                placeholder="e.g. ENR-401" 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Expiry Date</label>
              <input 
                type="text" 
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                placeholder="YYYY-MM" 
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Stock Units</label>
              <input 
                type="number" 
                min="1"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Retail (PKR)</label>
              <input 
                type="number" 
                min="0"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-bold text-[#00A896]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-[#00A896] hover:bg-teal-600 text-white font-bold rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
