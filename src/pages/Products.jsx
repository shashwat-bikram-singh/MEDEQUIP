import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, Loader2 } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { products as localProducts } from '../data/products';
import api, { getProductImageUrl } from '../api/client';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200000]);

  // Data from API
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  // Fetch categories
  useEffect(() => {
    api.get('/api/categories')
      .then(res => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (searchQuery) params.set('keyword', searchQuery);
    if (activeCategory) {
      // Find category ID from slug/name
      const cat = categories.find(c =>
        c.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeCategory ||
        c.slug === activeCategory ||
        c.id?.toString() === activeCategory
      );
      if (cat) params.set('categoryId', cat.id);
    }
    params.set('size', '100');

    api.get(`/api/products?${params.toString()}`)
      .then(res => {
        const data = res.data;
        const content = data.content || data || [];
        const mapped = content.map(p => {
          const catName = p.categoryName || p.category?.name || '';
          return {
            id: p.id,
            name: p.name,
            description: p.description,
            brand: p.brand,
            category: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            categoryName: catName,
            price: p.discountPrice || p.price,
            originalPrice: p.price,
            rating: p.rating || 0,
            reviews: p.reviewCount || 0,
            image: getProductImageUrl(p.imageUrl, p.image),
            stock: p.stock > 0 ? 'In Stock' : 'Out of Stock',
            badge: p.isFeatured ? 'Featured' : null,
            specs: [],
            currency: 'NPR',
          };
        });
        setProducts(mapped);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
        // Fallback to local data
        setProducts(localProducts);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, activeCategory, categories]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory && categories.length === 0) {
      // Fallback filtering for local data
      list = list.filter(p => p.category === activeCategory);
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, priceRange, sort, activeCategory, categories]);

  const setCategory = (slug) => {
    const p = new URLSearchParams(searchParams);
    if (slug) p.set('category', slug); else p.delete('category');
    p.delete('search');
    setSearchParams(p);
  };

  const categoryItems = categories.length > 0
    ? categories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
        icon: '🏥',
      }))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {activeCategory
              ? categoryItems.find(c => c.slug === activeCategory)?.name || 'Products'
              : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
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
            {categoryItems.map(cat => (
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
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Max Price: रू{priceRange[1].toLocaleString()}</h4>
            <input
              type="range" min={0} max={200000} step={500}
              value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-primary-600"
              aria-label="Filter by maximum price"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>रू0</span><span>रू2,00,000</span>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {filterOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setFilterOpen(false)} />}

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary-600" />
              <span className="ml-3 text-slate-500">Loading products...</span>
            </div>
          ) : error && products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
            </div>
          ) : filtered.length === 0 ? (
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
