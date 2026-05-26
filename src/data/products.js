export const products = [
  {
    id: 1, name: 'Pro Surgical Scalpel Set', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 2499, originalPrice: 3200, rating: 4.8, reviews: 124,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Complete professional scalpel set with 10 precision blades. Stainless steel handles, autoclavable. Ideal for surgical procedures and dissection.',
    specs: ['Material: Stainless Steel', 'Blades: 10 pcs', 'Autoclavable: Yes', 'Grip: Anti-slip']
  },
  {
    id: 2, name: 'Digital Blood Pressure Monitor', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 1899, originalPrice: 2499, rating: 4.7, reviews: 389,
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Top Rated', description: 'Automatic upper arm BP monitor with large LCD display. Irregular heartbeat detection, memory for 60 readings, WHO indicator.',
    specs: ['Display: LCD', 'Memory: 60 readings', 'Cuff: 22-42cm', 'Battery: 4×AA']
  },
  {
    id: 3, name: 'ICU Ventilator Support Unit', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 89999, originalPrice: 110000, rating: 4.9, reviews: 45,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Advanced ICU-grade ventilator support with 15 ventilation modes. Touch screen interface, built-in O2 sensor, comprehensive alarms.',
    specs: ['Modes: 15', 'Display: Touch 10"', 'O2 Sensor: Built-in', 'Alarms: Comprehensive']
  },
  {
    id: 4, name: 'Advanced First Aid Kit', category: 'first-aid', categoryName: 'First Aid',
    price: 899, originalPrice: 1200, rating: 4.6, reviews: 672,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: '163-piece professional first aid kit in durable hard case. Includes bandages, antiseptics, splints, CPR mask, and emergency blanket.',
    specs: ['Pieces: 163', 'Case: Hard ABS', 'Waterproof: Yes', 'CE Certified: Yes']
  },
  {
    id: 5, name: 'Paracetamol 500mg Tablets', category: 'medicines', categoryName: 'Medicines',
    price: 45, originalPrice: 60, rating: 4.5, reviews: 1240,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Paracetamol 500mg for pain relief and fever reduction. Pack of 30 tablets. Suitable for adults and children over 12 years.',
    specs: ['Strength: 500mg', 'Pack: 30 tablets', 'Form: Oral tablet', 'Use: Pain/Fever']
  },
  {
    id: 6, name: 'Digital Microscope Lab Grade', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 15999, originalPrice: 20000, rating: 4.8, reviews: 89,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'New', description: 'Professional lab microscope with 40x-2000x magnification. Monocular head, LED illumination, mechanical stage, includes 5 prepared slides.',
    specs: ['Magnification: 40x-2000x', 'Light: LED', 'Stage: Mechanical', 'Slides: 5 included']
  },
  {
    id: 7, name: 'Lightweight Folding Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 12499, originalPrice: 16000, rating: 4.7, reviews: 203,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Ultra-lightweight aluminum frame wheelchair. Folds in seconds, removable footrests, padded armrests. Max load 120kg. Ideal for travel.',
    specs: ['Weight: 11kg', 'Max Load: 120kg', 'Frame: Aluminum', 'Fold: Quick-fold']
  },
  {
    id: 8, name: 'Medical Grade Hand Sanitizer 5L', category: 'personal-care', categoryName: 'Personal Care',
    price: 699, originalPrice: 900, rating: 4.4, reviews: 856,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Hospital-grade 70% isopropyl alcohol hand sanitizer. 5L bulk pack. WHO recommended formula, kills 99.99% of germs. Gentle on skin.',
    specs: ['Volume: 5 Liters', 'Alcohol: 70% IPA', 'Formula: WHO approved', 'Kills: 99.99% germs']
  },
  {
    id: 9, name: 'Laparoscopic Trocar Set', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 8499, originalPrice: 11000, rating: 4.9, reviews: 67,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Complete laparoscopic trocar set for minimally invasive surgery. 5mm and 10mm trocars, optical and bladed tips included.',
    specs: ['Sizes: 5mm & 10mm', 'Tips: Optical/Bladed', 'Material: Medical SS', 'Sterile: Yes']
  },
  {
    id: 10, name: 'Pulse Oximeter Pro', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 1299, originalPrice: 1800, rating: 4.8, reviews: 2341,
    image: 'https://images.unsplash.com/photo-1612776780620-3daa7f85a040?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Top Rated', description: 'Fingertip pulse oximeter with OLED display. SpO2 and pulse rate measurement in 6 seconds. Auto power-off, includes lanyard and case.',
    specs: ['Display: OLED', 'SpO2 Range: 70-100%', 'Accuracy: ±2%', 'Battery life: 30hrs']
  },
  {
    id: 11, name: 'ICU Patient Monitor', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 45999, originalPrice: 58000, rating: 4.8, reviews: 34,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop',
    stock: 'Limited Stock', badge: 'New', description: '12" color touchscreen patient monitor. ECG, SpO2, NIBP, Temp, Resp monitoring. Rechargeable battery, nurse call output.',
    specs: ['Display: 12" Touch', 'Parameters: 6', 'Battery: 4hrs', 'Alarms: Multi-level']
  },
  {
    id: 12, name: 'Trauma First Aid Backpack', category: 'first-aid', categoryName: 'First Aid',
    price: 3499, originalPrice: 4500, rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Professional trauma response backpack with 200+ items. Tourniquet, hemostatic gauze, airway management tools. Used by paramedics.',
    specs: ['Items: 200+', 'Tourniquet: Included', 'Waterproof: Yes', 'MOLLE: Compatible']
  },
  {
    id: 13, name: 'Amoxicillin 500mg Capsules', category: 'medicines', categoryName: 'Medicines',
    price: 89, originalPrice: 110, rating: 4.6, reviews: 445,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Amoxicillin antibiotic 500mg capsules. Pack of 21 capsules. Broad-spectrum penicillin antibiotic. Prescription required.',
    specs: ['Strength: 500mg', 'Pack: 21 capsules', 'Type: Antibiotic', 'Rx: Required']
  },
  {
    id: 14, name: 'Centrifuge Machine 8000 RPM', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 24999, originalPrice: 32000, rating: 4.7, reviews: 56,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Benchtop centrifuge with max 8000 RPM. 12x15mL rotor, digital display, auto-balance detection. Quiet operation under 60dB.',
    specs: ['Max RPM: 8000', 'Rotor: 12×15mL', 'Noise: <60dB', 'Timer: 0-99min']
  },
  {
    id: 15, name: 'Electric Power Wheelchair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 49999, originalPrice: 65000, rating: 4.9, reviews: 78,
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Premium', description: 'Heavy duty electric power wheelchair. Range 25km per charge, joystick control, anti-tip wheels, adjustable seating. Max load 150kg.',
    specs: ['Range: 25km', 'Max Load: 150kg', 'Speed: 6km/h', 'Battery: 24V 20Ah']
  },
  {
    id: 16, name: 'N95 Respirator Masks 50-Pack', category: 'personal-care', categoryName: 'Personal Care',
    price: 1299, originalPrice: 1800, rating: 4.8, reviews: 3421,
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'NIOSH approved N95 particulate respirator masks. 50-pack. Filters 95% of airborne particles. Foldable design, adjustable nose clip.',
    specs: ['Filtration: 95%', 'Pack: 50 masks', 'NIOSH: Approved', 'Type: Foldable']
  },
  {
    id: 17, name: 'Surgical Forceps Hemostatic', category: 'surgical-equipment', categoryName: 'Surgical Equipment',
    price: 1799, originalPrice: 2300, rating: 4.7, reviews: 93,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Stainless steel hemostatic forceps set. Includes Kelly, Mosquito, and Crile forceps. Ratchet lock mechanism, autoclavable.',
    specs: ['Types: 3', 'Material: SS 304', 'Lock: Ratchet', 'Autoclavable: Yes']
  },
  {
    id: 18, name: 'Digital Thermometer Infrared', category: 'diagnostic-devices', categoryName: 'Diagnostic Devices',
    price: 799, originalPrice: 1100, rating: 4.6, reviews: 1876,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'Non-contact infrared thermometer. 1-second reading, fever alarm, 32 memory slots, switchable °C/°F. Works for adults and children.',
    specs: ['Response: 1 second', 'Memory: 32 readings', 'Range: 32-43°C', 'Distance: 5-15cm']
  },
  {
    id: 19, name: 'Defibrillator AED Unit', category: 'icu-equipment', categoryName: 'ICU Equipment',
    price: 129999, originalPrice: 160000, rating: 5.0, reviews: 22,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop',
    stock: 'Limited Stock', badge: 'Premium', description: 'Automated External Defibrillator with voice guidance. FDA approved, self-test mode, IP55 rated. Includes carry case and electrode pads.',
    specs: ['FDA: Approved', 'IP Rating: IP55', 'Battery: 4 years standby', 'Guidance: Voice/Visual']
  },
  {
    id: 20, name: 'Wound Closure Stapler', category: 'first-aid', categoryName: 'First Aid',
    price: 2299, originalPrice: 3000, rating: 4.8, reviews: 145,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Disposable skin stapler with 35 staples. Ergonomic handle, stainless steel staples, removable. For emergency wound closure.',
    specs: ['Staples: 35', 'Material: SS', 'Type: Disposable', 'Sterile: Yes']
  },
  {
    id: 21, name: 'Vitamin D3 2000 IU Softgels', category: 'medicines', categoryName: 'Medicines',
    price: 349, originalPrice: 450, rating: 4.7, reviews: 2890,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Popular', description: 'High strength Vitamin D3 2000 IU softgels. Pack of 90. Supports bone health, immunity and muscle function. Soy-free, gluten-free.',
    specs: ['Strength: 2000 IU', 'Pack: 90 softgels', 'Soy-free: Yes', 'Gluten-free: Yes']
  },
  {
    id: 22, name: 'PCR Test Kit 50-Pack', category: 'lab-equipment', categoryName: 'Lab Equipment',
    price: 8999, originalPrice: 12000, rating: 4.9, reviews: 67,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'New', description: 'Real-time PCR test kit. 50 tests per pack. CE-IVD marked, 98.5% sensitivity, 99.2% specificity. 30-minute results.',
    specs: ['Tests: 50 per pack', 'Sensitivity: 98.5%', 'Specificity: 99.2%', 'CE-IVD: Marked']
  },
  {
    id: 23, name: 'Commode Transport Chair', category: 'wheelchairs', categoryName: 'Wheelchairs',
    price: 6499, originalPrice: 8500, rating: 4.5, reviews: 134,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: null, description: 'Lightweight commode transport chair. Padded seat and back, swing-away footrests, commode opening. Dual purpose: transport + commode.',
    specs: ['Weight: 9kg', 'Max Load: 100kg', 'Commode: Built-in', 'Footrests: Swing-away']
  },
  {
    id: 24, name: 'Surgical Gloves Latex 100-Pack', category: 'personal-care', categoryName: 'Personal Care',
    price: 499, originalPrice: 700, rating: 4.6, reviews: 5678,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop',
    stock: 'In Stock', badge: 'Best Seller', description: 'Powder-free latex surgical examination gloves. 100 gloves per box. Size M. AQL 1.5, ISO certified. Textured fingertips for grip.',
    specs: ['Qty: 100 per box', 'Size: Medium', 'AQL: 1.5', 'ISO: Certified']
  },
];
