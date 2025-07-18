import React from 'react';
import { 
  Plane, 
  MapPin, 
  Shield, 
  Clock, 
  Headphones, 
  Camera,
  Car,
  Home,
  Sparkles
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Find and book the best flights worldwide with competitive prices and flexible options.',
      features: ['Global airline partnerships', 'Best price guarantee', 'Flexible booking options'],
      color: 'from-sky-500 to-blue-600'
    },
    {
      icon: Home,
      title: 'Accommodation',
      description: 'From luxury resorts to cozy boutique hotels, find the perfect place to stay.',
      features: ['Verified reviews', 'Instant booking', 'Special deals & discounts'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Reliable ground transportation including car rentals, transfers, and local transport.',
      features: ['Airport transfers', 'Car rental options', 'Local transport guides'],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: MapPin,
      title: 'Custom Itineraries',
      description: 'Personalized travel plans crafted by our expert travel consultants.',
      features: ['Tailored experiences', 'Local insights', 'Flexible scheduling'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Comprehensive travel protection for peace of mind on your adventures.',
      features: ['Medical coverage', 'Trip cancellation', '24/7 emergency assistance'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Camera,
      title: 'Photo Tours',
      description: 'Capture stunning memories with our professional photography tour guides.',
      features: ['Professional guides', 'Equipment provided', 'Photo editing tips'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your journey.',
      features: ['Multilingual support', 'Emergency assistance', 'Real-time updates'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Last-Minute Deals',
      description: 'Spontaneous traveler? Grab amazing last-minute deals and save big.',
      features: ['Flash sales', 'Same-day booking', 'Exclusive offers'],
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete Travel Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From planning to execution, we provide comprehensive travel services to make your journey seamless and unforgettable.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border border-gray-100 hover:border-transparent relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <IconComponent className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-blue-600 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Enhanced Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-3 group-hover:scale-125 transition-transform duration-300`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Let our travel experts help you plan the perfect adventure. Get in touch today and turn your travel dreams into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-500 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-sky-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Browse Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;