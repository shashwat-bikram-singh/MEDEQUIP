import axios from 'axios';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

/**
 * Resolves a product image into a displayable URL, prioritizing:
 * 1. Full image URL from backend (imageUrl)
 * 2. Absolute URL (http/https)
 * 3. Relative backend uploads path (/api/images/products/)
 * 4. Safe fallback placeholder
 */
export const getProductImageUrl = (imageUrl, image) => {
  if (imageUrl && imageUrl.trim()) return imageUrl;
  if (image && typeof image === 'string') {
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
      return image;
    }
    return `${API_BASE_URL}/api/images/products/${image}`;
  }
  return 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop';
};

/**
 * Axios instance pre-configured with:
 * - Base URL pointing to the Spring Boot backend
 * - Automatic JWT Authorization header injection
 * - 401 response interception (auto-logout on expired token)
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medequip_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('medequip_token');
      localStorage.removeItem('medequip_user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
