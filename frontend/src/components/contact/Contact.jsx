import React from 'react';

const Contact = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            We're here to help. Reach out with questions, feedback, or just to say hello!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Customer Service</h2>
              <p className="text-gray-600">support@luxecart.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Head Office</h2>
              <p className="text-gray-600">123 Market Street</p>
              <p className="text-gray-600">San Francisco, CA 94103</p>
              <p className="text-gray-600">USA</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Business Hours</h2>
              <p className="text-gray-600">Mon - Fri: 9 AM – 6 PM</p>
              <p className="text-gray-600">Sat - Sun: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Embed */}
        <div className="mt-20">
          <iframe
            title="Google Map"
            className="w-full h-80 rounded-xl shadow"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019227170232!2d-122.4206795846818!3d37.774929779759204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b09310e5f%3A0x5391a309c0e06c4d!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1615849574985!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
