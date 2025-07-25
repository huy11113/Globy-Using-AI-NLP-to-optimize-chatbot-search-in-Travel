import React from 'react';

// Import child components
import ContactHeader from '../components/ContactPage/ContactHeader';
import ContactInfo from '../components/ContactPage/ContactInfo';
import ContactForm from '../components/ContactPage/ContactForm';

const ContactPage = () => {
  return (
    <main className="bg-gray-50">
      <ContactHeader />
      
      <section className="py-24">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 space-y-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949257464!2d105.78010807502302!3d21.02882508062201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a22!2sKeangnam%20Landmark%2072!5e0!3m2!1sen!2svn!4v1721850346332!5m2!1sen!2svn"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Office Location"
        ></iframe>
      </section>
    </main>
  );
};

export default ContactPage;