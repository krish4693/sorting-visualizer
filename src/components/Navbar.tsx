import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from './ui/button';

interface NavbarProps {
  generateNewArray: (value: number) => void;
  handleMergeSort: () => void;
  handleBubbleSort: () => void;
  handleInsertionSort: () => void;
  handleSelectionSort: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ generateNewArray, handleMergeSort, handleBubbleSort, handleInsertionSort, handleSelectionSort }) => {
  const [currentValue, setCurrentValue] = useState<number>(10);

  return (
    <div className='flex items-center justify-around h-11'>
      <Button onClick={() => generateNewArray(currentValue)} className='button'>
        <p>Generate New Array</p>
      </Button>
      <Slider
        defaultValue={[5]}
        max={50}
        step={1}
        className='w-[30%]'
        onValueChange={(newValue) => {
          setCurrentValue(newValue[0]);
          generateNewArray(newValue[0]);
        }}
      />
      <Button onClick={handleMergeSort} className='button'>
        <p>Merge Sort</p>
      </Button>
      <Button onClick={handleBubbleSort} className='button'>
        <p>Bubble Sort</p>
      </Button>
      <Button onClick={handleInsertionSort} className='button'>
        Insertion Sort
      </Button>
      <Button onClick={handleSelectionSort} className='button'>
        Selection Sort
      </Button>
    </div>
  );
};

export default Navbar;
