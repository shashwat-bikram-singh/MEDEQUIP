import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const banners = [
  {
    title: 'Surgical Equipment Sale',
    subtitle: 'Up to 30% off on all surgical tools',
    cta: 'Shop Now',
    link: '/products?category=surgical-equipment',
    bg: 'from-primary-600 to-primary-800',
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=300&fit=crop',
  },
  {
    title: 'Diagnostic Devices',
    subtitle: 'Professional grade at clinic prices',
    cta: 'Explore',
    link: '/products?category=diagnostic-devices',
    bg: 'from-teal-600 to-teal-800',
    img: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500&h=300&fit=crop',
  },
  {
    title: 'Bulk Orders Welcome',
    subtitle: 'Special pricing for hospitals & clinics',
    cta: 'Contact Us',
    link: '/contact',
    bg: 'from-indigo-600 to-indigo-800',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
  },
];

export default function Banners() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {banners.map((b, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${b.bg} text-white`}>
              <div className="absolute inset-0 opacity-20">
                <img src={b.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative p-7">
                <h3 className="text-xl font-bold mb-1">{b.title}</h3>
                <p className="text-white/80 text-sm mb-5">{b.subtitle}</p>
                <Link
                  to={b.link}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  {b.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
