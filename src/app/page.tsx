"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Visualizer from "@/components/Visualizer";
import { useEffect, useState } from "react";

export default function Home() {
  const [array, setArray] = useState<number[]>([]);


  const generateRandomArray = (size: number): number[] => {
    // Generate an array of random integers between 1 and 90 (adjust as needed)
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 4);
  };
  
  useEffect(() =>{
    const newArray = generateRandomArray(10)
    setArray(newArray)
  },[]);

  const generateNewArray = () => {
    const newArray = generateRandomArray(10)
    setArray(newArray)
  }


  return (
    <main className="">
      <Navbar generateNewArray={generateNewArray}/>
      <Visualizer array={array}/>

    </main>
  );
}
