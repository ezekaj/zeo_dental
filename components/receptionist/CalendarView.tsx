import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { StatusBadge } from './StatusBadge';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  confirmed_date: string | null;
  confirmed_time: string | null;
}

interface CalendarViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const DAYS_OF_WEEK = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  sq: ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
};

const MONTHS = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  sq: [
    'Janar',
    'Shkurt',
    'Mars',
    'Prill',
    'Maj',
    'Qershor',
    'Korrik',
    'Gusht',
    'Shtator',
    'Tetor',
    'Nëntor',
    'Dhjetor',
  ],
};

export const CalendarView: React.FC<CalendarViewProps> = ({ bookings, onSelectBooking }) => {
  const { language } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar grid
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDayOfMonth, daysInMonth]);

  // Group bookings by date
  const bookingsByDate = useMemo(() => {
    const grouped: Record<string, Booking[]> = {};

    bookings.forEach(booking => {
      // Use confirmed date if available, otherwise preferred date
      const dateStr = booking.confirmed_date || booking.preferred_date;
      if (dateStr) {
        // Extract just the date part (YYYY-MM-DD)
        const normalizedDate = dateStr.split('T')[0];
        if (!grouped[normalizedDate]) {
          grouped[normalizedDate] = [];
        }
        grouped[normalizedDate].push(booking);
      }
    });

    return grouped;
  }, [bookings]);

  // Get bookings for a specific day
  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookingsByDate[dateStr] || [];
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDate(todayStr);
  };

  // Check if a day is today
  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  // Handle day click
  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  // Get selected date bookings
  const selectedDateBookings = selectedDate ? bookingsByDate[selectedDate] || [] : [];

  const lang = language as 'en' | 'sq';

  return (
    <div className="bg-white border border-gray-100">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-serif text-xl">
            {MONTHS[lang][month]} {year}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="text-xs uppercase tracking-ultra text-studio-gold hover:text-studio-black transition-colors"
        >
          {language === 'sq' ? 'Sot' : 'Today'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK[lang].map(day => (
              <div
                key={day}
                className="text-center text-xs uppercase tracking-ultra text-studio-gray py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-20" />;
              }

              const dayBookings = getBookingsForDay(day);
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              const hasPending = dayBookings.some(b => b.status === 'pending');
              const hasConfirmed = dayBookings.some(b => b.status === 'confirmed');

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`h-20 p-1 border rounded transition-all text-left ${
                    isToday(day)
                      ? 'border-studio-gold bg-studio-gold/5'
                      : isSelected
                        ? 'border-studio-black bg-gray-50'
                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`text-sm mb-1 ${isToday(day) ? 'font-bold text-studio-gold' : ''}`}
                  >
                    {day}
                  </div>
                  {dayBookings.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                      {dayBookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className={`text-[10px] px-1 py-0.5 rounded truncate ${
                            booking.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {booking.name.split(' ')[0]}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-[10px] text-studio-gray">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day bookings panel */}
        {selectedDate && (
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-100 p-4">
            <h3 className="font-serif text-lg mb-4">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString(
                language === 'sq' ? 'sq-AL' : 'en-US',
                {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </h3>

            {selectedDateBookings.length === 0 ? (
              <p className="text-studio-gray text-sm">
                {language === 'sq' ? 'Nuk ka takime për këtë ditë' : 'No appointments for this day'}
              </p>
            ) : (
              <div className="space-y-3">
                {selectedDateBookings.map(booking => (
                  <button
                    key={booking.id}
                    onClick={() => onSelectBooking(booking)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-studio-gray" />
                        <span className="font-medium text-sm">{booking.name}</span>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-studio-gray">
                      <Clock className="w-3 h-3" />
                      <span>{booking.confirmed_time || booking.preferred_time}</span>
                    </div>
                    <div className="text-xs text-studio-gray mt-1">{booking.service}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
