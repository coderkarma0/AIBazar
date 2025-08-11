"use client";

import { useState } from "react";

interface PromptCardProps {
  prompt: string;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 group">
      {/* Prompt Text */}
      <div className="mb-3">
        <p className="text-sm font-mono text-gray-800 leading-relaxed">
          {prompt}
        </p>
      </div>

      {/* Copy Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
            copied
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 hover:border-blue-300"
          }`}
          disabled={copied}
        >
          {copied ? (
            <>
              <svg
                className="w-3 h-3 mr-1"
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
          ) : (
            <>
              <svg
                className="w-3 h-3 mr-1"
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
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
