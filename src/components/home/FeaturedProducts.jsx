import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import api from '../../api/client';

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/products?size=8')
      .then(res => {
        const content = res.data.content || res.data || [];
        const mapped = content.slice(0, 8).map(p => ({
          id: p.id,
          name: p.name,
          price: p.discountPrice || p.price,
          originalPrice: p.price,
          rating: p.rating || 0,
          reviews: p.reviewCount || 0,
          image: p.image?.startsWith('http') ? p.image : (p.image ? `http://localhost:8080/api/images/${p.image}` : 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop'),
          stock: p.stock > 0 ? 'In Stock' : 'Out of Stock',
          badge: p.isFeatured ? 'Featured' : null,
          category: p.categoryName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
          categoryName: p.categoryName || '',
          currency: 'NPR',
        }));
        setFeatured(mapped);
      })
      .catch(() => {
        // Fallback to local data
        import('../../data/products').then(m => {
          setFeatured((m.products || []).filter(p => p.badge).slice(0, 8));
        }).catch(() => setFeatured([]));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <Loader2 size={28} className="animate-spin text-primary-600 mx-auto" />
          <p className="text-slate-400 text-sm mt-2">Loading products...</p>
        </div>
      </section>
    );
  }

  if (featured.length === 0) return null;

  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Top picks trusted by healthcare professionals</p>
          </div>
          <Link to="/products" className="btn-outline hidden md:inline-flex">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/products" className="btn-outline">View All Products <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}
