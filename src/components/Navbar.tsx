import React from 'react';
import {Slider} from '@/components/ui/slider'; // Adjust path as needed
import { Button } from './ui/button'; // Adjust path as needed

interface NavbarProps {
  generateNewArray: (value: number) => void;
  handleMergeSort: () => void;
  handleBubbleSort: () => void;
  handleInsertionSort: () => void;
  handleSelectionSort: () => void;
  isSorting: boolean;
  delay: number;
  setDelay: React.Dispatch<React.SetStateAction<number>>;
  stopSorting: () => void; // Function to stop sorting
}

const Navbar: React.FC<NavbarProps> = ({
  generateNewArray,
  handleMergeSort,
  handleBubbleSort,
  handleInsertionSort,
  handleSelectionSort,
  isSorting,
  delay,
  setDelay,
  stopSorting,
}) => {
  return (
    <div className="flex items-center justify-around h-11">
      <Button
        onClick={() => generateNewArray(50)}
        className="button"
        disabled={isSorting}
      >
        <p>Generate New Array</p>
      </Button>
      <div className="text-white">Change Size</div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className="w-[10%]"
        onValueChange={(newValue) => {
          if (!isSorting) {
            generateNewArray(newValue[0]);
          }
        }}
      />
      <div className="text-white">Change Speed</div>
      <Slider
        className="w-[10%]"
        min={10}
        max={1000}
        defaultValue={[delay]}
        step={10}
        onValueChange={(newValue) => {
          setDelay(newValue[0]);
        }}
      />
      <Button onClick={handleMergeSort} className="button" disabled={isSorting}>
        <p>Merge Sort</p>
      </Button>
      <Button onClick={handleBubbleSort} className="button" disabled={isSorting}>
        <p>Bubble Sort</p>
      </Button>
      <Button onClick={handleInsertionSort} className="button" disabled={isSorting}>
        <p>Insertion Sort</p>
      </Button>
      <Button
        onClick={handleSelectionSort}
        className="button"
        disabled={isSorting}
      >
        <p>Selection Sort</p>
      </Button>
      <Button onClick={stopSorting} className="button" disabled={!isSorting}>
        <p>Stop Sorting</p>
      </Button>
    </div>
  );
};

export default Navbar;
