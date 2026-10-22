import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => {
        let borderCol = "border-teal-500 bg-slate-900 text-white";
        let Icon = Info;
        let iconCol = "text-teal-400";

        if (toast.type === "success") {
          borderCol = "border-emerald-500 bg-slate-900 text-white";
          Icon = CheckCircle2;
          iconCol = "text-emerald-400";
        } else if (toast.type === "warning") {
          borderCol = "border-amber-500 bg-slate-900 text-white";
          Icon = AlertTriangle;
          iconCol = "text-amber-400";
        }

        return (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl border-l-4 shadow-2xl text-xs flex items-center justify-between gap-3 max-w-sm pointer-events-auto fade-enter ${borderCol}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconCol}`} />
              <span className="font-medium text-[13px] leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
