import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Tool Not Found
          </h2>
          <p className="text-gray-600">
            The AI tool you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/tools"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </Link>
          <div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
