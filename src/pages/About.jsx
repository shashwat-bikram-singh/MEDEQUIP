import { ShieldCheck, Award, Users, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-4">
          🏥 Est. 2018 · Gurugram, India
        </span>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">About MEDEQUIP</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          We are India's most trusted online platform for premium medical supplies, surgical equipment, and healthcare products — serving hospitals, clinics, and individuals.
        </p>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="rounded-2xl overflow-hidden shadow-card-hover h-80">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop" alt="Medical facility" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To make high-quality, certified medical equipment accessible to every healthcare professional and patient across India — at fair, transparent prices with unmatched service.
          </p>
          <p className="text-slate-600 leading-relaxed">
            From a small startup in 2018 to serving over 500 hospitals and 10,000+ individual customers, MEDEQUIP has grown by prioritizing trust, quality, and fast delivery above everything else.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[['500+', 'Hospitals'], ['10K+', 'Customers'], ['8', 'Categories'], ['98%', 'Satisfaction']].map(([v, l]) => (
              <div key={l} className="bg-primary-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-primary-600">{v}</p>
                <p className="text-sm text-slate-600 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <ShieldCheck size={24} />, title: 'Quality First', desc: 'Every product is certified and quality-checked before listing', color: 'text-blue-600 bg-blue-50' },
            { icon: <Award size={24} />, title: 'Certified Only', desc: 'We stock only ISO, CE & FDA approved medical products', color: 'text-green-600 bg-green-50' },
            { icon: <Users size={24} />, title: 'Customer Focus', desc: 'Your health needs are our priority — always', color: 'text-purple-600 bg-purple-50' },
            { icon: <TrendingUp size={24} />, title: 'Continuous Growth', desc: 'Expanding our catalogue with the latest medical innovations', color: 'text-orange-600 bg-orange-50' },
          ].map(f => (
            <div key={f.title} className="card p-6 text-center hover:shadow-card-hover transition-all">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{f.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Join 10,000+ Healthcare Professionals</h2>
        <p className="text-primary-100 mb-6 max-w-md mx-auto">Get access to certified medical supplies, exclusive bulk pricing, and dedicated account support.</p>
        <a href="/signup" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-3 rounded-2xl hover:bg-primary-50 transition-colors">
          Get Started Free
        </a>
      </div>
    </div>
  );
}
