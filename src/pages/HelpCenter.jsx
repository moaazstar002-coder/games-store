import React, 
{ useState } from "react";
import PageTransition from "../components/PageTransition";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../styles/pages/HelpCenter.css";

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          id: 1,
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. Digital products are delivered instantly via email.",
        },
        {
          id: 2,
          question: "Can I track my order?",
          answer:
            "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
        },
        {
          id: 3,
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs duties and taxes.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          id: 4,
          question: "What is your return policy?",
          answer:
            "Physical products can be returned within 30 days of purchase in original condition. Digital products are non-refundable once downloaded or activated.",
        },
        {
          id: 5,
          question: "How do I return an item?",
          answer:
            "Contact our support team to initiate a return. We'll provide you with a return label and instructions. Once we receive your return, we'll process your refund within 5-10 business days.",
        },
        {
          id: 6,
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-10 business days after we receive your return. The refund will be credited to your original payment method.",
        },
      ],
    },
    {
      category: "Account & Payment",
      questions: [
        {
          id: 7,
          question: "How do I create an account?",
          answer:
            'Click the "Sign Up" button in the top right corner. Fill in your details and verify your email address to activate your account.',
        },
        {
          id: 8,
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and selected digital wallets.",
        },
        {
          id: 9,
          question: "Is my payment information secure?",
          answer:
            "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.",
        },
      ],
    },
    {
      category: "Products & Games",
      questions: [
        {
          id: 10,
          question: "Are your games genuine?",
          answer:
            "Absolutely! All our games are sourced directly from publishers and authorized distributors. We guarantee 100% authentic products.",
        },
        {
          id: 11,
          question: "Do you sell pre-orders?",
          answer:
            "Yes, we offer pre-orders for upcoming games. Pre-order customers often receive exclusive bonuses and guaranteed delivery on release day.",
        },
        {
          id: 12,
          question: "Can I download digital games immediately?",
          answer:
            "Yes! Digital games and codes are delivered instantly via email after purchase. Check your inbox and spam folder for your download link.",
        },
      ],
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <PageTransition>
      <div className="help-center-page">
        <div className="container">
          <div className="help-header">
            <h1>Help Center</h1>
            <p>Find answers to your questions below</p>
          </div>

          <div className="help-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="quick-links">
            <h2>Popular Topics</h2>
            <div className="links-grid">
              <a href="#orders" className="quick-link-card">
                <span>📦</span>
                <h3>Orders & Shipping</h3>
                <p>Track orders and shipping info</p>
              </a>
              <a href="#returns" className="quick-link-card">
                <span>🔄</span>
                <h3>Returns & Refunds</h3>
                <p>Return policy and procedures</p>
              </a>
              <a href="#account" className="quick-link-card">
                <span>👤</span>
                <h3>Account & Payment</h3>
                <p>Account settings and payments</p>
              </a>
              <a href="#products" className="quick-link-card">
                <span>🎮</span>
                <h3>Products & Games</h3>
                <p>Game information and downloads</p>
              </a>
            </div>
          </div>

          <div className="faq-sections">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category) => (
                <div key={category.category} className="faq-category">
                  <h2>{category.category}</h2>
                  <div className="faq-list">
                    {category.questions.map((faq) => (
                      <div
                        key={faq.id}
                        className={`faq-item ${
                          openFAQ === faq.id ? "active" : ""
                        }`}
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <span>{faq.question}</span>
                          {openFAQ === faq.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {openFAQ === faq.id && (
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No results found for "{searchTerm}"</p>
                <p>
                  Try searching with different keywords or browse our popular
                  topics above.
                </p>
              </div>
            )}
          </div>

          <div className="help-contact">
            <h2>Still need help?</h2>
            <p>
              Can't find what you're looking for? Our support team is here to
              help!
            </p>
            <a href="/contact" className="contact-btn">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
