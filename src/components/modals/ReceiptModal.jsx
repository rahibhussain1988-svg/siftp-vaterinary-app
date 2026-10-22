import React from 'react';
import { X, Printer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ReceiptModal({ 
  isOpen, 
  onClose, 
  invoice, 
  patient 
}) {
  const { t } = useLanguage();
  if (!isOpen || !invoice) return null;

  const currentPatient = patient || {
    id: invoice.patientId || 'WALK-IN',
    name: 'General Client',
    species: 'Animal',
    breed: 'Local',
    ownerName: invoice.ownerName || 'Cash Client',
    ownerPhone: '0300-0000000'
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <div className="no-print flex justify-end gap-2 mb-3 border-b pb-2">
          <button 
            onClick={() => window.print()} 
            className="bg-[#00A896] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-teal-600 flex items-center gap-1.5 transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <button 
            onClick={onClose} 
            className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>

        {/* RECEIPT BODY (Print Friendly) */}
        <div id="printableReceipt" className="p-4 border border-dashed border-slate-300 rounded-2xl bg-white text-xs">
          
          {/* Header */}
          <div className="text-center pb-3 border-b border-slate-200">
            <div className="font-extrabold text-lg text-[#0F385E] tracking-wider">
              SIFTP VATERINARY HOSPITAL
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Advanced Animal Health, Livestock Care & Clinical Diagnostics
            </p>
            <p className="text-[10px] text-slate-500">
              Plot 14-C, Veterinary Complex, Sindh, Pakistan | Tel: 021-3456789
            </p>
            <div className="mt-1.5 inline-block bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-mono font-bold text-[10px]">
              OFFICIAL CLINICAL CASH RECEIPT
            </div>
          </div>

          {/* Receipt Meta */}
          <div className="py-2.5 grid grid-cols-2 gap-2 text-[11px] border-b border-slate-200">
            <div>
              <p><span className="font-semibold text-slate-500">Invoice:</span> <span className="font-mono font-bold text-slate-800">{invoice.id}</span></p>
              <p><span className="font-semibold text-slate-500">Date:</span> <span className="text-slate-800">{invoice.date || new Date().toLocaleDateString()}</span></p>
              <p><span className="font-semibold text-slate-500">Payment:</span> <span className="font-semibold text-slate-800">{invoice.paymentMode}</span></p>
            </div>
            <div>
              <p><span className="font-semibold text-slate-500">Patient:</span> <span className="font-bold text-slate-800">{currentPatient.name} ({currentPatient.id})</span></p>
              <p><span className="font-semibold text-slate-500">Species/Breed:</span> <span className="text-slate-800">{currentPatient.species} / {currentPatient.breed || 'Standard'}</span></p>
              <p><span className="font-semibold text-slate-500">Owner:</span> <span className="text-slate-800">{currentPatient.ownerName} ({currentPatient.ownerPhone})</span></p>
            </div>
          </div>

          {/* Line items table */}
          <div className="py-2.5">
            <table className="w-full text-left rtl:text-right text-[11px]">
              <thead>
                <tr className="border-b text-slate-500 font-semibold">
                  <th className="py-1">Description</th>
                  <th className="py-1 text-center font-mono">Qty</th>
                  <th className="py-1 text-right rtl:text-left font-mono">Price</th>
                  <th className="py-1 text-right rtl:text-left font-mono">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 font-medium">{item.name}</td>
                    <td className="py-1.5 text-center font-mono">{item.qty}</td>
                    <td className="py-1.5 text-right rtl:text-left font-mono">₨ {item.price.toLocaleString()}</td>
                    <td className="py-1.5 text-right rtl:text-left font-mono font-bold">₨ {(item.price * item.qty).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals summary */}
          <div className="border-t border-slate-200 pt-2 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">₨ {invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount Applied:</span>
              <span className="font-semibold text-emerald-600">₨ {invoice.discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-[#0F385E] pt-1 border-t border-dashed">
              <span>Net Paid Amount:</span>
              <span className="text-[#00A896]">₨ {invoice.paid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>Remaining Outstanding Balance:</span>
              <span className="font-bold text-rose-600">₨ {invoice.balance.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
            <p>Thank you for trusting SIFTP Vaternity Hospital for your animal's health!</p>
            <p className="font-mono mt-0.5">Powered by SIFTP Cloud Vaternity ERP (siftp.com)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
