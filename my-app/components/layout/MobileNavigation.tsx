
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {createPortal} from 'react-dom'
interface MobileNavigationProps {
  navLinks: { label: string; href: string }[];
}

export function MobileNavigation({ navLinks }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on Esc key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className=" md:hidden ">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="inline-flex items-center  justify-center p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none  transition-colors"
      >
        <span className="sr-only">
          {isOpen ? "Close menu" : "Open menu"}
        </span>
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 top-16 z-100 flex flex-col bg-gray-50 backdrop-blur-3xl text-stone-100 p-6 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-4 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-lg text-black hover:text-white hover:bg-stone-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col gap-4">
            <Link
              href="/rental-enquiry"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition-colors text-base"
            >
              Request a Quote
            </Link>

            <div className="text-xs text-stone-400 mt-2 space-y-1">
              <p className="font-semibold text-stone-700">
                Central Equipment Depot
              </p>
              <p className="text-stone-700">Dispatch: (800) 555-RENT</p>
              <p className="text-stone-700">Yard Hours: Mon – Fri 6:30 AM – 5:00 PM</p>
            </div>
          </div>
        </div>,
         document.body
      )}
    </div>
  );
}
