import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, ArrowRight, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';
import CompanyBrandModal from '../common/CompanyBrandModal';

export default function AidoxyOrthopedicsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const orthoProducts = products.filter(p => p.category === 'orthopedic-rehab');

  return (
    <section className="py-16 bg-gradient-to-b from-white via-orange-50/40 to-slate-50 relative overflow-hidden border-y border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-200">
              <img src="/images/logo.jpg" alt="Aidoxy Logo" className="h-4 w-auto object-contain rounded" />
              Official Aidoxy Healthcare Orthopedics &amp; Rehabilitation
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Featured Orthopedic Supports &amp; Braces
            </h2>
            <p className="text-slate-600 text-base max-w-2xl">
              Doctor recommended 4-way elastic compression braces, bamboo knee caps, lumbo sacral belts, cervical collars, and pouch arm slings imported by <strong className="text-slate-800">Aidoxy Healthcare Pvt. Ltd.</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-orange-300 rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <FileText size={14} /> View Company Label &amp; Credentials
            </button>
            <Link
              to="/products?category=orthopedic-rehab"
              className="btn-primary text-xs font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5"
            >
              All Orthopedic Line <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Highlight Banner Showcase */}
        <div className="mb-12 rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 md:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold">
              <ShieldCheck size={14} /> ISO 9001:2015 &amp; CE Certified Production
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight text-white">
              Clinical Support &amp; Rehabilitation Series
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Designed with anatomical precision and high-tension elastic knit to deliver target compression, patellar stabilization, back support, and joint pain relief.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                'K-13 Bamboo Knee Cap',
                'K-5 Knee Cap Pro',
                'B-4 Lumbo Sacral Support',
                'E-6 Pouch Arm Sling',
                'Cervical Neck Collar',
                'Pro Wrist Support'
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link to="/products?category=orthopedic-rehab" className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center gap-2">
                Explore Orthopedic Range <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white p-2 w-full max-w-md">
              <img
                src="/images/products/aidoxy_orthopedics_catalogue.jpg"
                alt="Aidoxy Orthopedics Full Catalogue Showcase"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                Full Range Available
              </div>
            </div>
            <p className="text-slate-400 text-xs text-center mt-3 font-mono">
              Aidoxy Orthopedics &amp; Rehabilitation Product Suite
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {orthoProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CompanyBrandModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
