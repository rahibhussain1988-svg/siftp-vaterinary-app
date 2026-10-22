import React, { useState } from 'react';
import { X, PawPrint, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RegisterModal({ 
  isOpen, 
  onClose, 
  onSave, 
  nextPatientId 
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    sex: 'Male',
    age: '',
    weight: '',
    ownerName: '',
    ownerPhone: '',
    ownerAddress: '',
    allergies: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.ownerName.trim() || !formData.ownerPhone.trim()) {
      return;
    }
    onSave({
      ...formData,
      id: nextPatientId,
      weight: parseFloat(formData.weight) || 0,
      allergies: formData.allergies.trim() || 'None',
      registeredDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute right-5 rtl:right-auto rtl:left-5 top-5 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#00A896] flex items-center justify-center text-lg">
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {t('regModalTitle')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('regModalSub')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Generated ID Preview */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-600">Auto Patient ID:</span>
            <span className="font-mono font-bold text-[#00A896] text-sm">{nextPatientId}</span>
          </div>

          {/* Owner Details Section */}
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2 border-b pb-1">
              Owner Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Owner Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="e.g. Ahmed Ali" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Mobile Number (WhatsApp) *</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  placeholder="0300-1234567" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-600 mb-1">Address / Farm Location</label>
                <input 
                  type="text" 
                  value={formData.ownerAddress}
                  onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
                  placeholder="e.g. Malir Dairy Colony, Karachi / Hyderabad" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Animal Details Section */}
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2 border-b pb-1">
              Animal Patient Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Animal Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sheru, Moti, Sultan" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Species *</label>
                <select 
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none font-medium"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Cattle">Cattle (Cow/Bull)</option>
                  <option value="Buffalo">Buffalo (Nili-Ravi/Kundi)</option>
                  <option value="Goat">Goat (Kamori/Beetal)</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Horse">Horse</option>
                  <option value="Camel">Camel</option>
                  <option value="Bird">Bird / Falcon</option>
                  <option value="Other">Other Species</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Breed</label>
                <input 
                  type="text" 
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="e.g. German Shepherd, Sahiwal" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Sex</label>
                <select 
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Neutered Male">Neutered / Castrated</option>
                  <option value="Spayed Female">Spayed Female</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Age</label>
                <input 
                  type="text" 
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 2.5 Years" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g. 24.5" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block font-semibold text-slate-600 mb-1">Known Drug Allergies / Clinical Cautions</label>
                <input 
                  type="text" 
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g. Penicillin allergy, aggressive temperament, none" 
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:border-[#00A896] focus:outline-none"
                />
              </div>
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
              <span>Save & Generate ID</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
