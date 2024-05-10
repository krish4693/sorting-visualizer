"use client";
// Visualizer.tsx

import React, { useEffect, useState } from 'react';

const generateRandomArray = (size: number): number[] => {
  // Generate an array of random integers between 1 and 100 (adjust as needed)
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

const Visualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    // Initialize the array with random values when the component mounts
    setArray(generateRandomArray(10));
  }, []);

  return (
    <div>
      <ul>
        {array.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
