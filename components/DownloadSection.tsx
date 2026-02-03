/**
 * FILE LOCATION: components/DownloadSection.tsx
 *
 * Download section for purchased books
 * CREATE this file in: components/
 *
 * Features:
 * - Checks localStorage for purchase
 * - Shows only if book is purchased
 * - Displays purchase details
 * - Download button
 *
 * Used on: Book detail page
 */

"use client";

import { useEffect, useState } from "react";
import { isPurchased, getPurchaseByBookId } from "@/lib/payment";
import Button from "./Button";

interface DownloadSectionProps {
  bookId: string;
  fileUrl: string;
}

export default function DownloadSection({
  bookId,
  fileUrl,
}: DownloadSectionProps) {
  const [purchased, setPurchased] = useState(false);
  const [purchase, setPurchase] = useState<any>(null);

  useEffect(() => {
    const checkPurchase = () => {
      const hasPurchased = isPurchased(bookId);
      setPurchased(hasPurchased);

      if (hasPurchased) {
        const purchaseData = getPurchaseByBookId(bookId);
        setPurchase(purchaseData);
      }
    };

    checkPurchase();
  }, [bookId]);

  if (!purchased) {
    return null;
  }

  const handleDownload = () => {
    // In a real app, this would be a secure download link
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mt-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">✅</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Purchase Confirmed!
          </h3>
          <p className="text-green-700 mb-4">
            Thank you for your purchase. Your e-book is ready to download.
          </p>

          {purchase && (
            <div className="bg-white rounded-lg p-4 mb-4 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Reference:</span>{" "}
                {purchase.reference}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Purchase Date:</span>{" "}
                {new Date(purchase.purchaseDate).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          <Button onClick={handleDownload} size="lg">
            📥 Download E-Book
          </Button>
        </div>
      </div>
    </div>
  );
}
