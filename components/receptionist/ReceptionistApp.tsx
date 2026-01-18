import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ReceptionistLogin } from './ReceptionistLogin';
import { BookingCard } from './BookingCard';
import { BookingDetailModal } from './BookingDetailModal';
import { LogOut, RefreshCw, Search, Filter, Bell } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  notes: string | null;
  confirmed_date: string | null;
  confirmed_time: string | null;
  whatsapp_sent: boolean;
  confirmation_email_sent: boolean;
  created_at: string;
}

interface DashboardStats {
  pending_count: number;
  today_count: number;
  week_count: number;
  confirmed_today: number;
}

export const ReceptionistApp: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('receptionist_token')
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'confirm' | 'cancel'>('view');

  // Auth handlers
  const handleLogin = (newToken: string) => {
    sessionStorage.setItem('receptionist_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('receptionist_token');
    setToken(null);
  };

  // API helpers
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        handleLogout();
        throw new Error('Unauthorized');
      }

      return response;
    },
    [token]
  );

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetchWithAuth('/api/receptionist/stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [fetchWithAuth]);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetchWithAuth(`/api/receptionist/bookings?${params}`);
      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchWithAuth, statusFilter, searchQuery]);

  // Load data on mount and set up polling
  useEffect(() => {
    if (token) {
      fetchStats();
      fetchBookings();

      // Poll every 30 seconds for new bookings
      const interval = setInterval(() => {
        fetchStats();
        fetchBookings();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [token, fetchStats, fetchBookings]);

  // Refetch when filters change
  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [statusFilter, searchQuery, token, fetchBookings]);

  // Confirm booking handler
  const handleConfirmBooking = async (data: {
    confirmed_date: string;
    confirmed_time: string;
    send_whatsapp: boolean;
    send_email: boolean;
  }) => {
    if (!selectedBooking) return;

    const response = await fetchWithAuth(
      `/api/receptionist/bookings/${selectedBooking.id}/confirm`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      setSelectedBooking(null);
      fetchBookings();
      fetchStats();
    }
  };

  // Cancel booking handler
  const handleCancelBooking = async (data: { reason: string; notify_patient: boolean }) => {
    if (!selectedBooking) return;

    const response = await fetchWithAuth(
      `/api/receptionist/bookings/${selectedBooking.id}/cancel`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      setSelectedBooking(null);
      fetchBookings();
      fetchStats();
    }
  };

  // Show login if not authenticated
  if (!token) {
    return <ReceptionistLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <h1 className="font-serif text-2xl text-studio-black">
                ZEO<span className="text-studio-gold">.</span>
              </h1>
              <span className="hidden sm:block text-xs uppercase tracking-ultra text-studio-gray">
                {t('receptionist.title')}
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Pending notification */}
              {stats && stats.pending_count > 0 && (
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                  <Bell className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="text-xs font-semibold text-amber-700">
                    {stats.pending_count} {t('receptionist.header.pending')}
                  </span>
                </div>
              )}

              {/* Language toggle */}
              <button
                onClick={() => setLanguage(language === 'sq' ? 'en' : 'sq')}
                className="text-xs uppercase tracking-ultra text-studio-gray hover:text-studio-black transition-colors"
              >
                {language === 'sq' ? 'EN' : 'SQ'}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs uppercase tracking-ultra text-studio-gray hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('receptionist.header.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 border border-gray-100">
              <p className="text-xs uppercase tracking-ultra text-studio-gray mb-1">
                {t('receptionist.stats.pending')}
              </p>
              <p className="font-serif text-3xl text-studio-black">{stats.pending_count}</p>
            </div>
            <div className="bg-white p-5 border border-gray-100">
              <p className="text-xs uppercase tracking-ultra text-studio-gray mb-1">
                {t('receptionist.stats.today')}
              </p>
              <p className="font-serif text-3xl text-studio-black">{stats.today_count}</p>
            </div>
            <div className="bg-white p-5 border border-gray-100">
              <p className="text-xs uppercase tracking-ultra text-studio-gray mb-1">
                {t('receptionist.stats.thisWeek')}
              </p>
              <p className="font-serif text-3xl text-studio-black">{stats.week_count}</p>
            </div>
            <div className="bg-white p-5 border border-gray-100">
              <p className="text-xs uppercase tracking-ultra text-studio-gray mb-1">
                {t('receptionist.stats.confirmedToday')}
              </p>
              <p className="font-serif text-3xl text-studio-black">{stats.confirmed_today}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-studio-gray" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-studio-gold transition-colors"
            >
              <option value="">{t('receptionist.filters.all')}</option>
              <option value="pending">{t('receptionist.filters.pending')}</option>
              <option value="confirmed">{t('receptionist.filters.confirmed')}</option>
              <option value="cancelled">{t('receptionist.filters.cancelled')}</option>
              <option value="completed">{t('receptionist.filters.completed')}</option>
              <option value="no_show">{t('receptionist.filters.noShow')}</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 flex items-center gap-2">
            <Search className="w-4 h-4 text-studio-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('receptionist.filters.search')}
              className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-studio-gold transition-colors"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={() => {
              fetchStats();
              fetchBookings();
            }}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-ultra text-studio-gray hover:text-studio-black transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {t('receptionist.actions.refresh')}
          </button>
        </div>

        {/* Bookings Grid */}
        {isLoading && bookings.length === 0 ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-studio-gray animate-spin mx-auto mb-4" />
            <p className="text-studio-gray">{t('receptionist.loading')}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100">
            <p className="text-studio-gray">{t('receptionist.noBookings')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onView={b => {
                  setSelectedBooking(b);
                  setModalMode('view');
                }}
                onConfirm={b => {
                  setSelectedBooking(b);
                  setModalMode('confirm');
                }}
                onCancel={b => {
                  setSelectedBooking(b);
                  setModalMode('cancel');
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          mode={modalMode}
          onClose={() => setSelectedBooking(null)}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default ReceptionistApp;
