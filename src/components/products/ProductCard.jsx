import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="card group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="badge bg-primary-600 text-white">{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="badge bg-medical-green text-white">{discount}% OFF</span>
          )}
        </div>

        {/* Stock */}
        <div className="absolute top-3 right-3">
          <span className={`badge ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {product.stock}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggle(product)}
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200
            ${wishlisted ? 'bg-red-500 text-white scale-110' : 'bg-white text-slate-400 hover:text-red-500'}`}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-primary-600 font-medium mb-1">{product.categoryName}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addItem(product)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
            ${inCart
              ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100'
              : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
        >
          <ShoppingCart size={14} />
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
