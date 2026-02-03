/**
 * FILE LOCATION: types/index.ts
 *
 * TypeScript type definitions
 * CREATE this file in a new directory: types/
 *
 * Defines:
 * - Book interface
 * - PurchasedBook interface
 * - PaystackResponse interface
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  fileUrl: string;
  category: string;
}

export interface PurchasedBook {
  bookId: string;
  purchaseDate: string;
  reference: string;
  email: string;
}

export interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}
