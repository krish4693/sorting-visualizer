"use client";

import React, { useEffect, useState } from 'react';

const Visualizer: React.FC = ({array}) => {
  

  return (
    <div>
      <ul className='flex items-center justify-center gap-3'>
        {array.map((item, index) => (
          <li key={index} className='bg-red-200'>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Visualizer;
