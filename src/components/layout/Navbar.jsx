import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, ChevronDown, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/categories';
import CompanyBrandModal from '../common/CompanyBrandModal';
import CurrencySelector from '../common/CurrencySelector';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { count } = useCart();
  const { count: wCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
    setUserOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        {/* Top bar */}
        <div className="bg-slate-900 text-slate-200 text-[11px] py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 text-slate-300 font-medium">
              <span className="bg-orange-500 text-white text-[9.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Official Importer &amp; Marketer
              </span>
              <span className="font-semibold text-white">Aidoxy Healthcare Pvt. Ltd.</span>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:inline text-slate-300">📍 Nayabazar-17, Kathmandu, Nepal</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
              <CurrencySelector />
              <span className="hidden sm:inline">PAN: <strong className="text-orange-400">623593419</strong></span>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-orange-400 hover:text-orange-300 underline decoration-orange-400/50 hover:decoration-orange-300 transition-colors"
              >
                📜 Credentials
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <img 
                src="/images/logo.jpg" 
                alt="Aidoxy Healthcare Stethoscope Logo" 
                className="h-11 w-auto object-contain rounded bg-white p-0.5 border border-slate-100 shadow-sm transition-transform group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">AIDOXY</span>
                <span className="text-[9.5px] font-bold text-primary-600 tracking-widest uppercase">Healthcare Pvt. Ltd.</span>
                <span className="text-[8.5px] text-slate-400 font-medium italic mt-0.5">Your Partner in Better Health</span>
              </div>
            </Link>

            {/* Categories dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
              >
                Categories <ChevronDown size={14} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-slate-100 py-2 z-50">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <span>{cat.icon}</span> {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/b2b" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">Hospital B2B</Link>
              <Link to="/checkout" className="px-3 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-1">
                <QrCode size={15} /> QR Checkout
              </Link>
              <Link to="/support" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">Support</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">About</Link>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:flex">
              <div className="relative w-full max-w-lg">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search medical supplies, equipment..."
                  className="input-field pl-9 pr-4"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <Heart size={20} className="text-slate-600" />
                {wCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wCount}</span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <ShoppingCart size={20} className="text-slate-600" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>
                )}
              </Link>

              {user ? (
                <div className="relative hidden md:block">
                  <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700">
                    <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={14} className="text-primary-600" />
                    </div>
                    {user.name.split(' ')[0]}
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-card-hover border border-slate-100 py-2 z-50">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                        <User size={14} /> My Profile
                      </Link>
                      <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-primary hidden md:inline-flex text-xs px-4 py-2">
                  Login
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-slate-100 md:hidden transition-colors">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="pb-3 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search medical supplies..."
                  className="input-field pl-9"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Categories</p>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4 mb-2 px-2">Quick Links</p>
            <Link to="/checkout" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-emerald-700 font-bold hover:bg-emerald-50 transition-colors">
              <QrCode size={16} /> Scan &amp; Pay QR Checkout
            </Link>
            <Link to="/b2b" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              🏢 Hospital B2B
            </Link>
            <Link to="/support" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              💬 Help &amp; Support
            </Link>
            <Link to="/about" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              🏥 About Us
            </Link>
            <div className="border-t border-slate-100 pt-3 mt-3">
              {user ? (
                <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 w-full">
                  <LogOut size={14} /> Logout
                </button>
              ) : (
                <Link to="/login" className="btn-primary w-full justify-center">Login / Signup</Link>
              )}
            </div>
          </div>
        )}
      </header>

      <CompanyBrandModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
