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
  created_at: Date;
  updated_at: Date;
}
