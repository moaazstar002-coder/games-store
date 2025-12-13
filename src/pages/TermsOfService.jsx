import React from 'react';
import PageTransition from '../components/PageTransition';
import '../styles/pages/LegalPages.css';

export default function TermsOfService() {
  return (
    <PageTransition>
    
      
      <div className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Terms of Service</h1>
            <p className="update-date">Last Updated: December 13, 2025</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing and using Gamer's Nest, you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Gamer's Nest for 
                personal, non-commercial transitory viewing only. This is the grant of a license, not a 
                transfer of title.
              </p>
              <p>Under this license, you may not:</p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for:
              </p>
              <ul>
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Purchases and Payment</h2>
              <p>
                If you wish to purchase any product or service made available through our service, you may 
                be asked to supply certain information relevant to your purchase including:
              </p>
              <ul>
                <li>Credit card number and expiration date</li>
                <li>Billing address</li>
                <li>Shipping information</li>
              </ul>
              <p>
                All purchases are subject to product availability. We reserve the right to refuse or cancel 
                any order for any reason.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Refunds and Returns</h2>
              <p>
                Digital products are generally non-refundable once downloaded or activated. Physical products 
                may be returned within 30 days of purchase in their original condition. Refunds will be 
                processed to the original payment method within 5-10 business days.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Prohibited Activities</h2>
              <p>You agree not to engage in any of the following activities:</p>
              <ul>
                <li>Violating laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting viruses or malicious code</li>
                <li>Attempting to gain unauthorized access</li>
                <li>Interfering with the proper functioning of the service</li>
                <li>Using automated systems to access the service</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are owned by Gamer's Nest 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall Gamer's Nest be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without 
                prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these terms at any time. We will provide notice 
                of any significant changes by posting the new terms on this page and updating the "Last Updated" 
                date.
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="contact-info-box">
                <p><strong>Email:</strong> legal@gamersnest.com</p>
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