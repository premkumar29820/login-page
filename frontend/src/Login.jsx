import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api.js';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear the field-specific error as the user types
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) {
      errors.email = 'Please enter a valid email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.password.trim()) {
      errors.password = 'Your password must contain between 4 and 60 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await loginUser(form.email, form.password);
      if (data.success) {
        onLoginSuccess(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please try again later.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-netflixBlack overflow-hidden">
      {/* dark cinematic gradient backdrop, in place of a licensed background photo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3a0a0a_0%,_#000000_70%)]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* header */}
      <header className="relative z-10 px-6 py-4 md:px-12">
        <h1 className="text-red-500 text-3xl md:text-4xl font-extrabold tracking-tight">
          CLONEFLIX
        </h1>
      </header>

      {/* login card */}
      <main className="relative z-10 flex justify-center px-4 pb-24 pt-4 md:pt-10">
        <div className="w-full max-w-md rounded bg-black/75 p-8 md:p-16 md:pt-12">
          <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">Sign In</h2>

          {serverError && (
            <div className="mb-4 rounded bg-orange-500/90 px-4 py-3 text-sm text-white">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email or phone number"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded border bg-[#333] px-4 py-3.5 text-white placeholder-gray-400 outline-none focus:bg-[#454545] ${
                  fieldErrors.email ? 'border-orange-500' : 'border-transparent'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-orange-500">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded border bg-[#333] px-4 py-3.5 text-white placeholder-gray-400 outline-none focus:bg-[#454545] ${
                  fieldErrors.password ? 'border-orange-500' : 'border-transparent'
                }`}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-orange-500">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-netflixRed py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-xs text-gray-400">
              Demo credentials: <span className="text-gray-300">test@netflix.com / password123</span>
            </p>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-gray-500" />
              Remember me
            </label>
            <a href="/help" className="hover:underline">
              Need help?
            </a>
          </div>

          <p className="mt-6 text-gray-400">
            New here?{' '}
            <a href="/Signup" className="text-white hover:underline">
              Sign up now
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
