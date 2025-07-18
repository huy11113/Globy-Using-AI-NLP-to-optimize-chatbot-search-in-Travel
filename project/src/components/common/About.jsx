import React from 'react';
import { Users, Award, Globe, Heart, Quote } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Happy Travelers',
      description: 'Customers who have experienced unforgettable journeys with us',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Globe,
      number: '150+',
      label: 'Destinations',
      description: 'Countries and regions we help you explore worldwide',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Award,
      number: '25+',
      label: 'Years Experience',
      description: 'Years of expertise in creating exceptional travel experiences',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Heart,
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Customer satisfaction rating based on post-trip surveys',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      text: 'TravelLand made our honeymoon to Santorini absolutely magical. Every detail was perfect, from the stunning accommodation to the personalized itinerary.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      text: 'The Japan cultural tour exceeded all expectations. The local guides were incredible and showed us hidden gems we never would have found on our own.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      text: 'Our African safari was the adventure of a lifetime. TravelLand handled everything seamlessly, allowing us to focus on creating memories.',
      rating: 5
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            <span>ABOUT US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose TravelLand?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating extraordinary travel experiences that go beyond the ordinary. 
            Here's why thousands of travelers trust us with their adventures.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-blue-600 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enhanced About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Dream Journey Starts Here
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At TravelLand, we believe that travel is more than just visiting new places—it's about 
              transformation, connection, and creating stories that last a lifetime. Since 1999, we've 
              been crafting personalized adventures that inspire and amaze.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of experienced travel consultants works tirelessly to understand your unique 
              preferences and create tailor-made experiences that exceed your expectations. From luxury 
              escapes to adventure expeditions, we handle every detail with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More About Us
              </button>
              <button className="border-2 border-gray-300 hover:border-sky-500 hover:text-sky-500 text-gray-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Meet Our Team
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Travel team"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Award Winner</div>
                  <div className="text-sm text-gray-600">Best Travel Agency 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h3>
            <p className="text-lg text-gray-600">Real stories from real adventures</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="h-12 w-12 text-sky-500" />
                </div>

                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-3 border-sky-100 group-hover:border-sky-300 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400 fill-current">⭐</div>
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude'}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default About;