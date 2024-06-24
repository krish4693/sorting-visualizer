"use client";

import Navbar from "@/components/Navbar";
import Visualizer from "@/components/Visualizer";
import { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";

const dottedmatrix = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 87) + 4);
};

const sleep = (getDelay: () => number) => {
  return new Promise((resolve) => setTimeout(resolve, getDelay()));
};

// In-place merge function
const mergeInPlace = async (
  array: number[],
  leftStart: number,
  leftEnd: number,
  rightEnd: number,
  getDelay: () => number,
  updateArray: (array: number[], start: number | null, end: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
) => {
  let left = leftStart;
  let right = leftEnd + 1;

  while (left <= leftEnd && right <= rightEnd) {
    if (isCancelledRef.current) {
      return; // Check cancellation flag
    }

    if (array[left] <= array[right]) {
      left++;
    } else {
      const temp = array[right];
      for (let k = right; k > left; k--) {
        array[k] = array[k - 1];
      }
      array[left] = temp;

      left++;
      leftEnd++;
      right++;
    }

    updateArray([...array], left, right, new Set());
    const num = getDelay()
    console.log(num)
    await sleep(getDelay);
  }
};

// In-place merge sort
const mergeSortInPlace = async (
  array: number[],
  start: number,
  end: number,
  getDelay: () => number,
  updateArray: (array: number[], start: number | null, end: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
) => {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  await mergeSortInPlace(array, start, mid, getDelay, updateArray, isCancelledRef);
  await mergeSortInPlace(array, mid + 1, end, getDelay, updateArray, isCancelledRef);
  await mergeInPlace(array, start, mid, end, getDelay, updateArray, isCancelledRef);

  // After merge is complete, mark the sorted portion of the array
  if (start === 0 && end === array.length - 1) {
    updateArray([...array], null, null, new Set(array.keys()));
  } else {
    updateArray([...array], null, null, new Set());
  }
};

const bubbleSort = async (
  array: number[],
  getDelay: () => number,
  updateArray: (array: number[], index1: number | null, index2: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
): Promise<number[]> => {
  const sortedIndices = new Set<number>();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (isCancelledRef.current) {
        return array; // Check cancellation flag
      }

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        updateArray([...array], j, j + 1, sortedIndices);
        await sleep(getDelay);
      }
    }
    sortedIndices.add(array.length - i - 1);
    updateArray([...array], null, null, sortedIndices);
  }
  return array;
};

const insertionSort = async (
  array: number[],
  getDelay: () => number,
  updateArray: (array: number[], index1: number | null, index2: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
): Promise<number[]> => {
  const sortedIndices = new Set<number>();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      if (isCancelledRef.current) {
        return array; // Check cancellation flag
      }

      array[j + 1] = array[j];
      updateArray([...array], j, j + 1, sortedIndices);
      await sleep(getDelay);
      j = j - 1;
    }
    array[j + 1] = key;

    // Mark the current element as sorted
    sortedIndices.add(i);
    updateArray([...array], null, null, sortedIndices);
  }

  // After sorting is complete, mark all elements as sorted
  updateArray([...array], null, null, new Set(array.keys()));
  return array;
};

const selectionSort = async (
  array: number[],
  getDelay: () => number,
  updateArray: (array: number[], index1: number | null, index2: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
): Promise<number[]> => {
  const sortedIndices = new Set<number>();

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (isCancelledRef.current) {
        return array; // Check cancellation flag
      }

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      updateArray([...array], minIndex, j, sortedIndices);
      await sleep(getDelay);
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      updateArray([...array], i, minIndex, sortedIndices);
      await sleep(getDelay);
    }
    sortedIndices.add(i);
  }

  sortedIndices.add(array.length - 1);
  updateArray([...array], null, null, sortedIndices);
  return array;
};

const heapSort = async (
  array: number[],
  getDelay: () => number,
  updateArray: (array: number[], index1: number | null, index2: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
): Promise<number[]> => {
  const sortedIndices = new Set<number>();

  const heapify = async (n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      updateArray([...array], i, largest, sortedIndices);
      await sleep(getDelay);
      await heapify(n, largest);
    }
  };

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    if (isCancelledRef.current) {
      return array;
    }
    await heapify(array.length, i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    if (isCancelledRef.current) {
      return array;
    }

    [array[0], array[i]] = [array[i], array[0]];
    sortedIndices.add(i);
    updateArray([...array], 0, i, sortedIndices);
    await sleep(getDelay);

    await heapify(i, 0);
  }

  sortedIndices.add(0);
  updateArray([...array], null, null, sortedIndices);
  return array;
};


export default function Home() {
  const [array, setArray] = useState<number[]>([]);
  const [index1, setIndex1] = useState<number | null>(null);
  const [index2, setIndex2] = useState<number | null>(null);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const isCancelledRef = useRef<boolean>(false);
  const [delay, setDelay] = useState<number>(10);
  const [size, setSize] = useState<number>(50);

  useEffect(() => {
    const newArray = generateRandomArray(50); // Initial array size
    setArray(newArray);
  }, []);

  const updateArray = (array: number[], idx1: number | null, idx2: number | null, sortedIndices: Set<number>) => {
    setArray(array);
    setIndex1(idx1);
    setIndex2(idx2);
    setSortedIndices(new Set(sortedIndices));
  };

  const getDelay = () => delay;

  const generateNewArray = (size: number) => {
    if (isSorting) return; // Prevent generating new array during sorting
    isCancelledRef.current = true; // Cancel ongoing sort
    const newArray = generateRandomArray(size);
    setSize(size);
    setArray(newArray);
    setIndex1(null);
    setIndex2(null);
    setSortedIndices(new Set());
  };
  const stopSorting = () => {
    isCancelledRef.current = true;
    setIsSorting(false);
  };

  const handleMergeSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting merge sort
    const newArray = [...array];
    await mergeSortInPlace(newArray, 0, newArray.length - 1, getDelay, updateArray, isCancelledRef);
    updateArray(newArray, null, null, new Set(newArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleBubbleSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting bubble sort
    const sortedArray = await bubbleSort([...array], getDelay, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleInsertionSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting insertion sort
    const sortedArray = await insertionSort([...array], getDelay, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleSelectionSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting selection sort
    const sortedArray = await selectionSort([...array], getDelay, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleHeapSort = async () => {
    isCancelledRef.current = false;
    setIsSorting(true);
    await heapSort(array, getDelay, updateArray, isCancelledRef);
    setIsSorting(false);
  };

  return (
    <div className={dottedmatrix.className}>
      <Navbar
        generateNewArray={generateNewArray}
        handleMergeSort={handleMergeSort}
        handleBubbleSort={handleBubbleSort}
        handleInsertionSort={handleInsertionSort}
        handleSelectionSort={handleSelectionSort}
        handleHeapSort={handleHeapSort}
        isSorting={isSorting} // Pass the sorting state to Navbar
        delay={delay}
        size={size}
        setDelay={setDelay}
        stopSorting={stopSorting}
      />
      <Visualizer array={array} index1={index1} index2={index2} sortedIndices={sortedIndices} />
    </div>
  );
}
