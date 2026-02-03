/**
 * FILE LOCATION: app/layout.tsx
 *
 * Root layout for the entire application
 * REPLACE your existing app/layout.tsx with this file
 *
 * This file includes:
 * - Paystack script injection
 * - Navigation header
 * - Footer
 * - Global styling setup
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Book Store - Digital Books Collection",
  description: "Purchase and download premium e-books instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="text-xl font-bold text-gray-900">
                  E-Book Store
                </span>
              </a>
              <div className="text-sm text-gray-600">Premium Digital Books</div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen bg-gray-50">{children}</main>

        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2024 E-Book Store. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Secure payments powered by Paystack
            </p>
          </div>
        </footer>

        {/* Paystack Inline JS */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
