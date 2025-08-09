"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, MapPin, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch(
        "https://formsubmit.co/5f6f4e700a2da0f513fa2937c6e23cfb",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Sorry, there was an error submitting your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-section px-8">
          <div className="max-w-container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">Contact Us</span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
                Have questions about our pro rata calculator? Need support or
                want to provide feedback? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-primary-text mb-4">
                      Message Sent Successfully!
                    </h2>
                    <p className="text-primary-secondary mb-8">
                      Thank you for contacting us. We'll get back to you within
                      24-48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="button-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 mb-6">
                      <MessageSquare className="w-6 h-6 text-primary-highlight" />
                      <h2 className="text-2xl font-bold text-primary-text">
                        Send Us a Message
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <input
                        type="hidden"
                        name="_subject"
                        value="New Contact Form Submission - Pro Rata Calculator"
                      />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input
                        type="hidden"
                        name="_next"
                        value="https://proratacalculator.co.uk/contact"
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-primary-text font-medium mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            className="input-field w-full"
                            placeholder="Your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-primary-text font-medium mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            className="input-field w-full"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-primary-text font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="input-field w-full"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-primary-text font-medium mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          required
                          className="input-field w-full"
                        >
                          <option value="">Select a subject</option>
                          <option value="calculator-help">
                            Calculator Help
                          </option>
                          <option value="feedback">Feedback</option>
                          <option value="bug-report">Bug Report</option>
                          <option value="feature-request">
                            Feature Request
                          </option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-primary-text font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={6}
                          className="input-field w-full resize-none"
                          placeholder="Tell us how we can help you..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`button-primary w-full flex items-center justify-center space-x-2 ${
                          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        <Mail className="w-5 h-5" />
                        <span>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Quick Contact */}
                <div className="glass-effect rounded-card p-8 card-shadow">
                  <h2 className="text-2xl font-bold text-primary-text mb-6">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary-text">
                          Email
                        </h3>
                        <p className="text-primary-secondary">
                          contact@proratacalculator.co.uk
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary-text">
                          Response Time
                        </h3>
                        <p className="text-primary-secondary">
                          Within 24-48 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary-text">
                          Location
                        </h3>
                        <p className="text-primary-secondary">United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="glass-effect rounded-card p-8 card-shadow">
                  <h2 className="text-2xl font-bold text-primary-text mb-4">
                    Quick Help
                  </h2>
                  <p className="text-primary-secondary mb-4">
                    Before contacting us, you might find the answer to your
                    question in our FAQ section.
                  </p>
                  <a
                    href="/faq"
                    className="button-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <span>View FAQ</span>
                  </a>
                </div>

                {/* Common Questions */}
                <div className="glass-effect rounded-card p-8 card-shadow">
                  <h2 className="text-2xl font-bold text-primary-text mb-6">
                    Common Questions
                  </h2>
                  <div className="space-y-4 text-primary-secondary">
                    <div>
                      <h3 className="font-semibold text-primary-text mb-1">
                        How accurate is the calculator?
                      </h3>
                      <p className="text-sm">
                        Our calculator follows UK employment law and HMRC
                        guidelines for accurate results.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-text mb-1">
                        Is my data secure?
                      </h3>
                      <p className="text-sm">
                        Yes, we don't store your personal information.
                        Calculator inputs are processed in real-time only.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-text mb-1">
                        Can I use this for my business?
                      </h3>
                      <p className="text-sm">
                        Absolutely! Our calculator is suitable for both personal
                        and business use.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 glass-effect rounded-card p-8 card-shadow"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">
                Why Contact Us?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-text mb-2">
                    Technical Support
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Get help with using our calculator or report any technical
                    issues you encounter.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-text mb-2">
                    Feedback
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Share your thoughts on how we can improve our calculator and
                    user experience.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-text mb-2">
                    Quick Response
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    We aim to respond to all inquiries within 24-48 hours during
                    business days.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
