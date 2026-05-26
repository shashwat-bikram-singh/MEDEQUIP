import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/products/ProductCard';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const activeCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, searchQuery, priceRange, sort]);

  const setCategory = (slug) => {
    const p = new URLSearchParams(searchParams);
    if (slug) p.set('category', slug); else p.delete('category');
    p.delete('search');
    setSearchParams(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {activeCategory ? categories.find(c => c.slug === activeCategory)?.name : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button onClick={() => setFilterOpen(!filterOpen)} className="btn-outline flex items-center gap-2 md:hidden">
            <SlidersHorizontal size={14} /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filter */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300 md:relative md:inset-auto md:z-auto md:w-64 md:shadow-none md:block md:translate-x-0 flex-shrink-0
          ${filterOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between mb-5 md:hidden">
            <h3 className="font-semibold text-slate-800">Filters</h3>
            <button onClick={() => setFilterOpen(false)}><X size={18} /></button>
          </div>

          {/* Categories filter */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Categories</h4>
            <button
              onClick={() => setCategory('')}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl mb-1 transition-colors ${!activeCategory ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left text-sm px-3 py-2 rounded-xl mb-1 flex items-center gap-2 transition-colors
                  ${activeCategory === cat.slug ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Price filter */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Max Price: ₹{priceRange[1].toLocaleString()}</h4>
            <input
              type="range" min={0} max={200000} step={500}
              value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-primary-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹0</span><span>₹2,00,000</span>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {filterOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setFilterOpen(false)} />}

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600">No products found</h3>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
