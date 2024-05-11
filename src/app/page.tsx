"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Visualizer from "@/components/Visualizer";
import { useEffect, useState } from "react";

export default function Home() {
  const [array, setArray] = useState<number[]>([]);


  const generateRandomArray = (size: number): number[] => {
    // Generate an array of random integers between 1 and 90 (adjust as needed)
    return Array.from({ length: size }, () => Math.floor(Math.random() * 87) + 4);
  };
  
  


  useEffect(() =>{
    const newArray = generateRandomArray(10)
    setArray(newArray)
  },[]);

  const generateNewArray = () => {
    const newArray = generateRandomArray(10)
    setArray(newArray)
  }


  function merge(left, right) {
    let arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    // Concatenate any leftover elements (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right];
}

  function mergeSort(array) {
    if (array.length <= 1) {
        return array; // Base case: already sorted or empty array
    }

    const pivot = Math.floor(array.length / 2);
    const left = array.slice(0, pivot); // First half of the array
    const right = array.slice(pivot); // Second half of the array

    // Recursively sort and merge the subarrays
    return merge(mergeSort(left), mergeSort(right));
}

  const handleMergeSort = () => {
    const newArray=mergeSort([...array])


    setArray(newArray)
  }

  function bubbleSort(array: number[]): number[] {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
  }

  const handleBubbleSort =() => {
    const newArray=bubbleSort([...array])


    setArray(newArray)
  }

  return (
    <main className="">
      <Navbar generateNewArray={generateNewArray} handleMergeSort={handleMergeSort} handleBubbleSort={handleBubbleSort}/>
      <Visualizer array={array}/>

    </main>
  );
}
