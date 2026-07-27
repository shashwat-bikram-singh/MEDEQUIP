import { useState } from 'react';
import { 
  Building2, ShieldCheck, FileText, Globe, Mail, MapPin, 
  Award, CheckCircle2, PackageCheck, Copy, QrCode, Truck, Barcode
} from 'lucide-react';

export default function About() {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* --- HERO SECTION --- */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 text-white p-8 md:p-14 shadow-2xl border border-slate-700/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-300 text-xs font-semibold uppercase tracking-wider">
              <Building2 size={14} className="text-orange-400" /> Official Company Profile
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Verified Importer &amp; Marketer
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
            <img 
              src="/images/logo.jpg" 
              alt="Aidoxy Healthcare Stethoscope Logo" 
              className="h-20 w-auto object-contain bg-white rounded-2xl p-2 shadow-xl border border-slate-700" 
            />
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                AIDOXY HEALTHCARE PVT. LTD.
              </h1>
              <p className="text-lg md:text-xl font-medium text-orange-400 italic">
                — Your Partner in Better Health —
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Aidoxy Healthcare Pvt. Ltd. is a premier healthcare enterprise headquartered in Kathmandu, Nepal. We specialize in importing and marketing top-tier orthopedic, surgical, and hospital-grade medical supplies certified under international standards from India.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm text-slate-200">
              <MapPin size={16} className="text-primary-400" /> Nayabazar - 17, Kathmandu, Nepal
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm text-slate-200">
              <Globe size={16} className="text-orange-400" /> Country of Origin: INDIA
            </div>
          </div>
        </div>
      </div>

      {/* --- OFFICIAL REGISTRATION & PRODUCT LABEL SHOWCASE --- */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3.5 py-1.5 rounded-full border border-primary-200">
            Verification & Compliance
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Official Company Credentials</h2>
          <p className="text-slate-600 text-sm">
            All Aidoxy products are registered, compliant with Nepal Customs & Trade Regulations, and bear verified EXIM & PAN credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Official Label Visual Image */}
          <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-4 md:p-6 border border-slate-800 shadow-xl flex flex-col justify-center items-center group">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-white p-2">
              <img 
                src="/images/company-label.jpg" 
                alt="Aidoxy Healthcare Official Company Product Label" 
                className="w-full h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <CheckCircle2 size={13} /> Verified Label
              </div>
            </div>
            <p className="text-slate-400 text-xs text-center mt-4 font-mono">
              Official Aidoxy Healthcare Product Spec & Tax Label (Sample)
            </p>
          </div>

          {/* Interactive Credential Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* PAN Number */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                  PAN
                </div>
                <button 
                  onClick={() => copyToClipboard('623593419', 'pan')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Copy PAN"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">PAN Registration No.</p>
                <p className="text-xl font-black text-slate-800 font-mono tracking-wider mt-1">623593419</p>
                {copiedField === 'pan' && <span className="text-[11px] font-bold text-emerald-600">Copied!</span>}
              </div>
            </div>

            {/* EXIM Code */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xs">
                  EXIM
                </div>
                <button 
                  onClick={() => copyToClipboard('6235934190126NP', 'exim')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Copy EXIM Code"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">EXIM Trade Code</p>
                <p className="text-lg font-black text-slate-800 font-mono tracking-tight mt-1">6235934190126NP</p>
                {copiedField === 'exim' && <span className="text-[11px] font-bold text-emerald-600">Copied!</span>}
              </div>
            </div>

            {/* Registered Address */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Imported &amp; Marketed By</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Aidoxy Healthcare Pvt. Ltd.</p>
                <p className="text-xs text-slate-500 mt-0.5">Nayabazar - 17, Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Official Email */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Email Contact</p>
                <a href="mailto:aidoxyhealthcare@gmail.com" className="text-sm font-bold text-primary-600 hover:underline block mt-1 break-all">
                  aidoxyhealthcare@gmail.com
                </a>
              </div>
            </div>

            {/* Barcode & Traceability */}
            <div className="sm:col-span-2 bg-gradient-to-r from-orange-500/10 to-primary-500/10 rounded-2xl p-5 border border-orange-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Barcode size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Standard Barcode &amp; Lot Traceability</h4>
                  <p className="text-xs text-slate-600">Product EAN: <span className="font-mono font-bold">8 906189 560127</span> | Batch &amp; Expiry Tracked</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                <QrCode size={14} className="text-primary-600" /> QR Verified
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* --- OUR MISSION & PROMISE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
        <div className="space-y-5">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
            Our Quality Promise
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            QUALITY ORTHOPEDIC &amp; HEALTHCARE PRODUCTS
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            At Aidoxy Healthcare, every product—from orthopedic supports, knee caps, and lumbo sacral belts to advanced surgical tools—undergoes rigorous quality inspection. We bridge top Indian manufacturers directly with Nepalese hospitals, clinics, and individuals.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "100% Certified Import from India with full customs compliance",
              "Ergonomic, doctor-recommended orthopedic designs",
              "Transparent MRP pricing inclusive of all taxes",
              "Fast nationwide delivery across Kathmandu, Pokhara, Chitwan, Dharan & more"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2">
            <p className="text-3xl font-black text-primary-600">500+</p>
            <p className="text-xs font-bold text-slate-600 uppercase">Hospital Partners</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2">
            <p className="text-3xl font-black text-orange-500">100%</p>
            <p className="text-xs font-bold text-slate-600 uppercase">Quality Certified</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2">
            <p className="text-3xl font-black text-emerald-600">24/7</p>
            <p className="text-xs font-bold text-slate-600 uppercase">Dedicated Support</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-2">
            <p className="text-3xl font-black text-purple-600">PAN &amp; EXIM</p>
            <p className="text-xs font-bold text-slate-600 uppercase">Fully Registered</p>
          </div>
        </div>
      </div>

      {/* --- CORE VALUES --- */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Why Healthcare Professionals Choose Aidoxy</h2>
          <p className="text-slate-500 text-sm">Built on trust, quality, and clinical excellence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck size={26} />, title: 'Certified Quality', desc: 'ISO & CE compliant orthopedic products imported directly from trusted manufacturers.', color: 'text-primary-600 bg-primary-50' },
            { icon: <PackageCheck size={26} />, title: 'Lot & Batch Tracked', desc: 'Complete batch traceability on every item for safety & verification.', color: 'text-orange-600 bg-orange-50' },
            { icon: <Truck size={26} />, title: 'Nationwide Delivery', desc: 'Efficient logistics network connecting all major cities and healthcare centers in Nepal.', color: 'text-emerald-600 bg-emerald-50' },
            { icon: <Award size={26} />, title: 'Trusted Support', desc: 'Dedicated customer service and hospital B2B procurement support.', color: 'text-purple-600 bg-purple-50' },
          ].map(v => (
            <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3">
              <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center`}>{v.icon}</div>
              <h3 className="font-bold text-slate-800 text-base">{v.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA CALLOUT --- */}
      <div className="bg-gradient-to-r from-slate-900 to-primary-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl border border-slate-800">
        <h2 className="text-2xl md:text-3xl font-black">Trusted Support. Better Life.</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Need bulk hospital procurement or orthopedic product inquiries? Connect with Aidoxy Healthcare Pvt. Ltd. today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="btn-primary text-sm px-7 py-3">
            Contact Company
          </a>
          <a href="/products" className="px-7 py-3 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-colors text-sm border border-white/20">
            Browse Catalogue
          </a>
        </div>
      </div>

    </div>
  );
}
