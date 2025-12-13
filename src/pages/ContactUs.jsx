import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'sonner';
import '../styles/pages/ContactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: 'We will get back to you within 24 hours.',
        duration: 3000,
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <PageTransition>
     
      
      <div className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="icon-wrapper">
                    <FaEnvelope />
                  </div>
                  <h3>Email</h3>
                  <p>moaazstar002@gmail.com</p>
                  <a href="mailto:moaazstar002@gmail.com" className="contact-link">
                    Send Email
                  </a>
                </div>

                <div className="info-card">
                  <div className="icon-wrapper">
                    <FaPhone />
                  </div>
                  <h3>Phone</h3>
                  <p>+201289257489</p>
                  <a href="tel:+201289257489" className="contact-link">
                    Call Us
                  </a>
                </div>

                <div className="info-card">
                  <div className="icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <h3>Location</h3>
                  <p>123 Gaming Street<br />Cairo, Egypt</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                    View Map
                  </a>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}