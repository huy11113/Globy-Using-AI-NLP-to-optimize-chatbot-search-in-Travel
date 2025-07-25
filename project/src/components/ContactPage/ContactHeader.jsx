import React from 'react';

const ContactHeader = () => {
  return (
    <section className="relative h-80 flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://nld.mediacdn.vn/2017/photo-5-1502239793510.jpg"
          alt="Contact us background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 p-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          Get In Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          We're here to help. Contact us for any questions or to start planning your next adventure.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;