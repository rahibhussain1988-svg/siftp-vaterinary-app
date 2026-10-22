# SIFTP Vaternity Hospital & Clinical Management System
### سِفٽپ ويٽرنري اسپتال ۽ ڪلينڪل مئنيجمينٽ سسٽم

A veterinary hospital and clinical enterprise resource planning (ERP) system designed for small animal clinics, livestock farms, bovine dairies, and emergency animal care centers. Built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide React**, with complete **Bilingual support (English LTR & Sindhi RTL)**.

---

## 🚀 Key Modules & Capabilities

1. **Executive Clinical Dashboard**
   - 8 Real-time Summary KPI metric cards: Registered Animals, Live Waiting Queue, Today's Consultations, Vaccines Due/Overdue, Inpatient Kennels, Today's Revenue (PKR), Low Stock Medicines, and Appointments.
   - Interactive Live Patient Queue table with one-click **"Call Patient"** (with hospital chime sound via Web Audio API) and **"Start Consultation"**.
   - Dynamic Revenue Breakdown chart across Pharmacy, Consultations, Vaccination, and Boarding/Surgery.
   - On-duty veterinarians status roster (Dr. Fahad Khan - DVM Surgery, Dr. Ayesha Baloch - MPhil Livestock).

2. **Reception Touch-Kiosk & Token Queue Management**
   - Large touch-optimized quick tiles: New Animal Register, Quick Check-in, Patient Search, and Cashier Billing.
   - Live TV Waiting Room Display Screen with real-time status (`Calling Now` vs `In Line`), live clock, and synthesized audio calling chimes.

3. **Animal & Owner Registration Directory**
   - Supports companion pets (Dogs, Cats, Horses, Birds) and large livestock (Cattle/Sahiwal, Buffalo/Kundi, Goats/Kamori, Sheep, Camels).
   - Instant search by Patient ID, animal name, breed, or owner contact number.
   - Auto-generated patient IDs (`ANI-100x`) with microchip tracking, age, sex, weight, and critical drug allergy warnings (e.g. Penicillin allergy).
   - Dedicated Patient History modal with complete medical records, past consultations, vaccinations, and invoices.

4. **Veterinarian Consultation Room (EMR)**
   - Active waiting consultation queue cards.
   - Physical Vitals triage: Temperature (°F), Weight (kg), Heart Rate (bpm), and Respiration Rate (/min).
   - Clinical SOAP Notes: Chief Complaint & History, Physical Examination Findings, Clinical Diagnosis, and Follow-Up scheduling.
   - Electronic Rx Prescription generator linked directly to pharmacy inventory and cashier POS billing.

5. **Vaccination Protocol & Immunity Tracker**
   - Vaccine immunization registry for Rabies, Canine DHPP 5-in-1, Bovine FMD (Foot & Mouth), HS (Haemorrhagic Septicaemia), Enterotoxaemia, and Feline Tricat.
   - Auto-calculated booster recall dates (1-year default) and overdue alert tracking.

6. **Pharmacy & Medical Stock Inventory**
   - Real-time inventory tracking for antibiotics, anthelmintics, analgesics, vaccines, and emergency antidotes.
   - Batch numbers, expiry dates, purchase costs, and retail prices.
   - Instant low-stock warning indicators (≤ 5 units).
   - Quick medicine dispensing modal and "Add Inventory" modal.

7. **Touch POS Billing & Cashier Desk**
   - Direct patient selection or walk-in client billing.
   - Quick-tap service tiles for OPD consultations, vaccinations, CBC tests, wound dressings, kennel boarding, and injections.
   - Custom line item entry, subtotal calculation, discount adjustments, net payable calculation, and remaining balance tracking.
   - Payment modes: Cash Currency, Credit/Debit Card, and JazzCash/EasyPaisa.
   - Official Printable Clinical Tax Invoice Receipt (`window.print()` formatted) with celebration confetti.

8. **Kennel, Ward & Inpatient Admission Management**
   - Interactive capacity grid: Small Dog suites, Large Dog suites, Feline ward suites, Livestock pens, and Isolation quarantine.
   - Inpatient admission workflow with diet/medical instructions.
   - 1-Click Discharge & Sanitize workflow.

9. **Analytics & Audit-Ready Exportable Reports**
   - Patient Case Load by Species visual breakdown bars.
   - Financial Realization Summary (Total Billed, Total Collected, Outstanding Balances).
   - One-click CSV exports:
     - `SIFTP_Consultations_Report.csv`
     - `SIFTP_Revenue_Invoices_Report.csv`

10. **Bilingual English & Sindhi (سنڌي)**
    - Seamless instant language switching with bidirectional layout adjustment (`dir="ltr"` and `dir="rtl"`).
    - Authentic Perso-Arabic Sindhi typography using Google Fonts (Noto Naskh Arabic & Lateef).

11. **1-Click Guided Demo & Role Simulation**
    - Built-in automated guided walkthrough of the clinical workflow.
    - Role selector: Administrator, Receptionist, Veterinarian, Pharmacy Staff, Cashier.
    - LocalStorage persistence with full Demo Reset capability.

---

## 🛠️ Project Structure

```
siftp-vaternity-app/
├── index.html                   # Entry HTML with fonts and metadata
├── standalone-app.html          # Self-contained zero-dependency portable app
├── package.json                 # Project dependencies & build scripts
├── vite.config.js               # Vite + React + Tailwind v4 config
├── src/
│   ├── main.jsx                 # Application entrypoint
│   ├── App.jsx                  # Main coordinator, state & modals
│   ├── index.css                # Tailwind styling, fonts & print rules
│   ├── context/
│   │   └── LanguageContext.jsx  # English / Sindhi RTL context provider
│   ├── data/
│   │   ├── initialData.js       # Seed dataset (Pakistani veterinary cases)
│   │   └── translations.js      # Complete bilingual dictionary
│   ├── utils/
│   │   └── audioChime.js        # Web Audio API hospital queue chime
│   ├── components/
│   │   ├── Navbar.jsx           # Top branding, role picker & demo triggers
│   │   ├── Sidebar.jsx          # Tab navigation & live queue status
│   │   ├── Toast.jsx            # Dynamic toast alerts
│   │   ├── views/
│   │   │   ├── DashboardView.jsx
│   │   │   ├── KioskView.jsx
│   │   │   ├── RegistrationView.jsx
│   │   │   ├── VetConsultationView.jsx
│   │   │   ├── VaccinationView.jsx
│   │   │   ├── PharmacyView.jsx
│   │   │   ├── BillingView.jsx
│   │   │   ├── KennelsView.jsx
│   │   │   └── ReportsView.jsx
│   │   └── modals/
│   │       ├── RegisterModal.jsx
│   │       ├── TokenModal.jsx
│   │       ├── ConsultationModal.jsx
│   │       ├── VaccineModal.jsx
│   │       ├── DispenseModal.jsx
│   │       ├── AddMedicineModal.jsx
│   │       ├── AdmitModal.jsx
│   │       ├── ReceiptModal.jsx
│   │       └── PatientHistoryModal.jsx
```

---

## 💻 How to Run

### Development Server
```powershell
cd C:\Users\Hp\.gemini\antigravity\scratch\siftp-vaternity-app
npm.cmd run dev
```

### Production Build
```powershell
npm.cmd run build
```

### Direct Standalone File Access
You can also directly open `standalone-app.html` in any web browser without running Node or Vite.
