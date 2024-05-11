import React from 'react'


const Navbar = ({ generateNewArray, handleMergeSort }) => {
  return (
    <div className='flex items-center justify-around'>
      <button onClick={generateNewArray}>
        <p>Generate New Array</p>
      </button>
      <p>Change Array Size</p>
      <button onClick={handleMergeSort}>
        <p>Merge Sort</p>
      </button>
      <p>Sort</p>
    </div>
  );
};


export default Navbar