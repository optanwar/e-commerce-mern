import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Frequent Buyer",
    image: "https://via.placeholder.com/150",
    text: "This website has completely changed my shopping experience! The quality of the products and the fast delivery is unmatched.",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Tech Enthusiast",
    image: "https://via.placeholder.com/150",
    text: "I’ve found everything I need here at competitive prices. Highly recommend this platform to everyone.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Fashion Blogger",
    image: "https://via.placeholder.com/150",
    text: "The range of fashion products is incredible. I love how easy it is to shop for trendy outfits!",
  },
  {
    id: 4,
    name: "James Brown",
    role: "Business Owner",
    image: "https://via.placeholder.com/150",
    text: "This platform is a game-changer for my business needs. The customer service is exceptional!",
  },
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-wide">
            What Our <span className="text-yellow-500">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Hear from our happy customers about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
            >
              {/* Customer Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-500"
              />
              {/* Customer Name and Role */}
              <h3 className="mt-6 text-xl font-bold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
              {/* Testimonial Text */}
              <p className="text-gray-700 mt-4 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
