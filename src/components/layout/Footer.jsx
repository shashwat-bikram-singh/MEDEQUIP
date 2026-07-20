import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { categories } from '../../data/categories';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-extrabold text-white tracking-tight">AIDOXY</span>
              <span className="text-xs font-semibold text-primary-400 tracking-widest uppercase">Healthcare Pvt. Ltd.</span>
            </div>
            <p className="text-xs font-medium text-primary-300 italic mb-3">Your Partner in Better Health</p>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Quality Orthopedic &amp; Healthcare Products imported from India. Trusted Support. Better Life.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.slug}`} className="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1.5">
                    <span className="text-xs">{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                ['/', 'Home'],
                ['/products', 'All Products'],
                ['/about', 'About Us'],
                ['/contact', 'Contact'],
                ['/cart', 'My Cart'],
                ['/wishlist', 'Wishlist'],
                ['/b2b', 'Hospital B2B'],
                ['/support', 'Help Center']
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-primary-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>Nayabazar - 17, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={15} className="text-primary-400 flex-shrink-0" />
                <span>aidoxyhealthcare@gmail.com</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-slate-800 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-white">Company Info</p>
              <p className="text-xs text-slate-400">PAN: 623593419</p>
              <p className="text-xs text-slate-400">EXIM CODE: 6235934190126NP</p>
              <p className="text-xs text-slate-400">Country of Origin: India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2024 Aidoxy Healthcare Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
              <a key={l} href="#" className="text-xs text-slate-500 hover:text-primary-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
