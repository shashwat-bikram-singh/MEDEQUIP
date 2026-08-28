import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import api, { getProductImageUrl } from '../api/client';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const { isLoggedIn } = useAuth();

  // Fetch wishlist from backend when logged in
  const fetchWishlist = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await api.get('/api/wishlist');
      const backendItems = (response.data || []).map(item => {
        const catName = item.product?.category?.name || item.product?.categoryName || '';
        return {
          id: item.product?.id || item.productId,
          name: item.product?.name || '',
          price: item.product?.discountPrice || item.product?.price || 0,
          originalPrice: item.product?.price || 0,
          image: getProductImageUrl(item.product?.imageUrl, item.product?.image),
          category: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          categoryName: catName,
          rating: item.product?.rating || 0,
          reviews: item.product?.reviewCount || 0,
          stock: item.product?.stock > 0 ? 'In Stock' : 'Out of Stock',
          currency: 'NPR',
        };
      });
      setItems(backendItems);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      // Load from localStorage for guests
      try {
        const saved = localStorage.getItem('medequip_guest_wishlist');
        if (saved) setItems(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, [isLoggedIn, fetchWishlist]);

  // Persist guest wishlist
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('medequip_guest_wishlist', JSON.stringify(items));
    }
  }, [items, isLoggedIn]);

  const toggle = useCallback(async (product) => {
    const exists = items.some(i => i.id === product.id);
    if (isLoggedIn) {
      try {
        if (exists) {
          await api.delete(`/api/wishlist/${product.id}`);
        } else {
          await api.post(`/api/wishlist/${product.id}`);
        }
        await fetchWishlist();
        return;
      } catch (err) {
        console.error('Failed to toggle wishlist:', err);
      }
    }
    // Fallback to local
    setItems(prev =>
      exists ? prev.filter(i => i.id !== product.id) : [...prev, product]
    );
  }, [items, isLoggedIn, fetchWishlist]);

  const isWishlisted = (id) => items.some(i => i.id === id);
  const remove = useCallback(async (id) => {
    if (isLoggedIn) {
      try {
        await api.delete(`/api/wishlist/${id}`);
        await fetchWishlist();
        return;
      } catch (err) {
        console.error('Failed to remove from wishlist:', err);
      }
    }
    setItems(prev => prev.filter(i => i.id !== id));
  }, [isLoggedIn, fetchWishlist]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, remove, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
