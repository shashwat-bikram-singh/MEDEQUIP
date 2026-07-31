import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatMoney } from '../utils/currency';

export default function Cart() {
  const { items, total, removeItem, updateQty, clearCart } = useCart();

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-5">
        <ShoppingBag size={36} className="text-slate-300" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
      <p className="text-slate-400 text-sm mb-6">Add medical supplies and equipment to get started</p>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  );

  const cartCurrency = items[0]?.currency || 'NPR';
  const shipping = total >= 999 ? 0 : 99;
  const gst = Math.round(total * 0.05);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Cart <span className="text-slate-400 font-normal text-lg">({items.length} items)</span></h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const itemCurrency = item.currency || cartCurrency;
            return (
              <div key={item.id} className="card p-4 flex gap-4">
                <Link to={`/products/${item.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-primary-600 font-medium">{item.categoryName}</p>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {itemCurrency}
                    </span>
                  </div>
                  <Link to={`/products/${item.id}`} className="text-sm font-semibold text-slate-800 hover:text-primary-600 line-clamp-2 transition-colors">{item.name}</Link>
                  <p className="text-base font-bold text-slate-800 mt-1">{formatMoney(item.price, itemCurrency)}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-primary-600">{formatMoney(item.price * item.qty, itemCurrency)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-24 shadow-md">
          <h3 className="font-bold text-slate-800 text-lg mb-4 border-b border-slate-100 pb-3">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span><span>{formatMoney(total, cartCurrency)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (5%)</span><span>{formatMoney(gst, cartCurrency)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                {shipping === 0 ? 'FREE' : formatMoney(shipping, cartCurrency)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                Add {formatMoney(999 - total, cartCurrency)} more for free shipping
              </p>
            )}
            <div className="border-t border-slate-100 pt-3 flex justify-between font-extrabold text-slate-900 text-base">
              <span>Total Required</span>
              <span className="text-primary-600">{formatMoney(total + gst + shipping, cartCurrency)}</span>
            </div>
          </div>
          <Link to="/checkout" className="w-full btn-primary mt-5 py-3 text-base rounded-2xl justify-center font-bold">
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="block text-center text-sm text-primary-600 hover:underline mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
