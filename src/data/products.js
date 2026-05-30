export const products = [
  // --- Surgical Equipment (surgical-equipment) ---
  {
    id: 1, name: 'Pro Surgical Scalpel Set', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 2499, originalPrice: 3200, rating: 4.8, reviews: 124,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Complete professional scalpel set with 10 precision blades. Stainless steel handles, autoclavable. Ideal for surgical procedures and dissection.',
    specs: ['Material: Stainless Steel', 'Blades: 10 pcs', 'Autoclavable: Yes', 'Grip: Anti-slip']
  },
  {
    id: 9, name: 'Laparoscopic Trocar Set', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 8499, originalPrice: 11000, rating: 4.9, reviews: 67,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Complete laparoscopic trocar set for minimally invasive surgery. 5mm and 10mm trocars, optical and bladed tips included.',
    specs: ['Sizes: 5mm & 10mm', 'Tips: Optical/Bladed', 'Material: Medical SS', 'Sterile: Yes']
  },
  {
    id: 17, name: 'Surgical Forceps Hemostatic', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 1799, originalPrice: 2300, rating: 4.7, reviews: 93,
    image: '/images/products/surgical_forceps.png',
    stock: 'In Stock', badge: null, description: 'Stainless steel hemostatic forceps set. Includes Kelly, Mosquito, and Crile forceps. Ratchet lock mechanism, autoclavable.',
    specs: ['Types: 3', 'Material: SS 304', 'Lock: Ratchet', 'Autoclavable: Yes']
  },
  {
    id: 25, name: 'Mayo Scissors Straight 6.75"', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 1299, originalPrice: 1800, rating: 4.7, reviews: 88,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Professional Straight Mayo Dissecting Scissors, 6.75 inch, medical-grade stainless steel. Standard bevel blades designed for cutting tough tissues and sutures.',
    specs: ['Length: 6.75 inches', 'Tip: Straight Beveled', 'Material: Surgical SS', 'Autoclavable: Yes']
  },
  {
    id: 26, name: 'Suture Practice Kit with Pad', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 1499, originalPrice: 2100, rating: 4.8, reviews: 212,
    image: 'https://images.unsplash.com/photo-1606206591513-ad601376f90d?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Comprehensive suture training kit for medical students. Features a premium silicone skin pad with pre-cut wounds, surgical instruments, and suture threads.',
    specs: ['Pad material: FDA Silicone', 'Tools: 5-piece set', 'Suture thread: 12 packs', 'Carry case: Included']
  },
  {
    id: 27, name: 'Surgical Retractor Set (US-Army)', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 4899, originalPrice: 6500, rating: 4.9, reviews: 34,
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=400&h=400&fit=crop',
    stock: 'Limited Stock', badge: null, description: 'Double-ended U.S. Army retractor set of 2, high-grade surgical stainless steel. Highly polished finish, ideal for exposing superficial wounds or cavities.',
    specs: ['Type: US-Army Retractor', 'Qty: Set of 2', 'Material: Premium SS', 'Length: 8.25 inches']
  },

  // --- Diagnostic Devices (diagnostic-devices) ---
  {
    id: 2, name: 'Digital Blood Pressure Monitor', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 1899, originalPrice: 2499, rating: 4.7, reviews: 389,
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Top Rated', description: 'Automatic upper arm BP monitor with large LCD display. Irregular heartbeat detection, memory for 60 readings, WHO indicator.',
    specs: ['Display: LCD', 'Memory: 60 readings', 'Cuff: 22-42cm', 'Battery: 4×AA']
  },
  {
    id: 10, name: 'Pulse Oximeter Pro', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 1299, originalPrice: 1800, rating: 4.8, reviews: 2341,
    image: 'https://images.unsplash.com/photo-1612776780620-3daa7f85a040?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Top Rated', description: 'Fingertip pulse oximeter with OLED display. SpO2 and pulse rate measurement in 6 seconds. Auto power-off, includes lanyard and case.',
    specs: ['Display: OLED', 'SpO2 Range: 70-100%', 'Accuracy: ±2%', 'Battery life: 30hrs']
  },
  {
    id: 18, name: 'Digital Thermometer Infrared', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 799, originalPrice: 1100, rating: 4.6, reviews: 1876,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Non-contact infrared thermometer. 1-second reading, fever alarm, 32 memory slots, switchable °C/°F. Works for adults and children.',
    specs: ['Response: 1 second', 'Memory: 32 readings', 'Range: 32-43°C', 'Distance: 5-15cm']
  },
  {
    id: 28, name: 'Classic Stethoscope Black Edition', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 3499, originalPrice: 4500, rating: 4.8, reviews: 720,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Premium clinical stethoscope with exceptional acoustic sensitivity. Features single-piece tunable diaphragm, non-chill sleeve, and anatomy-conforming soft eartips.',
    specs: ['Chestpiece: Dual-sided', 'Tube color: Matte Black', 'Warranty: 3 years', 'Weight: 150g']
  },
  {
    id: 29, name: 'Infrared Vein Finder Locator', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 18499, originalPrice: 24000, rating: 4.7, reviews: 52,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'New', description: 'Portable handheld infrared vein finder designed to assist clinical staff in locating veins for IV access, pediatric blood draws, and geriatric injections.',
    specs: ['Tech: Near-infrared', 'Battery: 2 hrs continuous', 'Weight: 350g', 'Accuracy: ±0.3mm']
  },
  {
    id: 30, name: 'ECG Machine 3-Channel Portable', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 32999, originalPrice: 40000, rating: 4.9, reviews: 18,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=400&h=400&fit=crop',
    stock: 'Limited Stock', badge: 'Premium', description: 'Advanced 3-channel electrocardiograph with 4.3" high-resolution LCD display. Features built-in thermal printer, internal analysis algorithms, and lead detection.',
    specs: ['Channels: 3', 'Display: 4.3" Color LCD', 'Printer: Thermal 80mm', 'Modes: Auto/Manual']
  },

  // --- ICU Equipment (icu-equipment) ---
  {
    id: 3, name: 'ICU Ventilator Support Unit', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 89999, originalPrice: 110000, rating: 4.9, reviews: 45,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Advanced ICU-grade ventilator support with 15 ventilation modes. Touch screen interface, built-in O2 sensor, comprehensive alarms.',
    specs: ['Modes: 15', 'Display: Touch 10"', 'O2 Sensor: Built-in', 'Alarms: Comprehensive']
  },
  {
    id: 11, name: 'ICU Patient Monitor', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 45999, originalPrice: 58000, rating: 4.8, reviews: 34,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop',
    stock: 'Limited Stock', badge: 'New', description: '12" color touchscreen patient monitor. ECG, SpO2, NIBP, Temp, Resp monitoring. Rechargeable battery, nurse call output.',
    specs: ['Display: 12" Touch', 'Parameters: 6', 'Battery: 4hrs', 'Alarms: Multi-level']
  },
  {
    id: 19, name: 'Defibrillator AED Unit', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 129999, originalPrice: 160000, rating: 5.0, reviews: 22,
    image: '/images/products/defibrillator_aed.png',
    stock: 'Limited Stock', badge: 'Premium', description: 'Automated External Defibrillator with voice guidance. FDA approved, self-test mode, IP55 rated. Includes carry case and electrode pads.',
    specs: ['FDA: Approved', 'IP Rating: IP55', 'Battery: 4 years standby', 'Guidance: Voice/Visual']
  },
  {
    id: 31, name: 'Medical Syringe Infusion Pump', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 22499, originalPrice: 28000, rating: 4.8, reviews: 39,
    image: 'https://images.unsplash.com/photo-1631557685999-57e3bc58b2e3?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'High-precision clinical syringe infusion pump. Compatible with major standard syringe brands from 5ml to 60ml. Features dynamic pressure monitoring and dual CPU security.',
    specs: ['Flow Rate: 0.1-1500 ml/h', 'Syringes: 5/10/20/30/50/60 ml', 'Battery: 6 hrs back-up', 'Accuracy: ±2%']
  },
  {
    id: 32, name: 'ICU Anti-Bedsore Air Mattress', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 4599, originalPrice: 6000, rating: 4.7, reviews: 198,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Alternating pressure bubble mattress system with adjustable quiet air pump. Specifically designed to prevent pressure ulcers and bedsores in bedridden ICU patients.',
    specs: ['Cycles: Alternating 12 min', 'Material: Medical PVC', 'Cell Count: 130 bubbles', 'Weight capacity: 135kg']
  },
  {
    id: 33, name: 'Enteral Feeding Pump Pro', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 19999, originalPrice: 25000, rating: 4.6, reviews: 28,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Advanced enteral nutrition feeding pump. Intelligent infusion tracking, anti-free-flow clamp, and comprehensive safety parameters. Autocalibrating and alarm-equipped.',
    specs: ['Flow Range: 1-1200 ml/h', 'Precision: ±5%', 'Battery: 8 hours', 'Alarms: Occlusion/Empty']
  },

  // --- First Aid (first-aid) ---
  {
    id: 4, name: 'Advanced First Aid Kit', category: 'first-aid', categoryName: 'First Aid',
    price: 899, originalPrice: 1200, rating: 4.6, reviews: 672,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: '163-piece professional first aid kit in durable hard case. Includes bandages, antiseptics, splints, CPR mask, and emergency blanket.',
    specs: ['Pieces: 163', 'Case: Hard ABS', 'Waterproof: Yes', 'CE Certified: Yes']
  },
  {
    id: 12, name: 'Trauma First Aid Backpack', category: 'first-aid', categoryName: 'First Aid',
    price: 3499, originalPrice: 4500, rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Professional trauma response backpack with 200+ items. Tourniquet, hemostatic gauze, airway management tools. Used by paramedics.',
    specs: ['Items: 200+', 'Tourniquet: Included', 'Waterproof: Yes', 'MOLLE: Compatible']
  },
  {
    id: 20, name: 'Wound Closure Stapler', category: 'first-aid', categoryName: 'First Aid',
    price: 2299, originalPrice: 3000, rating: 4.8, reviews: 145,
    image: '/images/products/wound_stapler.png',
    stock: 'In Stock', badge: null, description: 'Disposable skin stapler with 35 staples. Ergonomic handle, stainless steel staples, removable. For emergency wound closure.',
    specs: ['Staples: 35', 'Material: SS', 'Type: Disposable', 'Sterile: Yes']
  },
  {
    id: 34, name: 'Emergency Splint Roll (36")', category: 'first-aid', categoryName: 'First Aid',
    price: 499, originalPrice: 750, rating: 4.8, reviews: 342,
    image: '/images/products/emergency_splint.png',
    stock: 'In Stock', badge: 'Best Seller', description: 'Universal moldable orthopedic splint, 36" roll. Closed-cell foam padded aluminum core. Lightweight, waterproof, reusable, and completely radiolucent (X-ray clear).',
    specs: ['Size: 36 × 4.25 inches', 'Core: Aluminum', 'Radiolucent: Yes', 'Waterproof: Yes']
  },
  {
    id: 35, name: 'Micropore Surgical Tape 12-Pk', category: 'first-aid', categoryName: 'First Aid',
    price: 599, originalPrice: 800, rating: 4.7, reviews: 980,
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Hypoallergenic paper surgical tape, porous and highly breathable. Gentle on sensitive skin, easy tear, leaves negligible adhesive residue. Pack of 12 rolls.',
    specs: ['Size: 1 inch × 10 yards', 'Hypoallergenic: Yes', 'Qty: 12 rolls', 'Color: White']
  },
  {
    id: 36, name: 'Instant Cold Packs 10-Pack', category: 'first-aid', categoryName: 'First Aid',
    price: 699, originalPrice: 950, rating: 4.6, reviews: 412,
    image: 'https://images.unsplash.com/photo-1606206591513-ad601376f90d?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Disposable squeeze-activated cold therapy compress packs. Rapid endothermic reaction reaches sub-zero temperatures in seconds. Ideal for sprains, swelling, and pain relief.',
    specs: ['Activation: Squeeze to cold', 'Disposable: Yes', 'Temp: Under 5°C', 'Qty: 10 packs']
  },

  // --- Medicines (medicines) ---
  {
    id: 5, name: 'Paracetamol 500mg Tablets', category: 'medicines', categoryName: 'Medicines',
    price: 45, originalPrice: 60, rating: 4.5, reviews: 1240,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Paracetamol 500mg for pain relief and fever reduction. Pack of 30 tablets. Suitable for adults and children over 12 years.',
    specs: ['Strength: 500mg', 'Pack: 30 tablets', 'Form: Oral tablet', 'Use: Pain/Fever']
  },
  {
    id: 13, name: 'Amoxicillin 500mg Capsules', category: 'medicines', categoryName: 'Medicines',
    price: 89, originalPrice: 110, rating: 4.6, reviews: 445,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Amoxicillin antibiotic 500mg capsules. Pack of 21 capsules. Broad-spectrum penicillin antibiotic. Prescription required.',
    specs: ['Strength: 500mg', 'Pack: 21 capsules', 'Type: Antibiotic', 'Rx: Required']
  },
  {
    id: 21, name: 'Vitamin D3 2000 IU Softgels', category: 'medicines', categoryName: 'Medicines',
    price: 349, originalPrice: 450, rating: 4.7, reviews: 2890,
    image: 'https://images.unsplash.com/photo-1579126038374-606c5ec84485?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'High strength Vitamin D3 2000 IU softgels. Pack of 90. Supports bone health, immunity and muscle function. Soy-free, gluten-free.',
    specs: ['Strength: 2000 IU', 'Pack: 90 softgels', 'Soy-free: Yes', 'Gluten-free: Yes']
  },
  {
    id: 37, name: 'Ibuprofen 400mg Tablets', category: 'medicines', categoryName: 'Medicines',
    price: 55, originalPrice: 75, rating: 4.6, reviews: 850,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8f304b3b89?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Non-steroidal anti-inflammatory drug (NSAID) for quick relief of pain, headaches, muscle aches, toothaches, joint pain, and fever. Pack of 20 coated tablets.',
    specs: ['Strength: 400mg', 'Pack: 20 tablets', 'Class: NSAID', 'Form: Coated tablet']
  },
  {
    id: 38, name: 'Pantoprazole 40mg (Gerd Care)', category: 'medicines', categoryName: 'Medicines',
    price: 95, originalPrice: 125, rating: 4.7, reviews: 672,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Proton Pump Inhibitor (PPI) that decreases the amount of acid produced in the stomach. Formulated for acid reflux, GERD, and healing stomach ulcers. 15 gastro-resistant tablets.',
    specs: ['Strength: 40mg', 'Pack: 15 tablets', 'Type: Gastro-resistant', 'Rx: Required']
  },
  {
    id: 39, name: 'Complete Daily A-Z Multivitamins', category: 'medicines', categoryName: 'Medicines',
    price: 450, originalPrice: 600, rating: 4.8, reviews: 1420,
    image: 'https://images.unsplash.com/photo-1616679911721-fe6eec4743cd?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Daily multivitamin and mineral supplement with 24 essential vitamins and trace minerals. Formulated for immune defense, bone strength, cognitive function, and cellular energy.',
    specs: ['Nutrients: 24 active', 'Qty: 60 tablets', 'Form: Oral tablet', 'Gluten-free: Yes']
  },

  // --- Lab Equipment (lab-equipment) ---
  {
    id: 6, name: 'Digital Microscope Lab Grade', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 15999, originalPrice: 20000, rating: 4.8, reviews: 89,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'New', description: 'Professional lab microscope with 40x-2000x magnification. Monocular head, LED illumination, mechanical stage, includes 5 prepared slides.',
    specs: ['Magnification: 40x-2000x', 'Light: LED', 'Stage: Mechanical', 'Slides: 5 included']
  },
  {
    id: 14, name: 'Centrifuge Machine 8000 RPM', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 24999, originalPrice: 32000, rating: 4.7, reviews: 56,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Benchtop centrifuge with max 8000 RPM. 12x15mL rotor, digital display, auto-balance detection. Quiet operation under 60dB.',
    specs: ['Max RPM: 8000', 'Rotor: 12×15mL', 'Noise: <60dB', 'Timer: 0-99min']
  },
  {
    id: 22, name: 'PCR Test Kit 50-Pack', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 8999, originalPrice: 12000, rating: 4.9, reviews: 67,
    image: '/images/products/pcr_test_kit.png',
    stock: 'In Stock', badge: 'New', description: 'Real-time PCR test kit. 50 tests per pack. CE-IVD marked, 98.5% sensitivity, 99.2% specificity. 30-minute results.',
    specs: ['Tests: 50 per pack', 'Sensitivity: 98.5%', 'Specificity: 99.2%', 'CE-IVD: Marked']
  },
  {
    id: 40, name: 'Lab Vortex Mixer Touch Mode', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 6499, originalPrice: 8500, rating: 4.8, reviews: 43,
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Compact laboratory vortex shaker. Features 3000 RPM maximum speed, pressure-sensitive touch start, and heavy-duty zinc die-cast body with silicone suction cups.',
    specs: ['Speed: 3000 RPM Max', 'Mode: Touch pressure', 'Orbit: 4.5mm', 'Capacity: Up to 50ml']
  },
  {
    id: 41, name: 'Digital Lab Water Bath 5L', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 18499, originalPrice: 24000, rating: 4.7, reviews: 19,
    image: '/images/products/lab_water_bath.png',
    stock: 'Limited Stock', badge: 'New', description: 'Constant temperature scientific laboratory water bath, 5-liter volume capacity. Microcomputer digital control panel, integrated seamless stainless steel interior.',
    specs: ['Capacity: 5 Liters', 'Temp range: RT to 99.9°C', 'Accuracy: ±0.5°C', 'Material: Stainless Steel']
  },
  {
    id: 42, name: 'MicroPipette Calibration 3-Pack', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 7499, originalPrice: 9999, rating: 4.9, reviews: 32,
    image: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Certified single-channel variable volume micropipettes. Includes three key ranges: 0.5-10ul, 10-100ul, and 100-1000ul. Extremely low pipetting forces, partially autoclavable.',
    specs: ['Pipettes: 3 pcs', 'Range: 0.5ul - 1000ul', 'Calibration: Certified', 'Autoclavable: Yes (Half)']
  },

  // --- Wheelchairs (wheelchairs) ---
  {
    id: 7, name: 'Lightweight Folding Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 12499, originalPrice: 16000, rating: 4.7, reviews: 203,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Ultra-lightweight aluminum frame wheelchair. Folds in seconds, removable footrests, padded armrests. Max load 120kg. Ideal for travel.',
    specs: ['Weight: 11kg', 'Max Load: 120kg', 'Frame: Aluminum', 'Fold: Quick-fold']
  },
  {
    id: 15, name: 'Electric Power Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 49999, originalPrice: 65000, rating: 4.9, reviews: 78,
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Heavy duty electric power wheelchair. Range 25km per charge, joystick control, anti-tip wheels, adjustable seating. Max load 150kg.',
    specs: ['Range: 25km', 'Max Load: 150kg', 'Speed: 6km/h', 'Battery: 24V 20Ah']
  },
  {
    id: 23, name: 'Commode Transport Chair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 6499, originalPrice: 8500, rating: 4.5, reviews: 134,
    image: 'https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Lightweight commode transport chair. Padded seat and back, swing-away footrests, commode opening. Dual purpose: transport + commode.',
    specs: ['Weight: 9kg', 'Max Load: 100kg', 'Commode: Built-in', 'Footrests: Swing-away']
  },
  {
    id: 43, name: 'Heavy-Duty Bariatric Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 18999, originalPrice: 24000, rating: 4.8, reviews: 77,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Reinforced dual-steel frame bariatric wheelchair. Features comfortable 22-inch wide seat, heavy-duty composite wheels, and extra-strength padding. Holds up to 180kg.',
    specs: ['Seat Width: 22 inches', 'Max Load: 180kg', 'Frame: Heavy Steel', 'Weight: 19kg']
  },
  {
    id: 44, name: 'Reclining High-Back Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 21999, originalPrice: 28000, rating: 4.7, reviews: 54,
    image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Premium hydraulic reclining system wheelchair with full high-back support. Easily recline from 90° up to 180°. Padded detachable headrest pillow and elevating leg rests.',
    specs: ['Recline: 90° - 180°', 'Frame: Chromed Steel', 'Elevating legs: Yes', 'Max Load: 110kg']
  },
  {
    id: 45, name: 'Ergonomic S-Seat Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 14499, originalPrice: 19000, rating: 4.6, reviews: 82,
    image: 'https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'S-Shape ergonomic seating system designed to relieve pressure points, optimize posture, and prevent sliding. Fitted with flat-free polyurethane tires and quick-release wheels.',
    specs: ['Weight: 13.5kg', 'Seat: S-Ergonomic', 'Tires: Flat-free PU', 'Max Load: 115kg']
  },

  // --- Personal Care (personal-care) ---
  {
    id: 8, name: 'Medical Grade Hand Sanitizer 5L', category: 'personal-care', categoryName: 'Personal Care',
    price: 699, originalPrice: 900, rating: 4.4, reviews: 856,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Hospital-grade 70% isopropyl alcohol hand sanitizer. 5L bulk pack. WHO recommended formula, kills 99.99% of germs. Gentle on skin.',
    specs: ['Volume: 5 Liters', 'Alcohol: 70% IPA', 'Formula: WHO approved', 'Kills: 99.99% germs']
  },
  {
    id: 16, name: 'N95 Respirator Masks 50-Pack', category: 'personal-care', categoryName: 'Personal Care',
    price: 1299, originalPrice: 1800, rating: 4.8, reviews: 3421,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'NIOSH approved N95 particulate respirator masks. 50-pack. Filters 95% of airborne particles. Foldable design, adjustable nose clip.',
    specs: ['Filtration: 95%', 'Pack: 50 masks', 'NIOSH: Approved', 'Type: Foldable']
  },
  {
    id: 24, name: 'Surgical Gloves Latex 100-Pack', category: 'personal-care', categoryName: 'Personal Care',
    price: 499, originalPrice: 700, rating: 4.6, reviews: 5678,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Powder-free latex surgical examination gloves. 100 gloves per box. Size M. AQL 1.5, ISO certified. Textured fingertips for grip.',
    specs: ['Qty: 100 per box', 'Size: Medium', 'AQL: 1.5', 'ISO: Certified']
  },
  {
    id: 46, name: 'Anti-Fog Full Face Shield 10-Pk', category: 'personal-care', categoryName: 'Personal Care',
    price: 499, originalPrice: 750, rating: 4.6, reviews: 324,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Optically clear protective full face shields with anti-fog technology. Foam brow band for comfortable sweat absorption and double-sided protective peel-off layer. Qty: 10 shields.',
    specs: ['Material: Anti-fog PET', 'Qty: 10 shields', 'Thickness: 0.25mm', 'Size: Universal fit']
  },
  {
    id: 47, name: 'Premium Bluetooth Body Scale', category: 'personal-care', categoryName: 'Personal Care',
    price: 1199, originalPrice: 1800, rating: 4.8, reviews: 1230,
    image: 'https://images.unsplash.com/photo-1574269661728-790be6282947?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'High-precision medical smart body scale. Measures weight, BMI, body fat ratio, muscle mass, bone density via bio-impedance. Auto-syncs to Android and iOS apps.',
    specs: ['Sensors: 4 G-sensors', 'Capacity: 180kg', 'Display: Backlit LED', 'App Sync: Bluetooth 5.0']
  },
  {
    id: 48, name: 'Orthopedic Cervical Neck Pillow', category: 'personal-care', categoryName: 'Personal Care',
    price: 1499, originalPrice: 2100, rating: 4.7, reviews: 480,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Contour ergonomic memory foam neck support pillow. Promotes optimal anatomical spine alignment, reducing morning neck and shoulder pain. Breathable bamboo fiber cover.',
    specs: ['Material: Memory Foam', 'Cover: Bamboo fabric', 'Ergonomic: Yes', 'Washable cover: Yes']
  }
];
