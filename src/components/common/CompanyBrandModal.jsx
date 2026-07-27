import { useState } from 'react';
import { X, CheckCircle2, Copy, MapPin, Mail, Globe, ShieldCheck, FileText, QrCode, ExternalLink } from 'lucide-react';

export default function CompanyBrandModal({ isOpen, onClose }) {
  const [copiedField, setCopiedField] = useState(null);
  const [activeTab, setActiveTab] = useState('label'); // 'label' or 'logo'

  if (!isOpen) return null;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-primary-950 text-white p-6 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo.jpg" 
              alt="Aidoxy Healthcare Stethoscope Logo" 
              className="h-12 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight text-white">AIDOXY HEALTHCARE PVT. LTD.</h3>
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Importer
                </span>
              </div>
              <p className="text-xs text-orange-400 italic">Your Partner in Better Health</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('label')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'label'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText size={16} /> Official Product Label &amp; Credentials
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'logo'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck size={16} /> Official Brand Stethoscope Logo
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'label' ? (
            <div className="space-y-6">
              {/* Product Label Image Display */}
              <div className="bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
                <div className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl p-2 border border-slate-200">
                  <img
                    src="/images/company-label.jpg"
                    alt="Aidoxy Healthcare Official Spec Label"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <CheckCircle2 size={13} /> Official Seal
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-3 text-center font-mono">
                  Authentic Aidoxy Healthcare Product &amp; Importer Label (Nepal Registration)
                </p>
              </div>

              {/* Grid of Verified Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block uppercase">Imported &amp; Marketed By</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">Aidoxy Healthcare Pvt. Ltd.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block uppercase">Address</span>
                  <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary-600" /> Nayabazar - 17, Kathmandu, Nepal
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block uppercase">PAN Number</span>
                    <p className="text-sm font-bold text-orange-600 mt-0.5">623593419</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('623593419', 'pan')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-sm"
                  >
                    {copiedField === 'pan' ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block uppercase">EXIM Code</span>
                    <p className="text-sm font-bold text-orange-600 mt-0.5">6235934190126NP</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('6235934190126NP', 'exim')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-sm"
                  >
                    {copiedField === 'exim' ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block uppercase">Email</span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">aidoxyhealthcare@gmail.com</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('aidoxyhealthcare@gmail.com', 'mail')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-sm"
                  >
                    {copiedField === 'mail' ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block uppercase">Country of Origin</span>
                  <p className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                    <Globe size={14} className="text-green-600" /> INDIA
                  </p>
                </div>
              </div>

              {/* Quality Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">QUALITY ORTHOPEDIC &amp; HEALTHCARE PRODUCTS</h4>
                  <p className="text-xs text-orange-100 mt-0.5">Trusted Support. Better Life.</p>
                </div>
                <ShieldCheck size={28} className="text-white/80" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Logo Preview Section */}
              <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 max-w-sm text-center">
                  <img
                    src="/images/logo.jpg"
                    alt="Aidoxy Healthcare Stethoscope Logo"
                    className="w-64 h-auto mx-auto object-contain"
                  />
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="font-black text-slate-900 text-lg">AIDOXY HEALTHCARE PVT. LTD.</h4>
                    <p className="text-xs font-semibold text-primary-600 tracking-wider uppercase mt-1">
                      Official Stethoscope Brand Mark
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-800 space-y-1">
                <p className="font-bold">Trademark &amp; Design Notes:</p>
                <p>
                  The Aidoxy Healthcare stethoscope emblem signifies clinical excellence, compassion, and certified orthopedic quality.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-2.5 px-6 rounded-xl text-sm font-semibold"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
