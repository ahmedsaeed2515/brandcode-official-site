'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ContactSection - Premium contact form with glassmorphism design
 */
export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const budgetOptions = [
    { value: '', label: 'Select Budget Range' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@brandcode.dev',
      href: 'mailto:hello@brandcode.dev',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Remote / Worldwide',
      href: null,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
    },
  ];

  return (
    <section id="contact" className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      </div>

      {/* Section Divider */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
        }}
      />

      <div className="w-full max-w-7xl px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full"
            style={{
              background: 'rgba(236, 72, 153, 0.1)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              color: '#f472b6',
            }}
          >
            Get In Touch
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your <span style={{
              background: 'linear-gradient(135deg, #ec4899, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Project</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Let us discuss your vision and turn it into reality. 
            Fill out the form and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 w-full">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl group transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div 
                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#818cf8',
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-white font-medium hover:text-indigo-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <p className="text-sm text-zinc-500 mb-4">Follow Us</p>
              <div className="flex gap-3 justify-center">
                {['github', 'linkedin', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {social === 'github' && (
                      <svg className="w-5 h-5 text-zinc-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {social === 'linkedin' && (
                      <svg className="w-5 h-5 text-zinc-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social === 'twitter' && (
                      <svg className="w-5 h-5 text-zinc-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div 
              className="p-8 md:p-10 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400">We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: focusedField === 'name' 
                            ? '1px solid rgba(99, 102, 241, 0.5)' 
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: focusedField === 'name' 
                            ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                            : 'none',
                        }}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: focusedField === 'email' 
                            ? '1px solid rgba(99, 102, 241, 0.5)' 
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: focusedField === 'email' 
                            ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                            : 'none',
                        }}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: focusedField === 'company' 
                            ? '1px solid rgba(99, 102, 241, 0.5)' 
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: focusedField === 'company' 
                            ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                            : 'none',
                        }}
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Budget Field */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Project Budget
                      </label>
                      <select
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('budget')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all duration-300 appearance-none cursor-pointer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: focusedField === 'budget' 
                            ? '1px solid rgba(99, 102, 241, 0.5)' 
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: focusedField === 'budget' 
                            ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                            : 'none',
                        }}
                      >
                        {budgetOptions.map((option) => (
                          <option 
                            key={option.value} 
                            value={option.value}
                            className="bg-zinc-900"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <svg 
                        className="absolute right-4 top-11 w-4 h-4 text-zinc-500 pointer-events-none" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-zinc-600 outline-none transition-all duration-300 resize-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: focusedField === 'message' 
                          ? '1px solid rgba(99, 102, 241, 0.5)' 
                          : '1px solid rgba(255, 255, 255, 0.06)',
                        boxShadow: focusedField === 'message' 
                          ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                          : 'none',
                      }}
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
