import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{title}</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full" />
    <p className="text-slate-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionHeader;