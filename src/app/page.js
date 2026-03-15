"use client";

import { useState, useEffect } from "react";
import { fredoka } from "./fonts";
import PhoneInput from "./components/PhoneInput";
import Image from "next/image";
import { Youtube } from "lucide-react";
// import logo from "./assets";

export default function Home() {
  // --- State Management ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phone, setPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Countdown Logic ---
  useEffect(() => {
    const countDownDate = new Date().getTime() + 14 * 24 * 60 * 60 * 1000; // 14 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- Form Handler ---
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (phone.length < 5) {
      alert("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    // Simulation: Here you would send the phone number to your email API
    // Example: await fetch('/api/send-email', { body: JSON.stringify({ phone }) })

    setTimeout(() => {
      setIsSubscribed(true);
      setPhone("");
      setLoading(false);
      setTimeout(() => setIsSubscribed(false), 4000);
    }, 1500);
  };

  return (
    <main className="bg-brand-pink text-brand-blue font-body min-h-screen flex flex-col relative overflow-x-hidden selection:bg-brand-yellow selection:text-brand-blue">
      {/* --- Background Decorative Elements (Exact Replication) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-blue opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-brand-blue opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#214187 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* --- Header --- */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col justify-center">
            <Image
              src="/logo1.png"
              alt="Chalak Champs Logo"
              width={500}
              height={200}
              className="h-8 md:h-28 w-auto object-contain"
              priority
            />
          </div>
        </div>

        <a
          href="https://www.lingualacademy.com.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-brand-blue font-semibold hover:text-white transition-colors bg-white/20 px-4 py-2 rounded-full border-2 border-transparent hover:border-white/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Visit Lingual Academy
        </a>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 relative z-10 py-12">
        {/* Hero Section */}
        <div>
          <div className="text-center  mb-12">
            <div className="inline-block mb-4 animate-bounce">
              <span className="bg-yellow-400 text-brand-blue font-display font-bold text-sm md:text-base px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                #1 Kids EdTech Platform
              </span>
            </div>

            {/* H1 Tag: Only one allowed per SEO rules */}
            <h1
              className={`font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 drop-shadow-lg ${fredoka.className}`}
            >
              Unleashing the <br />
              <span className="text-yellow-400">Genius</span> Inside.
            </h1>

            {/* H2 Tag: Subheading */}
            <h2 className="text-lg md:text-2xl text-white/90 font-light max-w-2xl  mx-auto mb-10 leading-relaxed">
              We are crafting a magical world of learning for your little ones.
              Get ready for <strong>Chalak Champs</strong>, the newest
              innovation from the creators of Lingual Academy.
            </h2>
          </div>
        </div>

        {/* Countdown Section */}
        <section
          aria-label="Countdown Timer"
          className="w-full max-w-5xl mx-auto mb-16"
        >
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-yellow/30 blob"></div>

            <h3
              className={`font-display font-bold text-2xl text-brand-blue text-center mb-8 relative z-10 ${fredoka.className}`}
            >
              Launching In
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center relative z-10">
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-4xl md:text-6xl text-brand-pink bg-blue-100 rounded-xl py-4 mb-2 ${fredoka.className}`}
                >
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Days
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-4xl md:text-6xl text-brand-pink bg-blue-100 rounded-xl py-4 mb-2 ${fredoka.className}`}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Hours
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-4xl md:text-6xl text-brand-pink bg-blue-100 rounded-xl py-4 mb-2 ${fredoka.className}`}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Minutes
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-4xl md:text-6xl text-brand-pink bg-blue-100 rounded-xl py-4 mb-2 ${fredoka.className}`}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Phone Number / Notify Section (Updated) */}
        <section className="w-full max-w-xl mx-auto text-center">
          <h3
            className={`font-display font-bold text-2xl md:text-3xl text-white mb-4 ${fredoka.className}`}
          >
            Do not Miss the Fun!
          </h3>
          <p className="text-white/80 mb-8">
            Join the waitlist and get exclusive early-bird access.
          </p>

          <form onSubmit={handlePhoneSubmit} className="relative group">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Custom Phone Input Component */}
              <div className="w-full">
                <PhoneInput value={phone} onChange={setPhone} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-brand-yellow text-brand-blue font-display font-bold text-lg px-8 py-4 h-[60px] md:h-[68px] rounded-full border-4 border-brand-blue shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                {loading ? "Sending..." : "Notify Me"}
              </button>
            </div>

            {/* Success Message (Hidden by default) */}
            {isSubscribed && (
              <div className="absolute top-full left-0 w-full mt-4 p-4 bg-white rounded-xl border-2 border-brand-blue shadow-xl transform transition-all duration-500 z-20 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-center gap-3 text-brand-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-bold">
                    You are on the list, Champ! 🚀
                  </span>
                </div>
              </div>
            )}
          </form>
        </section>
      </main>

      <footer className="glass-panel w-full py-10 text-center relative z-10 mt-auto">
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          {/* --- Facebook (Chalak Champs) --- */}
          <div className="group relative">
            <a
              href="https://www.facebook.com/chalakchampsbd/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,195,0,0.4)] hover:-translate-y-1"
              aria-label="Chalak Champs Facebook"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Chalak Champs
              </span>
              {/* Tiny Arrow for Tooltip */}
              <div className="w-2 h-2 bg-brand-blue rotate-45 mx-auto -mt-1"></div>
            </div>
          </div>

          {/* --- Facebook (Lingual Academy) --- */}
          <div className="group relative">
            <a
              href="https://www.facebook.com/lingualacademy.com.bd/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,195,0,0.4)] hover:-translate-y-1"
              aria-label="Lingual Academy Facebook"
              target="_blank"
            >
              {/* Using a slightly different shade or icon style? Let's keep consistent but rely on tooltip */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Lingual Academy
              </span>
              <div className="w-2 h-2 bg-brand-blue rotate-45 mx-auto -mt-1"></div>
            </div>
          </div>

          {/* --- YouTube (Chalak Champs) --- */}
          <div className="group relative">
            <a
              href="https://www.youtube.com/@lingualacademy"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,195,0,0.4)] hover:-translate-y-1"
              aria-label="Chalak Champs YouTube"
              target="_blank"
            >
              <Youtube />
            </a>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Lingual Academy
              </span>
              <div className="w-2 h-2 bg-brand-blue rotate-45 mx-auto -mt-1"></div>
            </div>
          </div>

          {/* --- LinkedIn (Lingual Academy) --- */}
          <div className="group relative">
            <a
              href="https://www.linkedin.com/company/lingual-academy/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,195,0,0.4)] hover:-translate-y-1"
              aria-label="Lingual Academy LinkedIn"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Lingual Academy
              </span>
              <div className="w-2 h-2 bg-brand-blue rotate-45 mx-auto -mt-1"></div>
            </div>
          </div>
        </div>

        {/* Copyright Text */}
        <p className="text-brand-blue font-bold text-sm opacity-90 tracking-wide">
          &copy; {new Date().getFullYear()} Chalak Champs. A Sister Company of
          &nbsp;
          <a
            href="https://www.lingualacademy.com.bd/"
            target="_blank"
            className="text-white hover:text-blue-300 transition-colors underline decoration-2 underline-offset-4"
          >
            Lingual Academy
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
