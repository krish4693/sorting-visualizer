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
  delay:number; // Added isSorting
  setDelay: React.Dispatch<React.SetStateAction<number>> // Added isSorting prop

}

const Navbar: React.FC<NavbarProps> = ({
  generateNewArray,
  handleMergeSort,
  handleBubbleSort,
  handleInsertionSort,
  handleSelectionSort,
  isSorting, // Destructure isSorting
  delay,
  setDelay // Added setDelay prop
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
      <div className='text-white '>Change Size</div>
      <Slider
        defaultValue={[delay]}
        max={65}
        step={1}
        className='w-[10%]'
        onValueChange={(newValue) => {
          setCurrentValue(newValue[0]);
          if (!isSorting) { // Only generate a new array if not sorting
            generateNewArray(newValue[0]);
          }
        }}
      />
      <div className='text-white '>Change Speed</div>
      {/* controls delay slider below */}
      <Slider className='w-[10%]'                 
        min={10}
        max={1000}
        defaultValue={[10]}
        step={10}
        onValueChange={(newValue) =>{
          console.log(newValue);
          setDelay(newValue[0]);
        } }
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
