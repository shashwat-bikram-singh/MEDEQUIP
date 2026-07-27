import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm mb-6">
              <img 
                src="/images/logo.jpg" 
                alt="Aidoxy Stethoscope Logo" 
                className="h-9 w-auto object-contain bg-white rounded-lg p-0.5 border border-slate-100" 
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-slate-900 tracking-tight">AIDOXY HEALTHCARE PVT. LTD.</span>
                <span className="text-[10px] font-bold text-orange-600 tracking-wider">Your Partner in Better Health</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-5">
              Quality Orthopedic &amp;<br />
              <span className="text-primary-600">Healthcare Products</span><br />
              &amp; Equipment
            </h1>
            <p className="text-slate-600 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              Imported from India &amp; Marketed by Aidoxy Healthcare Pvt. Ltd. (Kathmandu, Nepal). Certified surgical tools, diagnostic devices, and hospital supplies.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/products" className="btn-primary text-base px-7 py-3 rounded-2xl">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/categories" className="btn-outline text-base px-7 py-3 rounded-2xl">
                Browse Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <ShieldCheck size={16} className="text-green-600" />, label: 'ISO Certified Products' },
                { icon: <Truck size={16} className="text-primary-600" />, label: 'Free Delivery ₹999+' },
                { icon: <span className="text-sm">⭐</span>, label: '4.8/5 Customer Rating' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  {icon} {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-card-hover h-48">
                <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop" alt="Surgical Equipment" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card h-36">
                <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=250&fit=crop" alt="Diagnostic Devices" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden shadow-card h-36">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop" alt="Lab Equipment" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card-hover h-48">
                <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop" alt="ICU Equipment" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '10,000+', label: 'Products' },
            { val: '500+', label: 'Hospitals Served' },
            { val: '98%', label: 'Satisfaction Rate' },
            { val: '24/7', label: 'Customer Support' },
          ].map(({ val, label }) => (
            <div key={label} className="bg-white rounded-2xl shadow-card p-5 text-center border border-slate-100">
              <p className="text-2xl font-bold text-primary-600">{val}</p>
              <p className="text-sm text-slate-500 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
