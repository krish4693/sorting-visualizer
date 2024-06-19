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

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// In-place merge function
const mergeInPlace = async (
  array: number[],
  leftStart: number,
  leftEnd: number,
  rightEnd: number,
  delay: number,
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
    await sleep(delay);
  }
};

// In-place merge sort
const mergeSortInPlace = async (
  array: number[],
  start: number,
  end: number,
  delay: number,
  updateArray: (array: number[], start: number | null, end: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>
) => {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  await mergeSortInPlace(array, start, mid, delay, updateArray, isCancelledRef);
  await mergeSortInPlace(array, mid + 1, end, delay, updateArray, isCancelledRef);
  await mergeInPlace(array, start, mid, end, delay, updateArray, isCancelledRef);

  // After merge is complete, mark the sorted portion of the array
  if (start === 0 && end === array.length - 1) {
    updateArray([...array], null, null, new Set(array.keys()));
  } else {
    updateArray([...array], null, null, new Set());
  }
};

const bubbleSort = async (
  array: number[],
  delay: number,
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
        await sleep(delay);
      }
    }
    sortedIndices.add(array.length - i - 1);
    updateArray([...array], null, null, sortedIndices);
  }
  return array;
};

const insertionSort = async (
  array: number[],
  delay: number,
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
      await sleep(delay);
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
  delay: number,
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
      await sleep(delay);
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      updateArray([...array], i, minIndex, sortedIndices);
      await sleep(delay);
    }
    sortedIndices.add(i);
  }

  sortedIndices.add(array.length - 1);
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

  useEffect(() => {
    const newArray = generateRandomArray(10); // Initial array size
    setArray(newArray);
  }, []);

  const updateArray = (array: number[], idx1: number | null, idx2: number | null, sortedIndices: Set<number>) => {
    setArray(array);
    setIndex1(idx1);
    setIndex2(idx2);
    setSortedIndices(new Set(sortedIndices));
  };

  const generateNewArray = (size: number) => {
    if (isSorting) return; // Prevent generating new array during sorting
    isCancelledRef.current = true; // Cancel ongoing sort
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setIndex1(null);
    setIndex2(null);
    setSortedIndices(new Set());
  };

  const handleMergeSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting merge sort
    const newArray = [...array];
    await mergeSortInPlace(newArray, 0, newArray.length - 1, 10, updateArray, isCancelledRef);
    updateArray(newArray, null, null, new Set(newArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleBubbleSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting bubble sort
    const sortedArray = await bubbleSort([...array], 10, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleInsertionSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting insertion sort
    const sortedArray = await insertionSort([...array], 50, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  const handleSelectionSort = async () => {
    if (isSorting) return; // Prevent starting another sort
    setIsSorting(true); // Set sorting flag
    isCancelledRef.current = false; // Reset cancellation flag before starting selection sort
    const sortedArray = await selectionSort([...array], 10, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
    setIsSorting(false); // Reset sorting flag after completion
  };

  return (
    <div className={dottedmatrix.className}>
      <Navbar
        generateNewArray={generateNewArray}
        handleMergeSort={handleMergeSort}
        handleBubbleSort={handleBubbleSort}
        handleInsertionSort={handleInsertionSort}
        handleSelectionSort={handleSelectionSort}
        isSorting={isSorting} // Pass the sorting state to Navbar
      />
      <Visualizer array={array} index1={index1} index2={index2} sortedIndices={sortedIndices} />
    </div>
  );
}
