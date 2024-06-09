"use client";

import React from 'react';

interface VisualizerProps {
  array: number[];
  index1: number | null;
  index2: number | null;
  sortedIndices: Set<number>;
}

const Visualizer: React.FC<VisualizerProps> = ({ array, index1, index2, sortedIndices }) => {
  return (
    <div>
      <ul className='flex justify-center gap-3'>
        {array.map((item, index) => (
          <li
            key={index}
            className={`flex justify-center items-end ${
              index === index1 || index === index2 ? 'bg-blue-200' : sortedIndices.has(index) ? 'bg-green-200' : 'bg-red-200'
            }`}
            style={{ height: `${item * 10}px`, width: '30px' }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
