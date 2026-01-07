"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

const getNavItems = (pathname) => {
  const isAuthenticatedPage = pathname.startsWith('/dashboard') || 
                              pathname.startsWith('/ai-check') || 
                              pathname.startsWith('/consult') || 
                              pathname.startsWith('/health-id') || 
                              pathname.startsWith('/ungal-nalam');
  
  if (isAuthenticatedPage) {
    return [
      { label: "Home", href: "/dashboard" },
      { label: "Ungal Nalam", href: "/ungal-nalam" },
      { label: "AI Check", href: "/ai-check", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg> },
      { label: "Consult", href: "/consult", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg> },
      { label: "Health ID", href: "/health-id", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd"/></svg> },
    ];
  }
  
  return [
    { label: "Home", href: "/" },
    { label: "Ungal Nalam", href: "/ungal-nalam" },
    { label: "AI Check", href: "/ai-check", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg> },
    { label: "Consult", href: "/consult", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg> },
    { label: "Health ID", href: "/health-id", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd"/></svg> },
  ];
};

export default function PillNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(pathname);
  const isAuthenticatedPage = pathname.startsWith('/dashboard') || 
                              pathname.startsWith('/ai-check') || 
                              pathname.startsWith('/consult') || 
                              pathname.startsWith('/health-id') || 
                              pathname.startsWith('/ungal-nalam');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3">
        {/* Logo - Only show on non-authenticated pages */}
        {!isAuthenticatedPage && (
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-green-200"
            >
              <span className="text-xl font-bold text-green-600">M</span>
            </motion.div>
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center bg-white/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-green-100">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 mx-1 rounded-full text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 flex items-center gap-2"
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                {item.label}
              </motion.div>
            </Link>
          ))}
          {!isAuthenticatedPage && (
            <Link href="/auth">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Get Started
              </motion.div>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-green-200"
        >
          <motion.div
            animate={{ rotate: isMobileOpen ? 45 : 0 }}
            className="w-5 h-5 flex flex-col justify-center items-center"
          >
            <motion.span
              animate={{
                rotate: isMobileOpen ? 45 : 0,
                y: isMobileOpen ? 1 : -2,
              }}
              className="w-4 h-0.5 bg-green-600 rounded-full"
            />
            <motion.span
              animate={{
                rotate: isMobileOpen ? -45 : 0,
                y: isMobileOpen ? -1 : 2,
              }}
              className="w-4 h-0.5 bg-green-600 rounded-full"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{
          opacity: isMobileOpen ? 1 : 0,
          scale: isMobileOpen ? 1 : 0.95,
          y: isMobileOpen ? 0 : -10,
        }}
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-green-100 p-4 ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
          {!isAuthenticatedPage && (
            <Link href="/auth">
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileOpen(false)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold text-center transition-colors"
              >
                Get Started
              </motion.div>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}