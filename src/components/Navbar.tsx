import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from './ui/button';

interface NavbarProps {
  generateNewArray: (value: number) => void;
  handleMergeSort: () => void;
  handleBubbleSort: () => void;
  handleInsertionSort: () => void;
  handleSelectionSort: () => void;
  isSorting: boolean; // Added isSorting prop
}

const Navbar: React.FC<NavbarProps> = ({
  generateNewArray,
  handleMergeSort,
  handleBubbleSort,
  handleInsertionSort,
  handleSelectionSort,
  isSorting, // Destructure isSorting
}) => {
  const [currentValue, setCurrentValue] = useState<number>(10);

  return (
    <div className='flex items-center justify-around h-11'>
      <Button
        onClick={() => generateNewArray(currentValue)}
        className='button'
        disabled={isSorting} // Disable button if sorting
      >
        <p>Generate New Array</p>
      </Button>
      <Slider
        defaultValue={[5]}
        max={65}
        step={1}
        className='w-[30%]'
        onValueChange={(newValue) => {
          setCurrentValue(newValue[0]);
          if (!isSorting) { // Only generate a new array if not sorting
            generateNewArray(newValue[0]);
          }
        }}
      />
      <Button
        onClick={handleMergeSort}
        className='button'
        disabled={isSorting} // Disable button if sorting
      >
        <p>Merge Sort</p>
      </Button>
      <Button
        onClick={handleBubbleSort}
        className='button'
        disabled={isSorting} // Disable button if sorting
      >
        <p>Bubble Sort</p>
      </Button>
      <Button
        onClick={handleInsertionSort}
        className='button'
        disabled={isSorting} // Disable button if sorting
      >
        <p>Insertion Sort</p>
      </Button>
      <Button
        onClick={handleSelectionSort}
        className='button'
        disabled={isSorting} // Disable button if sorting
      >
        <p>Selection Sort</p>
      </Button>
    </div>
  );
};

export default Navbar;
