import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Frequent Buyer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    text: "The quality of the products and the fast delivery is unmatched.",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Tech Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    text: "I’ve found everything I need here at competitive prices. Highly recommend this platform to everyone.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    text: "The range of fashion products is incredible. I love how easy it is to shop for trendy outfits!",
  },
  {
    id: 4,
    name: "James Brown",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    text: "This platform is a game-changer for my business needs. The customer service is exceptional!",
  },
];

const TestimonialSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-wide">
            What Our <span className="text-yellow-500">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            See why our customers love shopping with us.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full  max-w-md mx-4 px-6 py-8 md:py-10 lg:py-12 bg-white rounded-lg shadow-lg flex flex-col items-center text-center space-y-4"
            >
              {/* Image */}
              <div className="w-24 h-24 mb-4 flex justify-center items-center bg-gray-100 rounded-full overflow-hidden mx-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Role */}
              <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
