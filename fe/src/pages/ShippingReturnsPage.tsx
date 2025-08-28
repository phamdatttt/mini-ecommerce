import React from 'react';
import { Link } from 'react-router-dom';

const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Shipping & Returns
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Information about our shipping policies, delivery times, and return
          procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            Free Shipping
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            On all orders over $50 within the continental US
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            Fast Delivery
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Most orders delivered within 3-5 business days
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            Easy Returns
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            30-day hassle-free return policy
          </p>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-700">
          Shipping Information
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Shipping Methods & Delivery Times
            </h3>
            <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider"
                    >
                      Shipping Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider"
                    >
                      Estimated Delivery Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider"
                    >
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      Standard Shipping
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      3-5 business days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      $4.99 (Free on orders over $50)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      Express Shipping
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      1-2 business days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      $9.99
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      International Shipping
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      7-14 business days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                      Varies by location
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Order Processing
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Orders are typically processed within 1-2 business days after
              payment confirmation. During peak seasons or promotional periods,
              processing may take an additional 1-2 business days.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Once your order ships, you will receive a shipping confirmation
              email with tracking information. You can also track your order by
              logging into your account and viewing your order history.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              International Shipping
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              We ship to most countries worldwide. International customers may
              be subject to import duties, taxes, and customs clearance fees,
              which are the responsibility of the recipient. These charges vary
              by country and are not included in the shipping cost or product
              price.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              International delivery times may vary depending on customs
              processing in your country. Please allow additional time for
              international shipments to arrive.
            </p>
          </div>
        </div>
      </div>

      {/* Returns & Refunds */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-700">
          Returns & Refunds
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Return Policy
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              We offer a 30-day return policy for most items. To be eligible for
              a return, your item must be unused, in the same condition that you
              received it, and in its original packaging. Certain products, such
              as personalized items or downloadable software, are not eligible
              for return.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              To initiate a return, please log into your account, go to your
              order history, and select the order containing the item you wish
              to return. Follow the instructions to generate a return shipping
              label and return authorization.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Refund Process
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Once we receive and inspect your return, we&apos;ll send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              If approved, your refund will be processed, and a credit will
              automatically be applied to your original method of payment within
              3-5 business days. Please note that it may take an additional 2-7
              business days for the refund to appear on your statement,
              depending on your financial institution.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Shipping costs are non-refundable. If you receive a refund, the
              cost of return shipping will be deducted from your refund unless
              the return is due to our error (you received an incorrect or
              defective item).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Exchanges
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              If you need to exchange an item for the same product in a
              different size or color, please initiate a return and place a new
              order for the desired item. This ensures the fastest processing
              time and availability of your preferred item.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Damaged or Defective Items
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              If you receive a damaged or defective item, please contact our
              customer service team within 48 hours of receiving your order. We
              will provide instructions for returning the item and send a
              replacement or issue a full refund, including shipping costs.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              question:
                'Can I change my shipping address after placing an order?',
              answer:
                'If you need to change your shipping address, please contact our customer service team as soon as possible. We can usually accommodate address changes if the order has not yet been processed for shipping.',
            },
            {
              question: 'Do you ship to PO boxes?',
              answer:
                'Yes, we ship to PO boxes for standard shipping. However, express shipping and some larger items may require a physical address for delivery.',
            },
            {
              question: 'How can I track my order?',
              answer:
                'Once your order ships, you will receive a shipping confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.',
            },
            {
              question: 'What should I do if my package is lost or stolen?',
              answer:
                "If your tracking information shows that your package was delivered but you haven't received it, please check with neighbors or your local post office first. If you believe your package is lost or stolen, contact our customer service team within 7 days of the delivery date, and we'll help resolve the issue.",
            },
            {
              question: 'Can I return a gift?',
              answer:
                "Yes, gifts can be returned following our standard return policy. You'll need the order number or gift receipt. The refund will be issued as a store credit to the gift recipient.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact section */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
          Need More Help?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
          If you have any questions about shipping, returns, or refunds, our
          customer service team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contact"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/faqs"
            className="bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 font-medium py-3 px-6 rounded-lg hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
