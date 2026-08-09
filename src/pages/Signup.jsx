import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill all required fields');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(form.firstName, form.lastName, form.email, form.phone, form.password);
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors && typeof data.errors === 'object') {
        setFieldErrors(data.errors);
        setError('Please fix the errors below');
      } else {
        setError(data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'firstName', label: 'First Name', icon: <User size={16} />, type: 'text', placeholder: 'John', required: true },
    { key: 'lastName', label: 'Last Name', icon: <User size={16} />, type: 'text', placeholder: 'Doe', required: true },
    { key: 'email', label: 'Email Address', icon: <Mail size={16} />, type: 'email', placeholder: 'doctor@hospital.com', required: true },
    { key: 'phone', label: 'Phone Number', icon: <Phone size={16} />, type: 'tel', placeholder: '+977 9876543210', required: false },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-primary-50 to-white">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center mb-3">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">AIDOXY</span>
              <span className="text-xs font-semibold text-primary-600 tracking-widest uppercase">Healthcare Pvt. Ltd.</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
            <p className="text-slate-500 text-sm mt-1">Join Aidoxy Healthcare — Your Partner in Better Health</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {f.label} {f.required && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{f.icon}</div>
                  <input
                    type={f.type} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className={`input-field pl-9 ${fieldErrors[f.key] ? 'border-red-400 ring-1 ring-red-200' : ''}`}
                    required={f.required}
                    disabled={loading}
                  />
                </div>
                {fieldErrors[f.key] && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors[f.key]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={show ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 chars, upper+lower+digit"
                  className={`input-field pl-9 pr-10 ${fieldErrors.password ? 'border-red-400 ring-1 ring-red-200' : ''}`}
                  required
                  disabled={loading}
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
              )}
              <p className="text-xs text-slate-400 mt-1">Must contain uppercase, lowercase, and a digit</p>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" required className="accent-primary-600 mt-0.5 flex-shrink-0" />
              I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base rounded-2xl justify-center disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Creating Account...</span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
