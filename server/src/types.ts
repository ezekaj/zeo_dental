export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  language?: 'sq' | 'en';
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ChatResponse {
  response: string;
  error?: string;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  honeypot?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: {
    id: string;
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    status: string;
  };
  error?: string;
}

export interface Booking {
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
  cancellation_reason: string | null;
  confirmed_by: string | null;
  confirmed_at: Date | null;
  whatsapp_sent: boolean;
  confirmation_email_sent: boolean;
  created_at: Date;
  updated_at: Date;
}

// Receptionist Dashboard Types
export interface LoginRequest {
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface BookingFilters {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  date_from?: string;
  date_to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface BookingsListResponse {
  success: boolean;
  bookings: Booking[];
  total: number;
  pending_count: number;
}

export interface ConfirmBookingRequest {
  confirmed_date: string;
  confirmed_time: string;
  send_whatsapp: boolean;
  send_email: boolean;
  notes?: string;
}

export interface CancelBookingRequest {
  reason?: string;
  notify_patient: boolean;
}

export interface DashboardStats {
  pending_count: number;
  today_count: number;
  week_count: number;
  confirmed_today: number;
}
