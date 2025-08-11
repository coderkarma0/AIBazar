import CouponCard from "@/components/CouponCard";
import PageLayout from "@/components/PageLayout";
import { Coupon } from "@/types";
import couponsData from "../../../data/coupons.json";

export default function CouponsPage() {
  const coupons: Coupon[] = couponsData;

  return (
    <PageLayout
      title="Discount Coupons"
      description="Save money on your favorite AI tools with these exclusive discount codes. Click to copy any coupon code to your clipboard."
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Coupons Grid */}
          {coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Coupons Available
                </h3>
                <p className="text-gray-500">
                  Check back later for new discount codes and special offers.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
