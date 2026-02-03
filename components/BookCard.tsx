/**
 * FILE LOCATION: components/BookCard.tsx
 *
 * Reusable book card component for grid display
 * CREATE this file in a new directory: components/
 *
 * Used on:
 * - Home page to show all books in a grid
 */

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types";
import { formatPrice } from "@/lib/books";
import Button from "./Button";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">📚</div>
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {book.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          by <span className="font-medium">{book.author}</span>
        </p>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
          {book.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(book.price)}
          </div>

          <Link href={`/books/${book.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
