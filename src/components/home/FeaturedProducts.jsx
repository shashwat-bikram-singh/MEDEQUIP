import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter(p => p.badge).slice(0, 8);
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
