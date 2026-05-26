import { ShieldCheck, Truck, RotateCcw, HeadphonesIcon, Award, Clock } from 'lucide-react';

const features = [
  { icon: <ShieldCheck size={24} />, title: 'Certified Products', desc: 'All products are ISO and CE certified for quality assurance', color: 'text-blue-600 bg-blue-50' },
  { icon: <Truck size={24} />, title: 'Fast Delivery', desc: 'Free shipping on orders above ₹999. Same-day dispatch', color: 'text-green-600 bg-green-50' },
  { icon: <RotateCcw size={24} />, title: 'Easy Returns', desc: '30-day hassle-free return policy on all products', color: 'text-orange-600 bg-orange-50' },
  { icon: <HeadphonesIcon size={24} />, title: '24/7 Support', desc: 'Round-the-clock customer support via call, chat and email', color: 'text-purple-600 bg-purple-50' },
  { icon: <Award size={24} />, title: 'Best Prices', desc: 'Price match guarantee on all medical equipment', color: 'text-red-600 bg-red-50' },
  { icon: <Clock size={24} />, title: 'Quick Reorder', desc: 'One-click reorder for your frequently purchased items', color: 'text-teal-600 bg-teal-50' },
];

export default function WhyUs() {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Why Choose MEDEQUIP?</h2>
          <p className="section-subtitle">Trusted by healthcare professionals across India</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="card p-6 flex gap-4 hover:shadow-card-hover transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
