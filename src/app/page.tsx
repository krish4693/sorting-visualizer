"use client";

import Navbar from "@/components/Navbar";
import Visualizer from "@/components/Visualizer";
import { useEffect, useState, useRef } from "react";

const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 87) + 4);
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const merge = async (
  left: number[],
  right: number[],
  delay: number,
  updateArray: (array: number[], start: number | null , end: number | null , sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>,
  array: number[],
  startIndex: number
): Promise<number[]> => {
  let result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (isCancelledRef.current) {
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)); // Check cancellation flag
    }

    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    // Call updateArray with the current state of the result and the indices involved
    const newArray = [...array];
    newArray.splice(startIndex, result.length, ...result);
    updateArray(newArray, leftIndex, rightIndex, new Set(newArray.slice(0, startIndex + result.length).map((_, i) => i)));
    await sleep(delay);
  }

  // Concatenate the remaining elements
  result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

  // Final update after merging
  const finalArray = [...array];
  finalArray.splice(startIndex, result.length, ...result);
  updateArray(finalArray, null, null, new Set(finalArray.slice(0, startIndex + result.length).map((_, i) => i)));
  await sleep(delay);

  return result;
};

const mergeSort = async (
  array: number[],
  delay: number,
  updateArray: (array: number[], start: number | null, end: number | null, sortedIndices: Set<number>) => void,
  isCancelledRef: React.MutableRefObject<boolean>,
  startIndex = 0
): Promise<number[]> => {
  if (array.length <= 1) {
    return array;
  }

  const pivot = Math.floor(array.length / 2);
  const left = array.slice(0, pivot);
  const right = array.slice(pivot);

  const sortedLeft = await mergeSort(left, delay, updateArray, isCancelledRef, startIndex);
  const sortedRight = await mergeSort(right, delay, updateArray, isCancelledRef, startIndex + pivot);

  const mergedArray = await merge(sortedLeft, sortedRight, delay, updateArray, isCancelledRef, array, startIndex);

  // After merge is complete, mark the entire array as sorted
  updateArray(mergedArray, null, null, new Set(mergedArray.keys()));
  return mergedArray;
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

export default function Home() {
  const [array, setArray] = useState<number[]>([]);
  const [index1, setIndex1] = useState<number | null>(null);
  const [index2, setIndex2] = useState<number | null>(null);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
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
    isCancelledRef.current = true; // Cancel ongoing sort
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setIndex1(null);
    setIndex2(null);
    setSortedIndices(new Set());
  };

  const handleMergeSort = async () => {
    isCancelledRef.current = false; // Reset cancellation flag before starting merge sort
    const sortedArray = await mergeSort([...array], 100, updateArray, isCancelledRef);
    updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
  };

  const handleBubbleSort = () => {
    isCancelledRef.current = false; // Reset cancellation flag before starting bubble sort
    bubbleSort([...array], 50, updateArray, isCancelledRef)
      .then((sortedArray) => {
        updateArray(sortedArray, null, null, new Set(sortedArray.keys()));
      })
      .catch((error) => {
        console.error("Error in bubbleSort:", error);
      });
  };

  return (
    <main className="">
      <Navbar
        generateNewArray={generateNewArray}
        handleMergeSort={handleMergeSort}
        handleBubbleSort={handleBubbleSort}
      />
      <Visualizer array={array} index1={index1} index2={index2} sortedIndices={sortedIndices} />
    </main>
  );
}
