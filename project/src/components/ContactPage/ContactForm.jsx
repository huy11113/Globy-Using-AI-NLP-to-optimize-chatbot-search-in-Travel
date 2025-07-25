import React from 'react';

const ContactForm = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Info Column */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">Send us a message</h2>
        <p className="text-lg text-gray-600">
          If you have any questions about our tours, destinations, or need special assistance, don't hesitate to reach out. Our team will get back to you as soon as possible.
        </p>
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800">Office Hours</h4>
          <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
          <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
        </div>
      </div>
      
      {/* Form Column */}
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg border border-gray-200">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="How can we help?" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your message here..." className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;