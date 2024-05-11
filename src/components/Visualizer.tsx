"use client";

import React, { useEffect, useState } from 'react';

const Visualizer: React.FC = ({array}) => {
  

  return (
    <div>
      <ul className='flex justify-center gap-3'>
        {array.map((item, index) => (
          <li key={index} className='bg-red-200' style={{height:`${item*10}px`,width:'30px',display:'flex',justifyContent:'center'}}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Visualizer;
