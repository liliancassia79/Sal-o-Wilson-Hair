import { useState } from "react";
import { DarkHeader } from "./components/DarkHeader";
import { DarkHero } from "./components/DarkHero";
import { DarkServices } from "./components/DarkServices";
import { DarkGallery } from "./components/DarkGallery";
import { DarkContact } from "./components/DarkContact";
import { DarkReviews } from "./components/DarkReviews";
import { DarkFooter } from "./components/DarkFooter";
import { BookingFlow } from "./components/BookingFlow";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

export default function App() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <DarkHeader onBookNow={() => setShowBooking(true)} />
      <main>
        <DarkHero onBookNow={() => setShowBooking(true)} />
        <DarkServices />
        <DarkReviews />
        <DarkGallery />
        <DarkContact />
      </main>
      <DarkFooter />
      <WhatsAppFloat />

      {showBooking && <BookingFlow onClose={() => setShowBooking(false)} />}
    </div>
  );
}
