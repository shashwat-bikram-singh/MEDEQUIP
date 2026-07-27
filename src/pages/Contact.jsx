import { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Contact Us</h1>
        <p className="text-slate-500">We're here to help. Reach out anytime.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info & Company Credentials Card */}
        <div className="space-y-5">
          {/* Logo Brand Header Box */}
          <div className="card p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 text-white flex items-center gap-4">
            <img 
              src="/images/logo.jpg" 
              alt="Aidoxy Healthcare Logo" 
              className="h-12 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
            />
            <div>
              <h3 className="font-extrabold text-white text-base">AIDOXY HEALTHCARE</h3>
              <p className="text-xs text-orange-400 font-semibold italic">Your Partner in Better Health</p>
            </div>
          </div>

          {[
            { icon: <Mail size={20} className="text-green-600" />, title: 'Email', lines: ['aidoxyhealthcare@gmail.com'], bg: 'bg-green-50' },
            { icon: <MapPin size={20} className="text-purple-600" />, title: 'Address', lines: ['Nayabazar - 17, Kathmandu, Nepal'], bg: 'bg-purple-50' },
            { icon: <Clock size={20} className="text-orange-600" />, title: 'Hours', lines: ['Mon–Sat: 9AM – 8PM', 'Sun: 10AM – 5PM'], bg: 'bg-orange-50' },
          ].map(c => (
            <div key={c.title} className="card p-5 flex gap-4">
              <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>{c.icon}</div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{c.title}</p>
                {c.lines.map(l => <p key={l} className="text-sm text-slate-500">{l}</p>)}
              </div>
            </div>
          ))}

          {/* Registration Card */}
          <div className="card p-5 bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Official Registration Credentials</h4>
            <div className="text-xs text-slate-600 font-mono space-y-1">
              <p>PAN: <strong className="text-slate-800">623593419</strong></p>
              <p>EXIM CODE: <strong className="text-slate-800">6235934190126NP</strong></p>
              <p>Country of Origin: <strong className="text-emerald-700 font-bold">INDIA</strong></p>
            </div>
          </div>

          {/* Official Label Thumbnail */}
          <div className="card p-4 bg-slate-900 text-slate-300 space-y-2 text-center">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">Verified Spec &amp; Tax Label</p>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-white p-1">
              <img src="/images/company-label.jpg" alt="Aidoxy Official Spec Label" className="w-full h-auto object-contain rounded-lg" />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 card p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Send us a Message</h2>
          {sent && (
            <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm font-medium">
              <CheckCircle size={18} /> Message sent successfully! We'll reply within 24 hours.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. John Doe" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@hospital.com" className="input-field" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" required>
                <option value="">Select a topic</option>
                <option>Product Inquiry</option>
                <option>Bulk Order / B2B</option>
                <option>Order Support</option>
                <option>Returns & Refunds</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help you?" className="input-field resize-none" required />
            </div>
            <button type="submit" className="btn-primary py-3 px-8 text-base rounded-2xl">
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
