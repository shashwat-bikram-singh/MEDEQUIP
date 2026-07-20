import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, CheckCircle, Package, Truck, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';
import ProductLocationMap from '../components/products/ProductLocationMap';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  if (!product) return (
    <div className="text-center py-32">
      <h2 className="text-xl font-bold text-slate-600">Product not found</h2>
      <Link to="/products" className="btn-primary mt-4 inline-flex">Back to Products</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-50 aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-primary-600 font-medium mb-2">{product.categoryName}</p>
          {(product.brand || product.model) && (
            <div className="flex items-center gap-2 mb-2">
              {product.brand && <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold uppercase tracking-wide">🏷️ {product.brand}</span>}
              {product.model && <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">Model: {product.model}</span>}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
            <span className="text-sm text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100">
            <span className="text-3xl font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="badge bg-green-100 text-green-700">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-5">
            <span className={`badge ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {product.stock === 'In Stock' ? <CheckCircle size={11} className="mr-1" /> : null}
              {product.stock}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {product.specs.map(s => (
              <div key={s} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                <CheckCircle size={13} className="text-primary-500 flex-shrink-0" /> {s}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={() => addItem(product)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all active:scale-95
                ${isInCart(product.id) ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
            >
              <ShoppingCart size={18} />
              {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggle(product)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all active:scale-95
                ${isWishlisted(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'}`}
            >
              <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} className="text-primary-600" />, label: 'Free Delivery', sub: 'Orders ₹999+' },
              { icon: <Package size={16} className="text-green-600" />, label: 'Easy Returns', sub: '30-day policy' },
              { icon: <ShieldCheck size={16} className="text-blue-600" />, label: 'Certified', sub: 'ISO & CE' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="text-center p-3 bg-slate-50 rounded-xl">
                <div className="flex justify-center mb-1">{icon}</div>
                <p className="text-xs font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GPS Location Map */}
      <ProductLocationMap product={product} />

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-5">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
