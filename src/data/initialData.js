export const INITIAL_SEED_DATA = {
  patients: [
    {
      id: "ANI-1001",
      name: "Sheru",
      species: "Dog",
      breed: "German Shepherd",
      sex: "Male",
      age: "3 Years",
      weight: 24.5,
      ownerName: "Ahmed Ali",
      ownerPhone: "0300-1234567",
      ownerAddress: "Gulshan-e-Iqbal, Karachi",
      allergies: "Penicillin allergy",
      registeredDate: "2026-10-22"
    },
    {
      id: "ANI-1002",
      name: "Moti",
      species: "Goat",
      breed: "Kamori Local",
      sex: "Male",
      age: "2 Years",
      weight: 32.0,
      ownerName: "Haji Rasheed",
      ownerPhone: "0333-9876543",
      ownerAddress: "Malir Cattle Colony, Karachi",
      allergies: "None",
      registeredDate: "2026-10-22"
    },
    {
      id: "ANI-1003",
      name: "Laila",
      species: "Buffalo",
      breed: "Kundi Dairy",
      sex: "Female",
      age: "4.5 Years",
      weight: 480.0,
      ownerName: "Saeed Brohi",
      ownerPhone: "0301-5551234",
      ownerAddress: "Thatta Farm Road, Sindh",
      allergies: "None",
      registeredDate: "2026-10-21"
    },
    {
      id: "ANI-1004",
      name: "Simba",
      species: "Cat",
      breed: "Persian Longhair",
      sex: "Neutered Male",
      age: "1.5 Years",
      weight: 4.2,
      ownerName: "Dr. Zainab",
      ownerPhone: "0321-4449876",
      ownerAddress: "Clifton Block 4, Karachi",
      allergies: "Sensitive stomach",
      registeredDate: "2026-10-20"
    },
    {
      id: "ANI-1005",
      name: "Sultan",
      species: "Cattle",
      breed: "Sahiwal Bull",
      sex: "Male",
      age: "3.5 Years",
      weight: 420.0,
      ownerName: "Waseem Farm",
      ownerPhone: "0300-8889922",
      ownerAddress: "Hyderabad Dairy Perimeter, Sindh",
      allergies: "None",
      registeredDate: "2026-10-22"
    }
  ],
  queue: [
    {
      token: "T-101",
      patientId: "ANI-1001",
      patientName: "Sheru",
      species: "Dog",
      breed: "German Shepherd",
      ownerName: "Ahmed Ali",
      department: "General OPD",
      doctor: "Dr. Fahad Khan",
      reason: "Persistent fever & reduced appetite",
      status: "Waiting",
      time: "10:15 AM"
    },
    {
      token: "T-102",
      patientId: "ANI-1002",
      patientName: "Moti",
      species: "Goat",
      breed: "Kamori Local",
      ownerName: "Haji Rasheed",
      department: "General OPD",
      doctor: "Dr. Ayesha Baloch",
      reason: "Rumen bloat & indigestion",
      status: "Waiting",
      time: "10:30 AM"
    },
    {
      token: "T-103",
      patientId: "ANI-1004",
      patientName: "Simba",
      species: "Cat",
      breed: "Persian",
      ownerName: "Dr. Zainab",
      department: "Vaccination",
      doctor: "Dr. Fahad Khan",
      reason: "Feline Tricat Annual Booster",
      status: "Waiting",
      time: "11:00 AM"
    }
  ],
  consultations: [
    {
      id: "CON-801",
      patientId: "ANI-1003",
      patientName: "Laila",
      species: "Buffalo",
      date: "2026-10-22 09:30 AM",
      doctor: "Dr. Ayesha Baloch",
      temp: 102.8,
      weight: 480,
      heartRate: 72,
      respRate: 18,
      complaint: "Sub-clinical Mastitis and decreased milk yield in right hind quarter",
      exam: "Right teat swollen and warm, California Mastitis Test (CMT) positive (+2)",
      diagnosis: "Acute Coliform Mastitis",
      treatment: "Intramammary Ceftiofur infusion + Flunixin Meglumine injection",
      prescription: [
        { item: "Intramammary Infusion", dosage: "1 tube q12h", duration: "3 days" },
        { item: "Flunixin Meglumine 50ml", dosage: "15ml IM OD", duration: "2 days" }
      ],
      followUp: "2026-10-25"
    }
  ],
  vaccinations: [
    {
      id: "VAC-501",
      patientId: "ANI-1001",
      patientName: "Sheru",
      species: "Dog",
      ownerName: "Ahmed Ali",
      ownerPhone: "0300-1234567",
      vaccineName: "Rabies Monovalent (Inactivated)",
      batch: "RB-8890",
      adminDate: "2025-10-22",
      nextDueDate: "2026-10-22",
      doctor: "Dr. Fahad Khan",
      status: "Due Today"
    },
    {
      id: "VAC-502",
      patientId: "ANI-1002",
      patientName: "Moti",
      species: "Goat",
      ownerName: "Haji Rasheed",
      ownerPhone: "0333-9876543",
      vaccineName: "Enterotoxaemia + Tetanus",
      batch: "ET-4412",
      adminDate: "2026-05-10",
      nextDueDate: "2026-11-10",
      doctor: "Dr. Ayesha Baloch",
      status: "Upcoming"
    },
    {
      id: "VAC-503",
      patientId: "ANI-1004",
      patientName: "Simba",
      species: "Cat",
      ownerName: "Dr. Zainab",
      ownerPhone: "0321-4449876",
      vaccineName: "Feline Tricat Trio",
      batch: "FC-991",
      adminDate: "2025-09-15",
      nextDueDate: "2026-09-15",
      doctor: "Dr. Fahad Khan",
      status: "Overdue"
    }
  ],
  pharmacy: [
    { id: "MED-1", name: "Oxytetracycline 20% L.A. (100ml)", category: "Antibiotic", batch: "OXY-902", expiry: "2027-08", stock: 24, purchasePrice: 320, salePrice: 450 },
    { id: "MED-2", name: "Ivermectin 1% Injection (50ml)", category: "Anthelmintic", batch: "IVM-314", expiry: "2027-11", stock: 18, purchasePrice: 420, salePrice: 600 },
    { id: "MED-3", name: "Amoxicillin + Clavulanic Acid 625mg", category: "Antibiotic", batch: "AMC-882", expiry: "2026-12", stock: 8, purchasePrice: 550, salePrice: 750 },
    { id: "MED-4", name: "Meloxicam Injection 5mg/ml", category: "NSAID Analgesic", batch: "MLX-101", expiry: "2028-01", stock: 35, purchasePrice: 280, salePrice: 400 },
    { id: "MED-5", name: "Calcium Borogluconate 450ml Infusion", category: "Metabolic", batch: "CBG-009", expiry: "2026-11", stock: 4, purchasePrice: 380, salePrice: 550 },
    { id: "MED-6", name: "Rabies Inactivated Vaccine (Vial)", category: "Biologics", batch: "RB-8890", expiry: "2027-04", stock: 2, purchasePrice: 1100, salePrice: 1500 },
    { id: "MED-7", name: "Ceftiofur Sodium Sterile Powder 1g", category: "Antibiotic", batch: "CFT-512", expiry: "2027-06", stock: 14, purchasePrice: 850, salePrice: 1200 },
    { id: "MED-8", name: "Atropine Sulphate 1mg/ml", category: "Emergency Antidote", batch: "ATR-203", expiry: "2028-03", stock: 12, purchasePrice: 150, salePrice: 250 }
  ],
  kennels: [
    { id: "K-1", name: "Canine Suite 1 (Small)", type: "Small Dog", status: "Occupied", patientName: "Bella (Pug)", owner: "Sana Tariq", admittedDate: "2026-10-21", notes: "Post eye surgery recovery" },
    { id: "K-2", name: "Canine Suite 2 (Large)", type: "Large Dog", status: "Available", patientName: "-", owner: "-", admittedDate: "-", notes: "Sanitized & Ready" },
    { id: "K-3", name: "Feline Ward Suite A", type: "Cat", status: "Occupied", patientName: "Milo (Persian)", owner: "Kashif Ali", admittedDate: "2026-10-22", notes: "IV hydration for FLUTD" },
    { id: "K-4", name: "Livestock Pen #1", type: "Ruminant", status: "Occupied", patientName: "Sultan (Bull)", owner: "Waseem Farm", admittedDate: "2026-10-20", notes: "Hoof abscess drainage" },
    { id: "K-5", name: "Isolation Quarantine", type: "Infectious", status: "Available", patientName: "-", owner: "-", admittedDate: "-", notes: "Negative pressure room" },
    { id: "K-6", name: "Recovery Bay 6", type: "General", status: "Available", patientName: "-", owner: "-", admittedDate: "-", notes: "Sanitized & Ready" }
  ],
  invoices: [
    { 
      id: "INV-2026-040", 
      patientId: "ANI-1003", 
      ownerName: "Saeed Brohi", 
      date: "2026-10-22", 
      items: [
        { name: "OPD Large Animal Consultation", price: 1500, category: "Consultation", qty: 1 }, 
        { name: "Ceftiofur Infusion", price: 1200, category: "Pharmacy", qty: 1 }
      ], 
      subtotal: 2700, 
      discount: 200, 
      net: 2500, 
      paid: 2500, 
      balance: 0, 
      paymentMode: "Cash" 
    },
    { 
      id: "INV-2026-041", 
      patientId: "ANI-1004", 
      ownerName: "Dr. Zainab", 
      date: "2026-10-22", 
      items: [
        { name: "Ultrasound Abdomen", price: 3500, category: "Imaging", qty: 1 }, 
        { name: "Meloxicam Injection", price: 400, category: "Pharmacy", qty: 1 }
      ], 
      subtotal: 3900, 
      discount: 0, 
      net: 3900, 
      paid: 3900, 
      balance: 0, 
      paymentMode: "Card" 
    }
  ],
  quickServices: [
    { name: "General OPD Consultation", price: 1000, category: "Clinical" },
    { name: "Rabies Vaccine (Annual)", price: 1500, category: "Vaccine" },
    { name: "Canine DHPP 5-in-1", price: 2200, category: "Vaccine" },
    { name: "Complete Blood Count (CBC)", price: 1800, category: "Laboratory" },
    { name: "Wound Dressing & Suturing", price: 2500, category: "Surgery" },
    { name: "Kennel Boarding (Per Day)", price: 2000, category: "Inpatient" },
    { name: "Oxytetracycline Injection", price: 450, category: "Pharmacy" },
    { name: "Ivermectin Deworming", price: 600, category: "Pharmacy" },
    { name: "Emergency Ultrasound Scan", price: 3500, category: "Imaging" },
    { name: "Dental Scaling & Polishing", price: 4500, category: "Dental" },
    { name: "Artificial Insemination (AI)", price: 3000, category: "Livestock" },
    { name: "Intravenous Saline Infusion", price: 1200, category: "Clinical" }
  ],
  doctors: [
    { name: "Dr. Fahad Khan", title: "DVM Surgery & Small Animal", status: "In Clinic", initials: "DF" },
    { name: "Dr. Ayesha Baloch", title: "MPhil Livestock & Bovine", status: "In Clinic", initials: "DA" }
  ]
};
