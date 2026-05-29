import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

export default function Categories() {
  const getCount = (slug) => products.filter(p => p.category === slug).length;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you need</p>
          </div>
          <Link to="/categories" className="btn-outline hidden md:inline-flex">
            All Categories <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group card p-5 flex flex-col items-center text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">{cat.name}</h3>
              <p className="text-xs text-slate-400">{getCount(cat.slug)} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
