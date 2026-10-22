import React, { useState } from 'react';
import { 
  Receipt, 
  Trash2, 
  Plus, 
  Printer, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Save 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BillingView({ 
  patients, 
  quickServices, 
  posCart, 
  onAddPosItem, 
  onRemovePosItem, 
  onClearCart, 
  onProcessCheckout,
  selectedPatientId,
  onSelectPatient,
  currentInvoiceNum 
}) {
  const { t } = useLanguage();
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');

  const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountVal = parseFloat(discount) || 0;
  const netTotal = Math.max(0, subtotal - discountVal);
  const effectivePaid = paidAmount === '' ? netTotal : (parseFloat(paidAmount) || 0);
  const remainingBalance = Math.max(0, netTotal - effectivePaid);

  const handleAddCustom = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(customPrice);
    if (!customName.trim() || isNaN(priceNum) || priceNum <= 0) return;
    onAddPosItem(customName.trim(), priceNum, 'Miscellaneous');
    setCustomName('');
    setCustomPrice('');
  };

  const handleCheckout = (andPrint) => {
    onProcessCheckout({
      andPrint,
      discount: discountVal,
      paid: effectivePaid,
      paymentMode,
      net: netTotal,
      balance: remainingBalance
    });
  };

  return (
    <div className="space-y-6 fade-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {t('posTitle')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('posSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">{t('invoiceRef')}</span>
          <span className="text-xs font-mono font-bold text-[#0F385E] bg-white border border-slate-300 px-3 py-1 rounded-lg">
            {currentInvoiceNum}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* POS ITEM SELECTION (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Patient Selector Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t('billToPatient')}
            </label>
            <select 
              value={selectedPatientId} 
              onChange={(e) => onSelectPatient(e.target.value)} 
              className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:border-[#00A896] font-medium"
            >
              <option value="">-- Choose Animal Patient (Or Walk-In Customer) --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.species} / {p.breed}) - Owner: {p.ownerName}
                </option>
              ))}
            </select>
          </div>

          {/* Service Category Quick Tap Tiles */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
              {t('quickItemsTitle')}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {quickServices.map((svc, idx) => (
                <button 
                  key={idx}
                  onClick={() => onAddPosItem(svc.name, svc.price, svc.category)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50 hover:border-[#00A896] text-left rtl:text-right transition active:scale-95 group"
                >
                  <div className="text-xs font-bold text-[#0F385E] group-hover:text-[#00A896] transition truncate">
                    {svc.name}
                  </div>
                  <div className="text-[11px] text-[#00A896] font-semibold mt-1">
                    ₨ {svc.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Custom Line Item Addition */}
          <form onSubmit={handleAddCustom} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
            <input 
              type="text" 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={t('customItemPlaceholder')} 
              className="flex-1 text-xs border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-[#00A896]"
            />
            <input 
              type="number" 
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder={t('pricePlaceholder')} 
              className="w-28 text-xs border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-[#00A896]"
            />
            <button 
              type="submit" 
              className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg font-semibold hover:bg-slate-700 transition active:scale-95 whitespace-nowrap"
            >
              {t('btnAddCustomItem')}
            </button>
          </form>
        </div>

        {/* POS CART & CHECKOUT (5 COLS) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="font-bold text-sm text-slate-800">
                {t('cartTitle')}
              </h3>
              {posCart.length > 0 && (
                <button 
                  onClick={onClearCart} 
                  className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition"
                >
                  {t('clearCart')}
                </button>
              )}
            </div>

            {/* Cart Line Items List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
              {posCart.length === 0 ? (
                <div className="text-center py-10 text-slate-400 italic">
                  {t('cartEmpty')}
                </div>
              ) : (
                posCart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {item.category} • ₨ {item.price.toLocaleString()} x {item.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        ₨ {(item.price * item.qty).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => onRemovePosItem(index)} 
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Billing Calculations */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{t('subtotal')}</span>
              <span className="font-bold text-slate-800">₨ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>{t('discount')}</span>
              <input 
                type="number" 
                value={discount} 
                min="0" 
                onChange={(e) => setDiscount(e.target.value)} 
                className="w-24 text-right rtl:text-left border border-slate-200 rounded p-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#00A896]"
              />
            </div>

            <div className="flex justify-between text-base font-extrabold text-[#0F385E] pt-2 border-t border-slate-100">
              <span>{t('netPayable')}</span>
              <span className="text-[#00A896]">₨ {netTotal.toLocaleString()}</span>
            </div>

            {/* Payment Method & Amount Paid */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-0.5">
                  {t('paymentModeLabel')}
                </label>
                <select 
                  value={paymentMode} 
                  onChange={(e) => setPaymentMode(e.target.value)} 
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-slate-50 font-medium focus:outline-none"
                >
                  <option value="Cash">Cash Currency</option>
                  <option value="Card">Credit / Debit Card</option>
                  <option value="Online">JazzCash / EasyPaisa</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-0.5">
                  {t('paidNowLabel')}
                </label>
                <input 
                  type="number" 
                  value={paidAmount} 
                  placeholder={netTotal.toString()}
                  onChange={(e) => setPaidAmount(e.target.value)} 
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800 focus:outline-none focus:border-[#00A896]"
                />
              </div>
            </div>

            <div className="flex justify-between text-xs font-semibold text-slate-500 pt-1">
              <span>{t('remainingBalance')}</span>
              <span className="text-rose-600 font-bold">₨ {remainingBalance.toLocaleString()}</span>
            </div>

            {/* Checkout Actions */}
            <div className="pt-3 flex gap-2">
              <button 
                onClick={() => handleCheckout(true)} 
                disabled={posCart.length === 0}
                className="flex-1 bg-[#00A896] hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl shadow transition text-xs flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>{t('payAndPrint')}</span>
              </button>
              <button 
                onClick={() => handleCheckout(false)} 
                disabled={posCart.length === 0}
                className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold py-2.5 px-3 rounded-xl transition text-xs flex items-center gap-1 active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t('saveOnly')}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
