/**
 * FILE LOCATION: app/books/[id]/page.tsx
 *
 * Dynamic book detail page
 * CREATE this file in a new directory: app/books/[id]/
 *
 * Shows:
 * - Full book details
 * - Purchase button
 * - Download section (if already purchased)
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookById, formatPrice } from "@/lib/books";
import Button from "@/components/Button";
import DownloadSection from "@/components/DownloadSection";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/"
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
        Back to Store
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Book Cover */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-4">📚</div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block">
                {book.category}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              by{" "}
              <span className="font-semibold text-gray-900">{book.author}</span>
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <div className="text-4xl font-bold text-blue-600">
                {formatPrice(book.price)}
              </div>
              <div className="text-sm text-gray-500">One-time payment</div>
            </div>

            <div className="prose prose-gray mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this book
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                What you'll get:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant download access
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  PDF format
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No DRM restrictions
                </li>
              </ul>
            </div>

            <Link href={`/checkout?bookId=${book.id}`} className="block">
              <Button size="lg" className="w-full">
                Purchase Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Download Section (shows only if purchased) */}
      <DownloadSection bookId={book.id} fileUrl={book.fileUrl} />
    </div>
  );
}
