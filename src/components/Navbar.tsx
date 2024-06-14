import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useState } from 'react';

const Navbar = ({ generateNewArray, handleMergeSort, handleBubbleSort,handleInsertionSort,handleSelectionSort }) => {
  const [currentValue,setCurrentValue]=useState<number>(10)
  return (
    <div className='flex items-center justify-around h-11'>
      <button onClick={() => generateNewArray(currentValue)} className='button'>
        <p>Generate New Array</p>
      </button>
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
      <button onClick={handleMergeSort} className='button'>
        <p>Merge Sort</p>
      </button>
      <button onClick={handleBubbleSort} className='button'>
        <p>Bubble Sort</p>
      </button>
      <button onClick={handleInsertionSort} className='button'>
        Insertion Sort
      </button>
      <button onClick={handleSelectionSort} className='button'>
        Selection Sort
      </button>

    </div>
  );
};

export default Navbar;
