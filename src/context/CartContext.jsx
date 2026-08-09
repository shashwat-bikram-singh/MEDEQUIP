import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api from '../api/client';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false });
  const { isLoggedIn } = useAuth();

  // Fetch cart from backend when user logs in
  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.get('/api/cart');
      const backendItems = (response.data.items || []).map(item => ({
        id: item.product?.id || item.productId,
        cartItemId: item.id,
        name: item.product?.name || item.productName || 'Product',
        price: item.product?.discountPrice || item.product?.price || item.price || 0,
        originalPrice: item.product?.price || item.price || 0,
        image: item.product?.image || item.productImage || '',
        category: item.product?.categoryName || '',
        categoryName: item.product?.categoryName || '',
        qty: item.quantity,
        stock: item.product?.stock,
        currency: 'NPR',
      }));
      dispatch({ type: 'SET_ITEMS', payload: backendItems });
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      // Load from localStorage for guest users
      try {
        const saved = localStorage.getItem('medequip_guest_cart');
        if (saved) dispatch({ type: 'SET_ITEMS', payload: JSON.parse(saved) });
      } catch { /* ignore */ }
    }
  }, [isLoggedIn, fetchCart]);

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('medequip_guest_cart', JSON.stringify(state.items));
    }
  }, [state.items, isLoggedIn]);

  const addItem = useCallback(async (product) => {
    if (isLoggedIn) {
      try {
        await api.post('/api/cart/items', { productId: product.id, quantity: 1 });
        await fetchCart();
      } catch (err) {
        console.error('Failed to add to cart:', err);
        // Fallback to local
        dispatch({ type: 'ADD_ITEM', payload: product });
      }
    } else {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  }, [isLoggedIn, fetchCart]);

  const removeItem = useCallback(async (id) => {
    if (isLoggedIn) {
      const item = state.items.find(i => i.id === id);
      if (item?.cartItemId) {
        try {
          await api.delete(`/api/cart/items/${item.cartItemId}`);
          await fetchCart();
          return;
        } catch (err) {
          console.error('Failed to remove from cart:', err);
        }
      }
    }
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [isLoggedIn, state.items, fetchCart]);

  const updateQty = useCallback(async (id, qty) => {
    if (qty < 1) return removeItem(id);
    if (isLoggedIn) {
      const item = state.items.find(i => i.id === id);
      if (item?.cartItemId) {
        try {
          await api.put(`/api/cart/items/${item.cartItemId}?quantity=${qty}`);
          await fetchCart();
          return;
        } catch (err) {
          console.error('Failed to update cart:', err);
        }
      }
    }
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  }, [isLoggedIn, state.items, fetchCart, removeItem]);

  const clearCart = useCallback(async () => {
    if (isLoggedIn) {
      try {
        await api.delete('/api/cart');
        dispatch({ type: 'CLEAR_CART' });
        return;
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
    }
    dispatch({ type: 'CLEAR_CART' });
  }, [isLoggedIn]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);
  const isInCart = (id) => state.items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{
      items: state.items, total, count, addItem, removeItem, updateQty,
      clearCart, isInCart, loading: state.loading, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
