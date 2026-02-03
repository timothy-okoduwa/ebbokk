/**
 * FILE LOCATION: app/checkout/page.tsx
 *
 * Checkout page with Paystack payment integration
 * CREATE this file in a new directory: app/checkout/
 *
 * Features:
 * - Order summary
 * - Email input
 * - Paystack payment button
 * - Prevents re-purchase of already owned books
 */

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBookById, formatPrice } from "@/lib/books";
import { isPurchased } from "@/lib/payment";
import { Book } from "@/types";
import PaystackButton from "@/components/PaystackButton";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("bookId");

  const [book, setBook] = useState<Book | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) {
      router.push("/");
      return;
    }

    const foundBook = getBookById(bookId);
    if (!foundBook) {
      router.push("/");
      return;
    }

    // Check if already purchased
    if (isPurchased(bookId)) {
      router.push(`/books/${bookId}`);
      return;
    }

    setBook(foundBook);
    setLoading(false);
  }, [bookId, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href={`/books/${book.id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Book
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Complete Your Purchase
        </h1>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="flex items-start gap-4 mb-4 pb-4 border-b">
            <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center text-2xl">
              📚
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">
                {formatPrice(book.price)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-blue-600">{formatPrice(book.price)}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Information
          </h2>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              We'll send your receipt and download link to this email.
            </p>
          </div>

          <PaystackButton book={book} email={email} />

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure payment powered by Paystack
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
        <div>
          <div className="text-2xl mb-1">🔒</div>
          <div>Secure Payment</div>
        </div>
        <div>
          <div className="text-2xl mb-1">⚡</div>
          <div>Instant Access</div>
        </div>
        <div>
          <div className="text-2xl mb-1">💯</div>
          <div>Money Back Guarantee</div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
