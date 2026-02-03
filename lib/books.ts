/**
 * FILE LOCATION: lib/books.ts
 *
 * Book data utility functions
 * CREATE this file in a new directory: lib/
 *
 * Functions:
 * - getAllBooks() - Get all books from JSON
 * - getBookById(id) - Find specific book
 * - formatPrice(price) - Format NGN currency
 */

import { Book } from "@/types";
import booksData from "@/data/books.json";

export function getAllBooks(): Book[] {
  return booksData as Book[];
}

export function getBookById(id: string): Book | undefined {
  return booksData.find((book) => book.id === id) as Book | undefined;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);
}
