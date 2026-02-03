/**
 * FILE LOCATION: lib/payment.ts
 *
 * Payment and localStorage utility functions
 * CREATE this file in: lib/
 *
 * Functions:
 * - savePurchase() - Save purchase to localStorage
 * - getPurchases() - Get all purchases
 * - isPurchased() - Check if book is purchased
 * - getPurchaseByBookId() - Get specific purchase
 * - generateReference() - Create unique payment reference
 */

import { PurchasedBook } from "@/types";

const STORAGE_KEY = "purchased_books";

export function savePurchase(purchase: PurchasedBook): void {
  if (typeof window === "undefined") return;

  const purchases = getPurchases();
  purchases.push(purchase);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
}

export function getPurchases(): PurchasedBook[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isPurchased(bookId: string): boolean {
  const purchases = getPurchases();
  return purchases.some((p) => p.bookId === bookId);
}

export function getPurchaseByBookId(bookId: string): PurchasedBook | undefined {
  const purchases = getPurchases();
  return purchases.find((p) => p.bookId === bookId);
}

export function generateReference(): string {
  return `ebook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
