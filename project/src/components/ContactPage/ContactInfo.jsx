import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const infoItems = [
  {
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: "Our Office",
    details: ["123 Travel Lane, Adventure City", "Hanoi, Vietnam"]
  },
  {
    icon: <Mail className="w-8 h-8 text-blue-600" />,
    title: "Email Address",
    details: ["contact@globy.com", "support@globy.com"]
  },
  {
    icon: <Phone className="w-8 h-8 text-blue-600" />,
    title: "Phone Number",
    details: ["(+84) 123 456 789", "(+84) 987 654 321"]
  }
];

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {infoItems.map((item, index) => (
        <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-blue-500">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-blue-50 mb-6">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
          <div className="mt-2 text-gray-600">
            {item.details.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;