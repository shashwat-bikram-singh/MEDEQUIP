import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, CheckCircle, Package, Truck, ShieldCheck, QrCode, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';
import ProductLocationMap from '../components/products/ProductLocationMap';
import CompanyBrandModal from '../components/common/CompanyBrandModal';
import { products as localProducts } from '../data/products';
import { formatMoney } from '../utils/currency';
import api, { getProductImageUrl } from '../api/client';

export default function ProductDetail() {
  const [showLabelModal, setShowLabelModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api.get(`/api/products/${id}`)
      .then(res => {
        const p = res.data;
        const catName = p.categoryName || p.category?.name || '';
        const catId = p.categoryId || p.category?.id;
        const mapped = {
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
          specs: p.specs || [],
          currency: 'NPR',
        };
        setProduct(mapped);

        // Fetch related products from same category
        if (catId) {
          api.get(`/api/products?categoryId=${catId}&size=5`)
            .then(relRes => {
              const content = relRes.data.content || relRes.data || [];
              const relMapped = content
                .filter(r => r.id !== p.id)
                .slice(0, 4)
                .map(r => {
                  const rCatName = r.categoryName || r.category?.name || '';
                  return {
                    id: r.id,
                    name: r.name,
                    price: r.discountPrice || r.price,
                    originalPrice: r.price,
                    rating: r.rating || 0,
                    reviews: r.reviewCount || 0,
                    image: getProductImageUrl(r.imageUrl, r.image),
                    stock: r.stock > 0 ? 'In Stock' : 'Out of Stock',
                    category: rCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    categoryName: rCatName,
                    currency: 'NPR',
                  };
                });
              setRelated(relMapped);
            })
            .catch(() => setRelated([]));
        }
      })
      .catch(err => {
        console.error('Failed to fetch product:', err);
        // Fallback to local data
        const p = localProducts.find(p => p.id === Number(id));
        if (p) {
          setProduct(p);
          setRelated(localProducts.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4));
        } else {
          setError('Product not found');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-primary-600" />
      <span className="ml-3 text-slate-500">Loading product...</span>
    </div>
  );

  if (error || !product) return (
    <div className="text-center py-32">
      <h2 className="text-xl font-bold text-slate-600">{error || 'Product not found'}</h2>
      <Link to="/products" className="btn-primary mt-4 inline-flex">Back to Products</Link>
    </div>
  );

  const productCurrency = product.currency || 'NPR';
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const buyNowWithQR = () => {
    addItem(product);
    navigate('/checkout');
  };

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
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-primary-600 font-medium">{product.categoryName}</p>
            <span className="badge bg-slate-900 text-white font-mono text-xs">
              Currency: {productCurrency}
            </span>
          </div>

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
            <span className="text-sm text-slate-400">({(product.reviews || 0).toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100">
            <span className="text-3xl font-extrabold text-slate-900">
              {formatMoney(product.price, productCurrency)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatMoney(product.originalPrice, productCurrency)}
                </span>
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
          {product.specs?.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.specs.map(s => (
                <div key={s} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                  <CheckCircle size={13} className="text-primary-500 flex-shrink-0" /> {s}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addItem(product)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all active:scale-95
                ${isInCart(product.id) ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
            >
              <ShoppingCart size={18} />
              {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={buyNowWithQR}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95"
            >
              <QrCode size={18} />
              Buy Now
            </button>

            <button
              onClick={() => toggle(product)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all active:scale-95 self-center
                ${isWishlisted(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'}`}
            >
              <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} className="text-primary-600" />, label: 'Free Delivery', sub: `Orders ${formatMoney(999, productCurrency)}+` },
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

          {/* Official Aidoxy Healthcare Importer & Label Box */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 text-white shadow-lg border border-slate-700/60">
            <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="Aidoxy Stethoscope Logo"
                  className="h-10 w-auto object-contain bg-white rounded-lg p-0.5"
                />
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">IMPORTED &amp; MARKETED BY</span>
                  <h4 className="text-sm font-bold text-white leading-tight">Aidoxy Healthcare Pvt. Ltd.</h4>
                </div>
              </div>
              <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle size={12} /> Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-mono mb-3">
              <div>📍 Nayabazar-17, Kathmandu</div>
              <div>🇳🇵 PAN: <strong className="text-orange-400">623593419</strong></div>
              <div>🌐 Origin: <strong className="text-green-400">INDIA</strong></div>
              <div>📜 EXIM: <strong className="text-orange-400">6235934190126NP</strong></div>
            </div>

            <button
              onClick={() => setShowLabelModal(true)}
              className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-orange-300 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              🔍 View Official Product &amp; Compliance Label Image
            </button>
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

      {/* Company Brand & Spec Label Modal */}
      <CompanyBrandModal isOpen={showLabelModal} onClose={() => setShowLabelModal(false)} />
    </div>
  );
}
