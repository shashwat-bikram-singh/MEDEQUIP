import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-bold text-primary-100 mb-4 select-none">404</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/products" className="btn-outline">Browse Products</Link>
      </div>
    </div>
  );
}
