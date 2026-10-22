import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { INITIAL_SEED_DATA } from './data/initialData';
import { playQueueChime } from './utils/audioChime';

// Layout & Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

// Views
import DashboardView from './components/views/DashboardView';
import KioskView from './components/views/KioskView';
import RegistrationView from './components/views/RegistrationView';
import VetConsultationView from './components/views/VetConsultationView';
import VaccinationView from './components/views/VaccinationView';
import PharmacyView from './components/views/PharmacyView';
import BillingView from './components/views/BillingView';
import KennelsView from './components/views/KennelsView';
import ReportsView from './components/views/ReportsView';

// Modals
import RegisterModal from './components/modals/RegisterModal';
import TokenModal from './components/modals/TokenModal';
import ConsultationModal from './components/modals/ConsultationModal';
import VaccineModal from './components/modals/VaccineModal';
import DispenseModal from './components/modals/DispenseModal';
import AddMedicineModal from './components/modals/AddMedicineModal';
import AdmitModal from './components/modals/AdmitModal';
import ReceiptModal from './components/modals/ReceiptModal';
import PatientHistoryModal from './components/modals/PatientHistoryModal';

function MainApp() {
  const { t } = useLanguage();

  // App State with LocalStorage persistence
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('siftp_vaternity_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SEED_DATA;
      }
    }
    return INITIAL_SEED_DATA;
  });

  useEffect(() => {
    localStorage.setItem('siftp_vaternity_state', JSON.stringify(appData));
  }, [appData]);

  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // POS Cart State
  const [posCart, setPosCart] = useState([]);
  const [selectedBillingPatientId, setSelectedBillingPatientId] = useState('');

  // Toast Notification State
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Modals Visibility & Context State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [preSelectedTokenPatient, setPreSelectedTokenPatient] = useState('');
  
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeConsultationToken, setActiveConsultationToken] = useState(null);

  const [isVaccineOpen, setIsVaccineOpen] = useState(false);
  
  const [isDispenseOpen, setIsDispenseOpen] = useState(false);
  const [dispenseMedicineId, setDispenseMedicineId] = useState('');

  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  
  const [isAdmitOpen, setIsAdmitOpen] = useState(false);
  const [admitKennelId, setAdmitKennelId] = useState('');

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastInvoice, setLastInvoice] = useState(null);
  const [lastInvoicePatient, setLastInvoicePatient] = useState(null);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyPatient, setHistoryPatient] = useState(null);

  // Role Change Handler
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'vet') setCurrentTab('vetDashboard');
    else if (newRole === 'reception') setCurrentTab('kiosk');
    else if (newRole === 'pharmacy') setCurrentTab('pharmacy');
    else if (newRole === 'cashier') setCurrentTab('billing');
    else setCurrentTab('dashboard');

    addToast(`Switched view to ${newRole.toUpperCase()} mode.`, 'info');
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all records to fresh fictional SIFTP demo data?')) {
      setAppData(JSON.parse(JSON.stringify(INITIAL_SEED_DATA)));
      setPosCart([]);
      localStorage.removeItem('siftp_vaternity_state');
      addToast('Demo data successfully reset to initial default state!', 'success');
    }
  };

  // Audio Chime and Patient Call
  const handleCallPatient = (queueItem) => {
    playQueueChime();
    addToast(`Announcing Token ${queueItem.token} for ${queueItem.patientName} (${queueItem.species})`, 'info');
  };

  // Registration Handlers
  const handleSaveAnimal = (newPatient) => {
    setAppData(prev => ({
      ...prev,
      patients: [...prev.patients, newPatient]
    }));
    setIsRegisterOpen(false);
    addToast(`Registered ${newPatient.name} with ID ${newPatient.id}`, 'success');
    // Prompt to issue token immediately
    setPreSelectedTokenPatient(newPatient.id);
    setIsTokenOpen(true);
  };

  // Token Issuance Handlers
  const handleIssueToken = (tokenData) => {
    const nextTokenNum = 100 + appData.queue.length + 1;
    const tokenCode = `T-${nextTokenNum}`;
    const newQueueItem = {
      ...tokenData,
      token: tokenCode,
      status: 'Waiting',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAppData(prev => ({
      ...prev,
      queue: [...prev.queue, newQueueItem]
    }));
    setIsTokenOpen(false);
    playQueueChime();
    addToast(`Token ${tokenCode} issued for ${newQueueItem.patientName}. Assigned to ${newQueueItem.doctor}`, 'success');
  };

  const handleIssueTokenForPatient = (patientId) => {
    setPreSelectedTokenPatient(patientId);
    setIsTokenOpen(true);
  };

  // Consultation Handlers
  const handleStartConsultation = (tokenCode) => {
    const qItem = appData.queue.find(q => q.token === tokenCode);
    if (!qItem) return;
    setActiveConsultationToken(qItem);
    setIsConsultationOpen(true);
  };

  const handleSaveConsultation = (consultData) => {
    const newConsultation = {
      ...consultData,
      id: "CON-" + (800 + appData.consultations.length + 1)
    };

    setAppData(prev => {
      const updatedQueue = prev.queue.map(q => 
        q.token === consultData.tokenId ? { ...q, status: 'Completed' } : q
      );
      return {
        ...prev,
        consultations: [...prev.consultations, newConsultation],
        queue: updatedQueue
      };
    });

    setIsConsultationOpen(false);
    addToast(`Consultation record for ${consultData.patientName} saved!`, 'success');

    // Auto push items to POS Billing
    const newCart = [
      { name: "Clinical OPD Consultation", price: 1000, category: "Consultation", qty: 1 }
    ];
    consultData.prescription.forEach(rx => {
      const med = appData.pharmacy.find(m => rx.item.includes(m.name));
      newCart.push({
        name: rx.item,
        price: med ? med.salePrice : 500,
        category: "Pharmacy",
        qty: 1
      });
    });

    setPosCart(newCart);
    setSelectedBillingPatientId(consultData.patientId);
    setCurrentTab('billing');
    addToast('Consultation fee & Rx forwarded to POS Billing desk.', 'info');
  };

  // Vaccination Handlers
  const handleSaveVaccine = (vaccineData) => {
    const newVac = {
      ...vaccineData,
      id: "VAC-" + (500 + appData.vaccinations.length + 1)
    };
    setAppData(prev => ({
      ...prev,
      vaccinations: [...prev.vaccinations, newVac]
    }));
    setIsVaccineOpen(false);
    addToast(`Vaccination recorded for ${newVac.patientName}. Booster due: ${newVac.nextDueDate}`, 'success');
  };

  // Pharmacy Handlers
  const handleQuickDispense = (medId) => {
    setDispenseMedicineId(medId);
    setIsDispenseOpen(true);
  };

  const handleDispenseMedicine = (medId, qty, patientId) => {
    const med = appData.pharmacy.find(m => m.id === medId);
    if (!med) return;

    if (med.stock < qty) {
      addToast(`Insufficient stock! Only ${med.stock} units available.`, 'warning');
      return;
    }

    setAppData(prev => ({
      ...prev,
      pharmacy: prev.pharmacy.map(m => 
        m.id === medId ? { ...m, stock: m.stock - qty } : m
      )
    }));

    // Add to POS Cart
    setPosCart(prev => {
      const existing = prev.find(item => item.name === med.name);
      if (existing) {
        return prev.map(item => item.name === med.name ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { name: med.name, price: med.salePrice, category: 'Pharmacy', qty }];
    });

    if (patientId) {
      setSelectedBillingPatientId(patientId);
    }

    setIsDispenseOpen(false);
    addToast(`Dispensed ${qty} units of ${med.name}. Stock updated.`, 'success');
  };

  const handleAddMedicine = (newMed) => {
    setAppData(prev => ({
      ...prev,
      pharmacy: [newMed, ...prev.pharmacy]
    }));
    setIsAddMedicineOpen(false);
    addToast(`Added ${newMed.name} to pharmacy inventory.`, 'success');
  };

  // Kennel Handlers
  const handleAdmitToKennel = (kennelId) => {
    setAdmitKennelId(kennelId);
    setIsAdmitOpen(true);
  };

  const handleConfirmAdmission = (patientId, kennelId, notes) => {
    const patient = appData.patients.find(p => p.id === patientId);
    const kennel = appData.kennels.find(k => k.id === kennelId);
    if (!patient || !kennel) return;

    setAppData(prev => ({
      ...prev,
      kennels: prev.kennels.map(k => {
        if (k.id === kennelId) {
          return {
            ...k,
            status: 'Occupied',
            patientName: `${patient.name} (${patient.species})`,
            owner: patient.ownerName,
            admittedDate: new Date().toISOString().split('T')[0],
            notes: notes || 'Under clinical inpatient observation'
          };
        }
        return k;
      })
    }));

    setIsAdmitOpen(false);
    addToast(`${patient.name} admitted to ${kennel.name}`, 'success');
  };

  const handleDischargeKennel = (kennelId) => {
    const kennel = appData.kennels.find(k => k.id === kennelId);
    if (kennel && window.confirm(`Discharge patient from ${kennel.name} and mark sanitized?`)) {
      setAppData(prev => ({
        ...prev,
        kennels: prev.kennels.map(k => {
          if (k.id === kennelId) {
            return {
              ...k,
              status: 'Available',
              patientName: '-',
              owner: '-',
              admittedDate: '-',
              notes: 'Sanitized & Ready'
            };
          }
          return k;
        })
      }));
      addToast(`${kennel.name} discharged and sanitized!`, 'info');
    }
  };

  // POS Cart Handlers
  const handleAddPosItem = (name, price, category) => {
    setPosCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name, price, category, qty: 1 }];
    });
    addToast(`Added ${name} to invoice cart.`, 'info');
  };

  const handleRemovePosItem = (index) => {
    setPosCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setPosCart([]);
  };

  const handleProcessCheckout = ({ andPrint, discount, paid, paymentMode, net, balance }) => {
    if (posCart.length === 0) {
      addToast('Cart is empty! Add items before checkout.', 'warning');
      return;
    }

    const patient = appData.patients.find(p => p.id === selectedBillingPatientId) || {
      id: "WALK-IN",
      name: "General Client",
      species: "Animal",
      breed: "Local",
      ownerName: "Cash Client",
      ownerPhone: "0300-0000000"
    };

    const invoiceNo = "INV-2026-" + (40 + appData.invoices.length + 1);
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const invoiceRecord = {
      id: invoiceNo,
      patientId: patient.id,
      ownerName: patient.ownerName,
      date: new Date().toISOString().split('T')[0],
      items: JSON.parse(JSON.stringify(posCart)),
      subtotal,
      discount,
      net,
      paid,
      balance,
      paymentMode
    };

    setAppData(prev => ({
      ...prev,
      invoices: [invoiceRecord, ...prev.invoices]
    }));

    setLastInvoice(invoiceRecord);
    setLastInvoicePatient(patient);

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {}

    if (andPrint) {
      setIsReceiptOpen(true);
    } else {
      addToast(`Invoice ${invoiceNo} generated & payment recorded!`, 'success');
    }

    setPosCart([]);
    setSelectedBillingPatientId('');
  };

  // View Patient History
  const handleViewPatientHistory = (patientId) => {
    const patient = appData.patients.find(p => p.id === patientId);
    if (patient) {
      setHistoryPatient(patient);
      setIsHistoryOpen(true);
    }
  };

  // CSV Export Engine
  const handleExportCSV = (type) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let fileName = "siftp_vaternity_export.csv";

    if (type === 'consultations') {
      fileName = "SIFTP_Consultations_Report.csv";
      csvContent += "Consultation ID,Patient ID,Animal Name,Species,Date,Doctor,Diagnosis,Prescribed Treatment\n";
      appData.consultations.forEach(c => {
        csvContent += `"${c.id}","${c.patientId}","${c.patientName}","${c.species}","${c.date}","${c.doctor}","${c.diagnosis}","${(c.treatment || '').replace(/"/g, '""')}"\n`;
      });
    } else {
      fileName = "SIFTP_Revenue_Invoices_Report.csv";
      csvContent += "Invoice ID,Date,Patient ID,Owner,Subtotal (PKR),Discount,Net Total,Paid,Balance,Payment Method\n";
      appData.invoices.forEach(inv => {
        csvContent += `"${inv.id}","${inv.date}","${inv.patientId}","${inv.ownerName}",${inv.subtotal},${inv.discount},${inv.net},${inv.paid},${inv.balance},"${inv.paymentMode}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${fileName} successfully!`, "success");
  };

  // 1-Click Guided Demo Walkthrough
  const handleStartDemo = () => {
    addToast("Starting Guided 1-Click SIFTP Demo Walkthrough!", "info");
    setCurrentTab('registration');
    setTimeout(() => {
      setIsRegisterOpen(true);
      addToast("Demo Step 1: Registering dairy livestock (Sultan - Sahiwal Bull)...", "info");
    }, 700);
  };

  const nextPatientId = "ANI-" + (1000 + appData.patients.length + 1);
  const nextInvoiceNum = "INV-2026-" + (40 + appData.invoices.length + 1);
  const waitingCount = appData.queue.filter(q => q.status === 'Waiting').length;

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Branding & Global Actions Bar */}
      <Navbar 
        currentRole={currentRole}
        onChangeRole={handleRoleChange}
        onStartDemo={handleStartDemo}
        onResetData={handleResetData}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
        onNavigateHome={() => setCurrentTab('dashboard')}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar 
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          waitingCount={waitingCount}
          currentRole={currentRole}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F4F7FB] relative">
          {currentTab === 'dashboard' && (
            <DashboardView 
              patients={appData.patients}
              queue={appData.queue}
              consultations={appData.consultations}
              vaccinations={appData.vaccinations}
              kennels={appData.kennels}
              pharmacy={appData.pharmacy}
              invoices={appData.invoices}
              doctors={appData.doctors}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenToken={() => {
                setPreSelectedTokenPatient('');
                setIsTokenOpen(true);
              }}
              onSwitchTab={setCurrentTab}
              onStartConsultation={handleStartConsultation}
              onCallPatient={handleCallPatient}
            />
          )}

          {currentTab === 'kiosk' && (
            <KioskView 
              queue={appData.queue}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenToken={() => {
                setPreSelectedTokenPatient('');
                setIsTokenOpen(true);
              }}
              onSwitchTab={setCurrentTab}
              onCallPatient={handleCallPatient}
              onStartConsultation={handleStartConsultation}
            />
          )}

          {currentTab === 'registration' && (
            <RegistrationView 
              patients={appData.patients}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onIssueTokenForPatient={handleIssueTokenForPatient}
              onViewPatientHistory={handleViewPatientHistory}
            />
          )}

          {currentTab === 'vetDashboard' && (
            <VetConsultationView 
              queue={appData.queue}
              patients={appData.patients}
              consultations={appData.consultations}
              onStartConsultation={handleStartConsultation}
              onViewConsultationNote={(note) => {
                const patient = appData.patients.find(p => p.id === note.patientId);
                setHistoryPatient(patient);
                setIsHistoryOpen(true);
              }}
            />
          )}

          {currentTab === 'vaccination' && (
            <VaccinationView 
              vaccinations={appData.vaccinations}
              onOpenRecordVaccine={() => setIsVaccineOpen(true)}
            />
          )}

          {currentTab === 'pharmacy' && (
            <PharmacyView 
              pharmacy={appData.pharmacy}
              onOpenDispense={() => {
                setDispenseMedicineId('');
                setIsDispenseOpen(true);
              }}
              onOpenAddMedicine={() => setIsAddMedicineOpen(true)}
              onQuickDispense={handleQuickDispense}
            />
          )}

          {currentTab === 'billing' && (
            <BillingView 
              patients={appData.patients}
              quickServices={appData.quickServices}
              posCart={posCart}
              onAddPosItem={handleAddPosItem}
              onRemovePosItem={handleRemovePosItem}
              onClearCart={handleClearCart}
              onProcessCheckout={handleProcessCheckout}
              selectedPatientId={selectedBillingPatientId}
              onSelectPatient={setSelectedBillingPatientId}
              currentInvoiceNum={nextInvoiceNum}
            />
          )}

          {currentTab === 'kennels' && (
            <KennelsView 
              kennels={appData.kennels}
              onOpenAdmit={() => {
                setAdmitKennelId('');
                setIsAdmitOpen(true);
              }}
              onAdmitToKennel={handleAdmitToKennel}
              onDischargeKennel={handleDischargeKennel}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView 
              patients={appData.patients}
              consultations={appData.consultations}
              invoices={appData.invoices}
              vaccinations={appData.vaccinations}
              onExportCSV={handleExportCSV}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSave={handleSaveAnimal}
        nextPatientId={nextPatientId}
      />

      <TokenModal 
        isOpen={isTokenOpen}
        onClose={() => setIsTokenOpen(false)}
        patients={appData.patients}
        onIssue={handleIssueToken}
        preSelectedPatientId={preSelectedTokenPatient}
      />

      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        queueItem={activeConsultationToken}
        patient={activeConsultationToken ? appData.patients.find(p => p.id === activeConsultationToken.patientId) : null}
        pharmacy={appData.pharmacy}
        onSaveConsultation={handleSaveConsultation}
      />

      <VaccineModal 
        isOpen={isVaccineOpen}
        onClose={() => setIsVaccineOpen(false)}
        patients={appData.patients}
        onSave={handleSaveVaccine}
      />

      <DispenseModal 
        isOpen={isDispenseOpen}
        onClose={() => setIsDispenseOpen(false)}
        pharmacy={appData.pharmacy}
        patients={appData.patients}
        onDispense={handleDispenseMedicine}
        initialMedicineId={dispenseMedicineId}
      />

      <AddMedicineModal 
        isOpen={isAddMedicineOpen}
        onClose={() => setIsAddMedicineOpen(false)}
        onAdd={handleAddMedicine}
      />

      <AdmitModal 
        isOpen={isAdmitOpen}
        onClose={() => setIsAdmitOpen(false)}
        patients={appData.patients}
        kennels={appData.kennels}
        onAdmit={handleConfirmAdmission}
        initialKennelId={admitKennelId}
      />

      <ReceiptModal 
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        invoice={lastInvoice}
        patient={lastInvoicePatient}
      />

      <PatientHistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        patient={historyPatient}
        consultations={appData.consultations}
        vaccinations={appData.vaccinations}
        invoices={appData.invoices}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
