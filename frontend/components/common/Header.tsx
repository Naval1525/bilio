"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1 className="text-4xl font-sans font-bold">Bilio</h1>
          </Link>


          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center space-x-12 ml-24">
            <Link
              href="/About"
              className="text-lg font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/Contact"
              className="text-lg font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </nav>


          {/* Right Side - Button and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2.5 text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Join Waitlist
            </button>


            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
