"use client";
import React, { useState } from "react";
import Link from "next/link";

const NAV_BG = "bg-[#102040]"; // donkerblauw

export function Navbar({ logoUrl }: { logoUrl?: string }) {

  const [mobileMenu, setMobileMenu] = useState(false);

  // Menu items
  const menu = [
    {
      label: "Over ons",
      key: "overons",
      items: [
        { href: "/over", label: "Wie zijn wij" },
        { href: "/bestuur", label: "Bestuur" },
        { href: "/geschiedenis", label: "Geschiedenis" },
      ],
    },
    {
      label: "Klimmen",
      key: "klimmen",
      items: [
        { href: "/boulderen", label: "Boulderen" },
        { href: "/sportklimmen", label: "Sportklimmen" },
        { href: "/training", label: "Training" },
      ],
    },
    {
      label: "Alpinisme",
      key: "alpinisme",
      items: [
        { href: "/alpinisme", label: "Wat is alpinisme?" },
        { href: "/cursussen", label: "Cursussen" },
        { href: "/tochten", label: "Tochten" },
      ],
    },
  ];

  return (
    <nav className={`${NAV_BG} text-white px-4 py-2 flex items-center justify-between shadow-md relative`}>
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <img src={logoUrl} alt="RSAC Logo" className="h-10 w-auto" />
          ) : (
            <span className="font-bold text-xl">RSAC</span>
          )}
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 ml-8">
          {menu.map((dropdown) => (
            <div className="relative group" key={dropdown.key}>
              <button
                className="flex items-center gap-1 hover:bg-blue-900 px-2 py-1 rounded transition"
                type="button"
              >
                {dropdown.label}
                <span className="ml-1 text-xs">&#9662;</span>
              </button>
              <div
                className="absolute left-0 w-48 bg-white text-black rounded-lg shadow-xl z-20 transition hidden group-hover:block"
              >
                {dropdown.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-blue-100 rounded transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Rechts: socials, signup, language, hamburger */}
      <div className="flex items-center gap-4">
        {/* Socials */}
        <a href="https://instagram.com/rsac" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-6 h-6 fill-current hover:text-pink-400 transition" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.78.312 4.01.54a7.07 7.07 0 0 0-2.54 1.63A7.07 7.07 0 0 0 .54 4.01C.312 4.78.128 5.77.07 7.052.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.272.47 3.042a7.07 7.07 0 0 0 1.63 2.54 7.07 7.07 0 0 0 2.54 1.63c.77.228 1.76.412 3.042.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.272-.242 3.042-.47a7.07 7.07 0 0 0 2.54-1.63 7.07 7.07 0 0 0 1.63-2.54c.228-.77.412-1.76.47-3.042.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.242-2.272-.47-3.042a7.07 7.07 0 0 0-1.63-2.54A7.07 7.07 0 0 0 19.99.54c-.77-.228-1.76-.412-3.042-.47C15.668.012 15.264 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
        </a>
        
        {/* Sign up knop */}
        <Link
          href="/signup"
          className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-full text-white font-bold shadow transition"
        >
          Sign up
        </Link>
        {/* Language select */}
        <select className="ml-4 bg-[#102040] border border-blue-900 rounded px-2 py-1 text-white">
          <option value="nl">NL</option>
          <option value="en">EN</option>
        </select>
        {/* Hamburger menu */}
        <button
          className="ml-4 md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMobileMenu((v) => !v)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1 rounded transition" />
          <span className="block w-6 h-0.5 bg-white mb-1 rounded transition" />
          <span className="block w-6 h-0.5 bg-white rounded transition" />
        </button>
      </div>
      {/* Mobile menu overlay */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              className="text-white text-3xl"
              onClick={() => setMobileMenu(false)}
              aria-label="Sluit menu"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 mt-8">
            {menu.map((dropdown) => (
              <div key={dropdown.key} className="w-full">
                <span className="block text-lg font-semibold mb-2">{dropdown.label}</span>
                <div className="flex flex-col gap-2">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 rounded hover:bg-blue-900 transition text-white text-center"
                      onClick={() => setMobileMenu(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/signup"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-full text-white font-bold shadow transition"
              onClick={() => setMobileMenu(false)}
            >
              Sign up
            </Link>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/rsac" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="w-7 h-7 fill-current hover:text-pink-400 transition" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.78.312 4.01.54a7.07 7.07 0 0 0-2.54 1.63A7.07 7.07 0 0 0 .54 4.01C.312 4.78.128 5.77.07 7.052.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.272.47 3.042a7.07 7.07 0 0 0 1.63 2.54 7.07 7.07 0 0 0 2.54 1.63c.77.228 1.76.412 3.042.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.272-.242 3.042-.47a7.07 7.07 0 0 0 2.54-1.63 7.07 7.07 0 0 0 1.63-2.54c.228-.77.412-1.76.47-3.042.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.242-2.272-.47-3.042a7.07 7.07 0 0 0-1.63-2.54A7.07 7.07 0 0 0 19.99.54c-.77-.228-1.76-.412-3.042-.47C15.668.012 15.264 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="https://facebook.com/rsac" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-7 h-7 fill-current hover:text-blue-400 transition" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
            </div>
            <select className="bg-[#102040] border border-blue-900 rounded px-2 py-1 text-white">
              <option value="nl">NL</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}