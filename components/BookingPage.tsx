import React from 'react';
import { Header } from './Header';
import { Booking } from './Booking';
import { ChatWidget } from './ChatWidget';
import { WhatsAppButton } from './WhatsAppButton';

export const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Booking />
      </main>
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default BookingPage;
