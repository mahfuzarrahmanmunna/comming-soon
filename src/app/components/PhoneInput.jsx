"use client";

import { useState, useEffect, useRef } from "react";

export default function PhoneInput({ value, onChange }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2",
        );
        const data = await response.json();

        const formattedCountries = data
          .map((country) => {
            let dialCode = "";
            if (country.idd && country.idd.root) {
              dialCode = country.idd.root;
              if (country.idd.suffixes && country.idd.suffixes.length > 0)
                dialCode += country.idd.suffixes[0];
            }
            return {
              name: country.name.common,
              code: country.cca2,
              dial_code: dialCode,
              flag: country.flags.svg || country.flags.png,
            };
          })
          .filter((c) => c.dial_code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);

        // Default to Bangladesh
        const bd = formattedCountries.find((c) => c.code === "BD");
        if (bd) setSelectedCountry(bd);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.dial_code.includes(search),
  );

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // Focus back on the phone input for better UX
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative w-full z-20" ref={dropdownRef}>
      {/* Main Input Container - Matches the "Notify Me" button style */}
      <div
        className={`
        flex items-center w-full 
        bg-white border-4 border-brand-blue rounded-full 
        shadow-[0_6px_0_0_#214187] transition-all duration-200
        h-[60px] md:h-[72px] overflow-visible
        focus-within:ring-4 focus-within:ring-brand-yellow/50 focus-within:translate-y-[2px] focus-within:shadow-[0_4px_0_0_#214187]
        ${isOpen ? "translate-y-[2px] shadow-[0_4px_0_0_#214187] ring-4 ring-brand-yellow/50" : ""}
      `}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-full flex items-center gap-2 pl-4 pr-3 border-r-2 border-brand-blue/20 hover:bg-blue-50/50 transition-colors focus:outline-none min-w-[120px] rounded-l-full"
        >
          {selectedCountry ? (
            <>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.code}
                className="w-6 h-4.5 object-cover rounded-sm shadow-sm"
              />
              <span className="text-brand-blue font-bold text-base leading-none">
                {selectedCountry.dial_code}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-brand-blue ml-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>

        {/* Phone Number Input */}
        <input
          ref={inputRef}
          type="tel"
          placeholder="1XX-XXX-XXXX"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent text-brand-blue placeholder-brand-blue/30 px-4 py-3 focus:outline-none font-body text-lg md:text-xl tracking-wide rounded-r-full"
        />
      </div>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 z-50 mt-3 w-full bg-white/95 backdrop-blur-md border-4 border-brand-blue rounded-3xl shadow-2xl z-50 max-h-[320px] overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Header */}
          <div className="p-3 border-b border-brand-blue/10 bg-blue-50/30">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search country..."
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-brand-blue/20 rounded-xl focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 text-brand-blue placeholder-brand-blue/40 font-body text-sm transition-all"
              />
            </div>
          </div>

          {/* Scrollable List */}
          <div className="overflow-y-auto p-2 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                    hover:bg-brand-yellow/20 group
                  `}
                >
                  <img
                    src={country.flag}
                    alt={country.code}
                    className="w-6 h-4.5 object-cover rounded-sm shadow-sm group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium text-brand-blue text-sm flex-1">
                    {country.name}
                  </span>
                  <span className="font-bold text-brand-pink text-sm opacity-80 bg-pink-50 px-2 py-0.5 rounded-md group-hover:bg-brand-pink group-hover:text-white transition-colors">
                    {country.dial_code}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-brand-blue/40">
                <svg
                  className="w-12 h-12 mb-2 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm font-medium">No countries found</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(33, 65, 135, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(33, 65, 135, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(243, 6, 110, 0.3);
        }
      `}</style>
    </div>
  );
}
