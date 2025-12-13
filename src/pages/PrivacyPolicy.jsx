import React from 'react';
import PageTransition from '../components/PageTransition';

import '../styles/pages/LegalPages.css';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Privacy Policy</h1>
            <p className="update-date">Last Updated: December 13, 2025</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Gamer's Nest. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
              <ul>
                <li><strong>Identity Data:</strong> First name, last name, username</li>
                <li><strong>Contact Data:</strong> Email address, telephone number</li>
                <li><strong>Transaction Data:</strong> Details about payments and purchases</li>
                <li><strong>Technical Data:</strong> IP address, browser type, time zone settings</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul>
                <li>To process and deliver your orders</li>
                <li>To manage your account and provide customer support</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To detect and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Data Security</h2>
              <p>
                We have implemented appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Your Rights</h2>
              <p>Under data protection laws, you have rights including:</p>
              <ul>
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of your personal data</li>
                <li><strong>Erasure:</strong> Request erasure of your personal data</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your personal data</li>
                <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Cookies</h2>
              <p>
                Our website uses cookies to distinguish you from other users. This helps us provide you with 
                a good experience and allows us to improve our site. You can set your browser to refuse all 
                or some browser cookies.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Third-Party Links</h2>
              <p>
                Our website may include links to third-party websites. Clicking on those links may allow 
                third parties to collect or share data about you. We do not control these third-party websites 
                and are not responsible for their privacy statements.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new privacy policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="contact-info-box">
                <p><strong>Email:</strong> privacy@gamersnest.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Gaming Street, Los Angeles, CA 90001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}