"use client";

import React, { useEffect, useState } from 'react';

const Visualizer: React.FC = ({array}) => {
  

  return (
    <div>
      <ul className='flex items-center justify-between'>
        {array.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
