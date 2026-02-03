/**
 * FILE LOCATION: app/page.tsx
 *
 * Home page / Landing page
 * REPLACE your existing app/page.tsx with this file
 *
 * Shows:
 * - Hero section
 * - Stats cards
 * - Grid of all available e-books
 */

import { getAllBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";

export default function HomePage() {
  const books = getAllBooks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Discover Your Next Great Read
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our curated collection of premium e-books. Instant download
          after purchase.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {books.length}+
          </div>
          <div className="text-gray-600">Premium E-Books</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-3xl font-bold text-blue-600 mb-1">Instant</div>
          <div className="text-gray-600">Download Access</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">🔒</div>
          <div className="text-3xl font-bold text-blue-600 mb-1">Secure</div>
          <div className="text-gray-600">Paystack Payment</div>
        </div>
      </div>

      {/* Books Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Available E-Books
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
