import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <span className="relative group inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
        {text}
      </span>
    </span>
  );
};

export default Tooltip;
