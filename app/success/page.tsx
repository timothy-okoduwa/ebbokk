/**
 * FILE LOCATION: app/success/page.tsx
 *
 * Payment success page
 * CREATE this file in a new directory: app/success/
 *
 * Shows:
 * - Success message
 * - Transaction details
 * - Download button
 * - Purchase receipt
 */

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBookById } from "@/lib/books";
import { getPurchaseByBookId } from "@/lib/payment";
import { Book } from "@/types";
import Button from "@/components/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const bookId = searchParams.get("bookId");

  const [book, setBook] = useState<Book | null>(null);
  const [purchase, setPurchase] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference || !bookId) {
      router.push("/");
      return;
    }

    const foundBook = getBookById(bookId);
    const purchaseData = getPurchaseByBookId(bookId);

    if (!foundBook || !purchaseData) {
      router.push("/");
      return;
    }

    setBook(foundBook);
    setPurchase(purchaseData);
    setLoading(false);
  }, [reference, bookId, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying payment...</p>
      </div>
    );
  }

  if (!book || !purchase) {
    return null;
  }

  const handleDownload = () => {
    window.open(book.fileUrl, "_blank");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-green-100 text-lg">Thank you for your purchase</p>
        </div>

        {/* Purchase Details */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your E-Book is Ready
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center text-2xl flex-shrink-0">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600">by {book.author}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                Transaction Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Reference:</span>
                  <span className="font-mono text-blue-900">
                    {purchase.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Email:</span>
                  <span className="text-blue-900">{purchase.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Date:</span>
                  <span className="text-blue-900">
                    {new Date(purchase.purchaseDate).toLocaleDateString(
                      "en-NG",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleDownload} size="lg" className="w-full">
                📥 Download Your E-Book
              </Button>

              <Link href={`/books/${book.id}`} className="block">
                <Button variant="outline" size="lg" className="w-full">
                  View Book Details
                </Button>
              </Link>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>A receipt has been sent to your email address</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  You can download your e-book at any time from the book details
                  page
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your purchase is stored locally on this device</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
