import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const getCount = (slug) => products.filter(p => p.category === slug).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">All Categories</h1>
        <p className="text-slate-500">Browse our complete range of medical supplies by category</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="card p-6 group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {cat.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">{cat.name}</h2>
            <p className="text-sm text-slate-500 mb-3 leading-relaxed">{cat.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">{getCount(cat.slug)} products</span>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
