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
              index === index1 || index === index2 ? 'bg-cyan-400' : sortedIndices.has(index) ? 'bg-lime-500' : 'bg-gray-500'
            }`}
            style={{ height: `${item * 10}px`, width: '15px' }}
          >
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
