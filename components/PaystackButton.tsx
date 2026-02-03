/**
 * FILE LOCATION: components/PaystackButton.tsx
 *
 * Paystack payment integration button
 * CREATE this file in: components/
 *
 * Features:
 * - Email validation
 * - Paystack Inline JS integration
 * - Payment callback handling
 * - Success/error states
 *
 * Used on: Checkout page
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { savePurchase, generateReference } from "@/lib/payment";
import { Book } from "@/types";

interface PaystackButtonProps {
  book: Book;
  email: string;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaystackButton({ book, email }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePayment = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    const reference = generateReference();
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      setError("Payment configuration error. Please contact support.");
      setLoading(false);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: book.price * 100, // Convert to kobo
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Book Title",
            variable_name: "book_title",
            value: book.title,
          },
          {
            display_name: "Book ID",
            variable_name: "book_id",
            value: book.id,
          },
        ],
      },
      callback: function (response: any) {
        // Payment successful
        savePurchase({
          bookId: book.id,
          purchaseDate: new Date().toISOString(),
          reference: response.reference,
          email: email,
        });

        router.push(
          `/success?reference=${response.reference}&bookId=${book.id}`,
        );
      },
      onClose: function () {
        setLoading(false);
        setError("Payment was cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div>
      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
