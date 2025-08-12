import Link from "next/link";

interface DataErrorFallbackProps {
  error?: string;
  retry?: () => void;
  showRetry?: boolean;
  title?: string;
  description?: string;
  suggestions?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
}

const DataErrorFallback: React.FC<DataErrorFallbackProps> = ({
  error = "Failed to load data",
  retry,
  showRetry = true,
  title = "Unable to Load Content",
  description = "We're having trouble loading this content. Please try again or explore other sections.",
  suggestions = [
    {
      label: "Go Home",
      href: "/",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Browse Tools",
      href: "/tools",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ],
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="mx-auto h-16 w-16 text-gray-400" aria-hidden="true">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>

      {/* Action Buttons */}
      <div className="space-y-4">
        {showRetry && retry && (
          <button
            onClick={retry}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        )}

        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              href={suggestion.href}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {suggestion.icon && (
                <span className="mr-2">{suggestion.icon}</span>
              )}
              {suggestion.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Technical Error Details (for debugging) */}
      {process.env.NODE_ENV === "development" && error && (
        <details className="mt-6 text-left w-full max-w-md">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            Show Technical Details
          </summary>
          <div className="mt-2 p-3 bg-gray-100 rounded text-sm font-mono text-gray-800 overflow-auto">
            {error}
          </div>
        </details>
      )}
    </div>
  );
};

export default DataErrorFallback;
