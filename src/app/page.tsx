"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Visualizer from "@/components/Visualizer";
import { useEffect, useState } from "react";

const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 87) + 4);
};

const merge = (left: number[], right: number[]): number[] => {
  let arr: number[] = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift() as number);
    } else {
      arr.push(right.shift() as number);
    }
  }
  return [...arr, ...left, ...right];
};

const mergeSort = (array: number[]): number[] => {
  if (array.length <= 1) {
    return array;
  }

  const pivot = Math.floor(array.length / 2);
  const left = array.slice(0, pivot);
  const right = array.slice(pivot);

  return merge(mergeSort(left), mergeSort(right));
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const bubbleSort = async (
  array: number[],
  delay: number,
  updateArray: (array: number[], index1: number, index2: number) => void
): Promise<number[]> => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        updateArray([...array], j, j + 1);
        await sleep(delay);
      }
    }
  }
  return array;
};

export default function Home() {
  const [array, setArray] = useState<number[]>([]);
  const [index1, setIndex1] = useState<number | null>(null);
  const [index2, setIndex2] = useState<number | null>(null);

  useEffect(() => {
    const newArray = generateRandomArray(10); // Initial array size
    setArray(newArray);
  }, []);

  const updateArray = (array: number[], idx1: number | null, idx2: number | null) => {
    setArray(array);
    setIndex1(idx1);
    setIndex2(idx2);
  };

  const generateNewArray = (size: number) => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setIndex1(null);
    setIndex2(null);
  };

  const handleMergeSort = () => {
    const sortedArray = mergeSort([...array]);
    setArray(sortedArray);
    setIndex1(null);
    setIndex2(null);
  };

  const handleBubbleSort = () => {
    bubbleSort([...array], 500, updateArray)
      .then((sortedArray) => {
        setArray(sortedArray);
        setIndex1(null);
        setIndex2(null);
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
      <Visualizer array={array} index1={index1} index2={index2} />
    </main>
  );
}
