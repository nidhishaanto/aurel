import React, { useEffect, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode, onNavigate }) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, signup, user } = useAuth();

  React.useEffect(() => {
    setMode(initialMode);
    setError('');
  }, [initialMode]);

  useEffect(() => {
    if (user) onNavigate('home');
  }, [user, onNavigate]);

  if (user) return null;

  const isSignup = mode === 'signup';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = isSignup
      ? await signup(name, email, password)
      : await login(email, password);

    setSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Something went wrong.');
      return;
    }

    onNavigate('home');
  };

  return (
    <section className="min-h-[72vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <button
          onClick={() => onNavigate('home')}
          className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#78746D] hover:text-[#1A1917]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Aurel
        </button>

        <div className="bg-white border border-[#E8E3D8] p-7 sm:p-9 shadow-sm">
          <div className="text-center mb-8">
            <span className="font-serif text-3xl tracking-[0.2em] font-semibold">AUREL</span>
            <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-[#78746D]">
              {isSignup ? 'Create your client account' : 'Client account'}
            </p>
          </div>

          <div className="grid grid-cols-2 border-b border-[#E8E3D8] mb-7">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-3 text-xs uppercase tracking-[0.15em] ${!isSignup ? 'text-[#5E1924] border-b-2 border-[#5E1924] font-semibold' : 'text-[#78746D]'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`py-3 text-xs uppercase tracking-[0.15em] ${isSignup ? 'text-[#5E1924] border-b-2 border-[#5E1924] font-semibold' : 'text-[#78746D]'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1.5">Full Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-3 text-sm outline-none focus:border-[#5E1924]"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1.5">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-3 text-sm outline-none focus:border-[#5E1924]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#5C5852] block mb-1.5">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-3 pr-11 text-sm outline-none focus:border-[#5E1924]"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78746D]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#5E1924] hover:bg-[#45121A] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSignup ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {submitting ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-[11px] text-[#8C877E] text-center mt-6 leading-relaxed">
            Your account is stored locally in Aurel's SQLite database when running this project.
          </p>
        </div>
      </div>
    </section>
  );
};
