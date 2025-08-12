import { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

const PageLayout = ({
  children,
  title,
  description,
  breadcrumbs,
  className = "",
}: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="bg-white border-b border-gray-200"
          aria-label="Breadcrumb navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ol className="flex items-center space-x-2" role="list">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center" role="listitem">
                  {index > 0 && (
                    <svg
                      className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:underline focus:text-gray-700 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className="text-sm font-medium text-gray-900"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Page Header */}
      {(title || description) && (
        <header className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && (
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1" role="main">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
