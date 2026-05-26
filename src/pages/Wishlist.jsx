import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-5">
        <Heart size={36} className="text-red-200" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Your wishlist is empty</h2>
      <p className="text-slate-400 text-sm mb-6">Save products you love to your wishlist</p>
      <Link to="/products" className="btn-primary">Explore Products</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          My Wishlist <span className="text-slate-400 font-normal text-lg">({items.length} items)</span>
        </h1>
        <Link to="/cart" className="btn-outline flex items-center gap-2">
          <ShoppingBag size={14} /> View Cart
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
