"use client";

import { useState } from "react";
import { Coupon } from "@/types";

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy coupon code: ", err);
    }
  };

  // Check if coupon is expired
  const expiryDate = new Date(coupon.expiry);
  const currentDate = new Date();
  const isExpired = expiryDate < currentDate;
  const isExpiringSoon =
    !isExpired &&
    expiryDate.getTime() - currentDate.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days

  // Format expiry date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 p-6 transition-all duration-200 hover:shadow-lg ${
        isExpired
          ? "border-red-200 bg-red-50"
          : isExpiringSoon
          ? "border-yellow-200 bg-yellow-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      {/* Coupon Code */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">Coupon Code</h3>
          {isExpired && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Expired
            </span>
          )}
          {isExpiringSoon && !isExpired && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Expires Soon
            </span>
          )}
        </div>
        <div className="bg-gray-100 rounded-md p-3 border-2 border-dashed border-gray-300">
          <code className="text-xl font-mono font-bold text-blue-600 tracking-wider">
            {coupon.code}
          </code>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {coupon.description}
        </p>
      </div>

      {/* Expiry Date */}
      <div className="mb-4">
        <p
          className={`text-xs font-medium ${
            isExpired
              ? "text-red-600"
              : isExpiringSoon
              ? "text-yellow-600"
              : "text-gray-500"
          }`}
        >
          Expires: {formatDate(coupon.expiry)}
        </p>
      </div>

      {/* Copy Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          disabled={copied || isExpired}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            copied
              ? "bg-green-100 text-green-800 border border-green-200"
              : isExpired
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 hover:border-blue-300"
          }`}
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : isExpired ? (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Expired
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Code
            </>
          )}
        </button>
      </div>
    </div>
  );
}
