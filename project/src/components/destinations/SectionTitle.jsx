import React from 'react';
import { Star } from 'lucide-react';

const SectionTitle = ({ subtitle, title, description }) => {
  return (
    <div className="text-center mb-16 space-y-4">
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
        <Star className="w-4 h-4" />
        <span className="uppercase tracking-wider">{subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {index === 1 ? (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {line}
              </span>
            ) : (
              line
            )}
            {index === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;