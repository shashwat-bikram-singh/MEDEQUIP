import { useState } from 'react';
import { ShieldCheck, Clock, Award, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  { name: "Clinic Advantage", desc: "Ideal for private practices and regional clinics seeking reliable weekly restock.", perks: ["10% Discount on Consumables", "Min Order: रू1,50,000"], highlight: false },
  { name: "Regional Hospital", desc: "Comprehensive pricing for multi-department facilities with monthly procurement cycles.", perks: ["18% Tiered Reduction", "Net-30 Invoicing Options", "Min Order: रू10,00,000"], highlight: true },
  { name: "Enterprise Network", desc: "Direct manufacturer-level pricing for national healthcare networks and government entities.", perks: ["Custom Negotiated Rates", "Dedicated Logistic Channels", "Min Order: रू50,00,000+"], highlight: false },
];

export default function B2B() {
  const [form, setForm] = useState({ name: '', email: '', requirements: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', requirements: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16 relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-10 md:p-16 text-white shadow-xl overflow-hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold mb-4">
          🏢 Institutional Procurement
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-in">Hospital &amp; B2B Procurement</h1>
        <p className="text-primary-100 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          Streamline your hospital supply chain with verified FDA-grade medical equipment. Benefit from high-volume tiered pricing, net invoicing, and priority logistics.
        </p>
        <a href="#quote-form" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 py-3 px-8 text-base rounded-2xl">
          Initialize Bulk Request <ArrowRight size={16} />
        </a>
      </div>

      {/* Pricing Tiers */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Automated Volume Discounts</h2>
          <p className="text-slate-500 mt-2">Verified tiered structures for healthcare institutions</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div key={t.name} className={`card p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover relative ${t.highlight ? 'border-2 border-primary-500 scale-105 shadow-card' : ''}`}>
              {t.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{t.desc}</p>
                <ul className="space-y-3 mb-8">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#quote-form" className={`w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all active:scale-95 block ${t.highlight ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
                Get Quote
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: <ShieldCheck size={24} className="text-green-600" />, title: 'FDA Certified Supply Chain', desc: 'All B2B products pass strict regulatory audits and maintain quality certificates.' },
          { icon: <Clock size={24} className="text-primary-600" />, title: 'Just-In-Time Delivery', desc: 'Configure customized weekly or monthly shipping intervals synchronized with your caseload.' },
          { icon: <Award size={24} className="text-orange-600" />, title: 'Dedicated Account Managers', desc: 'Direct corporate line for procurement support, contract customization, and tracking.' }
        ].map((f) => (
          <div key={f.title} className="card p-6 flex gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">{f.icon}</div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1.5">{f.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency shortage section */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0 text-xl font-bold">🚨</div>
          <div>
            <h3 className="font-bold text-red-800 text-lg mb-1">Emergency Supply Shortages?</h3>
            <p className="text-sm text-red-600 leading-relaxed">
              We maintain dedicated emergency stockpiles for certified institutional buyers with 24-hour nationwide delivery options.
            </p>
          </div>
        </div>
        <Link to="/emergency" className="btn-primary bg-red-600 hover:bg-red-700 text-white rounded-2xl whitespace-nowrap px-6 py-3">
          Emergency Supply Portal
        </Link>
      </div>

      {/* Form */}
      <div id="quote-form" className="card p-8 md:p-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Request a Custom Quote</h2>
          <p className="text-slate-500 text-sm mt-1">Our procurement specialists respond within 4 business hours.</p>
        </div>
        {sent && (
          <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
            <CheckCircle size={18} /> Quote request received successfully! One of our experts will contact you shortly.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Facility Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Fortis / Apollo / General Clinic" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Corporate Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="procurement@hospital.org" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Requirements Details</label>
            <textarea required value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={5} placeholder="Describe the medical equipment, quantities, contract duration, and shipping timelines needed..." className="input-field resize-none" />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-base rounded-2xl justify-center">
            <Send size={16} /> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
