import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl h-[450px] cursor-pointer shadow-xl">
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full transition-all duration-700 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${destination.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-4">
          <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            {destination.name}
          </h3>
          <div className="mt-4 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:delay-200">
            <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-4 line-clamp-3">
              {destination.description}
            </p>
            <button className="font-bold text-white flex items-center gap-2 border-b-2 border-blue-400 w-fit pb-1 hover:border-blue-300">
              Explore Now
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    _id: PropTypes.string.isRequired, // ✅ Sửa từ id thành _id
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default DestinationCard;