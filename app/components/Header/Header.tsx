"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  bhojpuriArtists,
  bhojpuriCollections,
  getArtistHref,
} from "../../data/bhojpuriCatalog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBhojpuriOpen, setIsBhojpuriOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isBhojpuriOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsBhojpuriOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isBhojpuriOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Player", href: "/player" },
    { name: "Singers", href: "/singers" },
    { name: "Bollywood", href: "/bollywood" },
    { name: "Punjabi", href: "/punjabi" },
    { name: "Indipop", href: "/indipop" },
    { name: "Haryanvi", href: "/haryanvi" },
    { name: "Bhojpuri", href: "/bhojpuri" },
  ];

  const mobileNavigation = (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[9998] bg-gray-950/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-y-0 left-0 z-[9999] flex w-[min(20rem,85vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close menu"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <svg
              className="h-6 w-6"
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
          </button>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Bhojpuri collections
            </p>
            <div className="mt-2 space-y-1">
              {bhojpuriCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.href}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Top singers
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {bhojpuriArtists.map((artist) => (
                <Link
                  key={artist}
                  href={getArtistHref(artist)}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {artist}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
              🎶
            </span>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              Mp3 Player{" "}
              <span className="text-indigo-600">By Dj MIX</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.name === "Bhojpuri" ? (
                <div key={link.name} className="flex items-center">
                  <Link
                    href={link.href}
                    className="relative rounded-l-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle Bhojpuri mega menu"
                    aria-expanded={isBhojpuriOpen}
                    aria-controls="bhojpuri-mega-menu"
                    onClick={() => setIsBhojpuriOpen((open) => !open)}
                    className="rounded-r-lg px-2 py-2 text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        isBhojpuriOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors duration-200 shadow-sm">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              // X icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isBhojpuriOpen && (
        <div
          id="bhojpuri-mega-menu"
          className="absolute left-1/2 top-full z-50 hidden w-[min(58rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl md:block"
        >
          <div className="grid gap-8 md:grid-cols-[1.1fr_1.1fr_1.5fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Bhojpuri music
              </p>
              <Link
                href="/bhojpuri"
                onClick={() => setIsBhojpuriOpen(false)}
                className="mt-3 block text-lg font-bold text-gray-900 hover:text-indigo-600"
              >
                Browse all Bhojpuri songs
              </Link>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find regional favorites, festival music, and popular singers.
              </p>
              <Link
                href="/bhojpuri#tracks"
                onClick={() => setIsBhojpuriOpen(false)}
                className="mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Open music player <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Festival &amp; DJ songs
              </h2>
              <ul className="mt-3 space-y-1">
                {bhojpuriCollections.map((collection) => (
                  <li key={collection.id}>
                    <Link
                      href={collection.href}
                      onClick={() => setIsBhojpuriOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <span aria-hidden="true">{collection.icon}</span>
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Top artists &amp; singers
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-1">
                {bhojpuriArtists.map((artist) => (
                  <li key={artist}>
                    <Link
                      href={getArtistHref(artist)}
                      onClick={() => setIsBhojpuriOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {artist}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Render outside the sticky header so the drawer is not trapped by its stacking context. */}
      {isMounted && createPortal(mobileNavigation, document.body)}
    </header>
  );
};

export default Header;