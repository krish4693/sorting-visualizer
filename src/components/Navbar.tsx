import React from 'react'
import { Slider } from "@/components/ui/slider"

const Navbar = ({ generateNewArray, handleMergeSort, handleBubbleSort }) => {
  return (
    <div className='flex items-center justify-around'>
      <button onClick={() => generateNewArray(10)}>
        <p>Generate New Array</p>
      </button>
      <p>Change Array Size</p>
      <Slider
        defaultValue={[5]}
        max={50}
        step={1}
        className='w-[30%]'
        onValueChange={(newValue) => generateNewArray(newValue[0])}
      />
      <button onClick={handleMergeSort}>
        <p>Merge Sort</p>
      </button>
      <button onClick={handleBubbleSort}>
        <p>Bubble Sort</p>
      </button>
    </div>
  );
};

export default Navbar;
