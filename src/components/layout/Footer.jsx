import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube, FileText } from 'lucide-react';
import { categories } from '../../data/categories';
import CompanyBrandModal from '../common/CompanyBrandModal';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/logo.jpg" 
                  alt="Aidoxy Healthcare Logo" 
                  className="h-12 w-auto object-contain bg-white p-1 rounded-lg shadow-sm"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white tracking-tight">AIDOXY</span>
                  <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">Healthcare Pvt. Ltd.</span>
                </div>
              </div>
              <p className="text-xs font-medium text-orange-300 italic mb-3">Your Partner in Better Health</p>
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
              <h4 className="text-white font-semibold mb-4">Contact &amp; Importer Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin size={15} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Nayabazar - 17, Kathmandu, Nepal</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail size={15} className="text-orange-400 flex-shrink-0" />
                  <span>aidoxyhealthcare@gmail.com</span>
                </li>
              </ul>
              <div className="mt-5 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white">Import &amp; Tax Info</p>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Verified</span>
                </div>
                <p className="text-xs font-mono text-slate-300">PAN: <strong className="text-orange-400">623593419</strong></p>
                <p className="text-xs font-mono text-slate-300">EXIM: <strong className="text-orange-400">6235934190126NP</strong></p>
                <p className="text-xs text-slate-400">Country of Origin: <strong className="text-white font-semibold">INDIA</strong></p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full mt-2 py-1.5 px-2 bg-primary-600/30 hover:bg-primary-600/50 text-orange-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-primary-500/30"
                >
                  <FileText size={13} /> View Official Label Image
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} Aidoxy Healthcare Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
                <a key={l} href="#" className="text-xs text-slate-500 hover:text-primary-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CompanyBrandModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
