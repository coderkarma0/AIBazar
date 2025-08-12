"use client";

import { useState } from "react";

interface PromptCardProps {
  prompt: string;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const promptId = `prompt-${Math.random().toString(36).substr(2, 9)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCopy();
    }
  };

  return (
    <article
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      aria-labelledby={`${promptId}-label`}
    >
      {/* Prompt Text */}
      <div className="mb-3">
        <h4 id={`${promptId}-label`} className="sr-only">
          Suggested Prompt
        </h4>
        <p
          className="text-sm font-mono text-gray-800 leading-relaxed"
          role="code"
          aria-label="AI prompt text"
        >
          {prompt}
        </p>
      </div>

      {/* Copy Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          onKeyDown={handleKeyDown}
          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            copied
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 hover:border-blue-300"
          }`}
          disabled={copied}
          aria-label={
            copied
              ? "Prompt copied to clipboard"
              : `Copy prompt: ${prompt.substring(0, 50)}${
                  prompt.length > 50 ? "..." : ""
                }`
          }
          aria-describedby={copied ? `${promptId}-status` : undefined}
        >
          {copied ? (
            <>
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
                aria-hidden="true"
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
        {copied && (
          <span
            id={`${promptId}-status`}
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            Prompt copied to clipboard successfully
          </span>
        )}
      </div>
    </article>
  );
}
