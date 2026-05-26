import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Dr. Priya Sharma', role: 'Cardiologist, AIIMS Delhi', rating: 5, text: 'MEDEQUIP has been our go-to supplier for cardiac monitoring equipment. Excellent quality, fast delivery, and responsive support team. Highly recommended!', avatar: 'PS' },
  { name: 'Rajan Mehta', role: 'Hospital Procurement Manager', rating: 5, text: 'We source all our ICU equipment from MEDEQUIP. The pricing is competitive and all products come with proper certifications. Very reliable platform.', avatar: 'RM' },
  { name: 'Dr. Anita Verma', role: 'General Physician, Pune', rating: 5, text: 'For my clinic, MEDEQUIP has been a lifesaver. Easy to find products, good descriptions, and products are exactly as described. 5 stars!', avatar: 'AV' },
  { name: 'Suresh Nair', role: 'Nursing Home Owner, Kerala', rating: 4, text: 'Great selection of diagnostic devices. The bulk pricing for hospitals is very reasonable. Returns process was smooth when I needed to exchange a product.', avatar: 'SN' },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by 10,000+ healthcare professionals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="card p-6 hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
