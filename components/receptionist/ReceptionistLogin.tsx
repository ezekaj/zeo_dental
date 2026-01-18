import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface ReceptionistLoginProps {
  onLogin: (token: string) => void;
}

export const ReceptionistLogin: React.FC<ReceptionistLoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/receptionist/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        onLogin(data.token);
      } else {
        setError(t('receptionist.login.error'));
      }
    } catch (err) {
      setError(t('receptionist.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-white">
            ZEO<span className="text-studio-gold">.</span>
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-ultra mt-4">
            {t('receptionist.login.title')}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-white/40 text-xs uppercase tracking-ultra block mb-3">
              {t('receptionist.login.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-studio-gold transition-colors"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border border-white/20 py-4 text-white text-xs uppercase tracking-ultra hover:bg-white hover:text-studio-black transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? '...' : t('receptionist.login.submit')}
          </button>
        </form>

        {/* Back to site link */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="text-white/40 text-xs uppercase tracking-ultra hover:text-studio-gold transition-colors"
          >
            ← {t('receptionist.login.backToSite')}
          </a>
        </div>
      </div>
    </div>
  );
};
