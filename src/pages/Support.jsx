import { useState } from 'react';
import { Search, ShieldCheck, Mail, Phone, MessageSquare, LifeBuoy, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const helpTopics = [
  { icon: <LifeBuoy size={20} />, title: "Tracking High-Priority Shipments", desc: "Monitor the real-time status of your critical medical supply orders." },
  { icon: <FileText size={20} />, title: "Split-Location Deliveries", desc: "Configure multiple delivery destinations within a single purchase order." },
  { icon: <FileText size={20} />, title: "Downloading Invoices (PDF/CSV)", desc: "Access and export your complete invoicing history in multiple formats." },
  { icon: <LifeBuoy size={20} />, title: "Recurring Order Scheduling", desc: "Set up automated recurring orders based on consumption patterns." },
];

export default function Support() {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-14 bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-3xl p-10">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold px-3 py-1 mb-4">
          <LifeBuoy size={12} /> Help Center
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">Support &amp; Help Center</h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed mb-6">
          Access high-precision documentation, order tracking, and technical specifications for medical-grade supplies.
        </p>
        <div className="relative w-full max-w-lg mx-auto">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search help articles, FAQs, and documentation..."
            className="input-field pl-10 pr-4 py-3 text-base shadow-sm"
          />
        </div>
      </div>

      {/* Order Management */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Order Management</h2>
        <p className="text-slate-500 text-sm mb-6">Real-time logistics tracking, invoicing, and facility-wide procurement settings.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {helpTopics.map((t, idx) => (
            <div key={idx} className="card p-5 hover:shadow-card-hover transition-all group cursor-pointer">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">{t.icon}</div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">{t.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <div className="card p-6 flex flex-col justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-800 mb-2 text-base">Technical Support</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Equipment calibration guides and medical device troubleshooting.</p>
          </div>
          <Link to="/contact" className="btn-outline text-xs px-4 py-2 flex items-center gap-1 rounded-xl">
            Browse Docs <ChevronRight size={14} />
          </Link>
        </div>
        <div className="card p-6 flex flex-col justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-800 mb-2 text-base">Returns &amp; Claims</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Hassle-free return labels and damage claims for sensitive instruments.</p>
          </div>
          <Link to="/contact" className="btn-outline text-xs px-4 py-2 flex items-center gap-1 rounded-xl">
            Start a Return <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "FDA Certified", desc: "Regulated medical standards across clinical inventory." },
          { title: "HIPAA Compliant", desc: "Full data privacy protection for institutional systems." },
          { title: "ISO 13485:2016", desc: "Certified quality management systems for medical devices." }
        ].map((c) => (
          <div key={c.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-3">
            <ShieldCheck size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800 text-sm">{c.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Direct support */}
      <div className="card p-8">
        <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Get in Touch</h2>
        <p className="text-slate-500 text-sm text-center mb-8 max-w-xl mx-auto">
          Our support team consists of healthcare supply chain experts available to help optimize hospital and clinic procurement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-5 hover:bg-slate-50 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-3">
              <MessageSquare size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Live Clinical Chat</h4>
            <p className="text-xs text-slate-400 mb-3">Response time &lt; 2 minutes</p>
            <Link to="/contact" className="btn-primary text-xs px-4 py-2 rounded-xl">Start Chat</Link>
          </div>
          <div className="text-center p-5 hover:bg-slate-50 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-3">
              <Phone size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Direct Facility Line</h4>
            <p className="text-xs text-slate-400 mb-3">Priority for Surgical Departments</p>
            <p className="font-semibold text-slate-700 text-sm">aidoxyhealthcare@gmail.com</p>
          </div>
          <div className="text-center p-5 hover:bg-slate-50 rounded-2xl transition-colors">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-3">
              <Mail size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Email Support</h4>
            <p className="text-xs text-slate-400 mb-3">Response within 4 hours</p>
            <p className="font-semibold text-slate-700 text-sm">aidoxyhealthcare@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
