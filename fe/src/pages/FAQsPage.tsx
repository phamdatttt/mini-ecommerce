import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const FAQsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs: FAQ[] = [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the "Sign Up" button in the top right corner of the page. Fill in your details including your name, email address, and password. Once submitted, you\'ll receive a verification email. Click the link in the email to verify your account and start shopping.',
      category: 'account',
    },
    {
      question: 'I forgot my password. How do I reset it?',
      answer:
        'If you\'ve forgotten your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
      category: 'account',
    },
    {
      question: 'How can I update my account information?',
      answer:
        'To update your account information, log in to your account and go to the "My Account" section. From there, select "Profile" or "Account Settings" where you can edit your personal information, change your password, and update your preferences.',
      category: 'account',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted to protect your information.',
      category: 'payment',
    },
    {
      question: 'Is it safe to use my credit card on your website?',
      answer:
        'Yes, our website uses industry-standard SSL encryption to protect your personal and payment information. We are PCI DSS compliant and never store your full credit card details on our servers.',
      category: 'payment',
    },
    {
      question: 'When will my payment be processed?',
      answer:
        'Your payment will be processed immediately after you place your order. If there are any issues with your payment, you will be notified via email with instructions on how to resolve the issue.',
      category: 'payment',
    },
    {
      question: 'How long will it take to receive my order?',
      answer:
        'Standard shipping typically takes 3-5 business days within the continental US. Express shipping is available for 1-2 business day delivery. International shipping times vary by location, usually between 7-14 business days.',
      category: 'shipping',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options available to your country during checkout.',
      category: 'shipping',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website under "Order Tracking" or directly through the carrier\'s website.',
      category: 'shipping',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Please visit our Returns page for more details and to initiate a return.',
      category: 'returns',
    },
    {
      question: 'How do I return an item?',
      answer:
        'To return an item, log in to your account, go to "Order History", and select the order containing the item you wish to return. Click "Return Items" and follow the instructions. You\'ll receive a return shipping label via email.',
      category: 'returns',
    },
    {
      question: 'When will I receive my refund?',
      answer:
        "Once we receive and inspect your return, we'll process your refund. This typically takes 3-5 business days. The refund will be issued to your original payment method and may take an additional 2-7 business days to appear on your statement, depending on your bank or credit card company.",
      category: 'returns',
    },
    {
      question: 'Do you offer price matching?',
      answer:
        "Yes, we offer price matching for identical products found at a lower price from an authorized retailer. Please contact our customer service team with details of the competitor's offer within 14 days of your purchase.",
      category: 'products',
    },
    {
      question: 'Are your products covered by warranty?',
      answer:
        "Most products come with a manufacturer's warranty. The warranty period and coverage vary by product and brand. Warranty information is listed on the product page and included with your purchase.",
      category: 'products',
    },
    {
      question: 'How can I contact customer service?',
      answer:
        'You can contact our customer service team through various channels: email at support@shopmini.com, phone at +1 (555) 123-4567 during business hours (Mon-Fri, 9AM-6PM EST), or through the live chat feature on our website.',
      category: 'support',
    },
  ];

  const categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'account', name: 'Account' },
    { id: 'payment', name: 'Payment' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'products', name: 'Products' },
    { id: 'support', name: 'Customer Support' },
  ];

  // Filter FAQs based on active category and search query
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Find answers to common questions about our products, shipping,
          returns, and more.
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ content */}
        <div className="lg:w-3/4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-neutral-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                No results found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                Try a different search term or category
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 border border-neutral-200 dark:border-neutral-700"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Still have questions?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
          If you couldn&apos;t find the answer to your question, our customer
          support team is here to help.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQsPage;
