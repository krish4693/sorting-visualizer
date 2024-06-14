import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useState } from 'react';

const Navbar = ({ generateNewArray, handleMergeSort, handleBubbleSort,handleInsertionSort,handleSelectionSort }) => {
  const [currentValue,setCurrentValue]=useState<number>(10)
  return (
    <div className='flex items-center justify-around'>
      <button onClick={() => generateNewArray(currentValue)}>
        <p>Generate New Array</p>
      </button>
      <p>Change Array Size</p>
      <Slider
        defaultValue={[5]}
        max={50}
        step={1}
        className='w-[30%]'
        onValueChange={(newValue) => {
          setCurrentValue(newValue[0])
          generateNewArray(newValue[0])

        }}
      />
      <button onClick={handleMergeSort}>
        <p>Merge Sort</p>
      </button>
      <button onClick={handleBubbleSort}>
        <p>Bubble Sort</p>
      </button>
      <button onClick={handleInsertionSort}>
        Insertion Sort
      </button>
      <button onClick={handleSelectionSort}>
        Selection Sort
      </button>
    </div>
  );
};

export default Navbar;
