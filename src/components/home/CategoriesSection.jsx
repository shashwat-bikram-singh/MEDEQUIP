import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories as staticCategories } from '../../data/categories';
import api from '../../api/client';

const CATEGORY_ICONS = {
  'surgical equipment': '🔬',
  'diagnostic devices': '🩺',
  'hospital furniture': '🏥',
  'patient care': '🩹',
  'lab equipment': '🧪',
  'emergency equipment': '🚑',
  'rehabilitation': '♿',
  'ppe & safety': '🧴',
  'icu equipment': '🏥',
  'first aid': '🩹',
  'medicines': '💊',
  'wheelchairs': '♿',
  'personal care': '🧴',
  'orthopedic & rehab': '🦴',
};

const CATEGORY_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-green-50 text-green-600',
  'bg-red-50 text-red-600',
  'bg-orange-50 text-orange-600',
  'bg-purple-50 text-purple-600',
  'bg-cyan-50 text-cyan-600',
  'bg-indigo-50 text-indigo-600',
  'bg-pink-50 text-pink-600',
  'bg-amber-50 text-amber-600',
];

export default function Categories() {
  const [categories, setCategories] = useState(staticCategories);

  useEffect(() => {
    api.get('/api/categories')
      .then(res => {
        const data = res.data || [];
        if (data.length > 0) {
          const mapped = data.map((cat, idx) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
            icon: CATEGORY_ICONS[cat.name?.toLowerCase()] || '🏥',
            color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
            description: cat.description || '',
          }));
          setCategories(mapped);
        }
      })
      .catch(() => { /* Keep static data */ });
  }, []);

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
              {cat.description && <p className="text-xs text-slate-400 line-clamp-1">{cat.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
