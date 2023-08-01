"use client";

import React, {useState, useEffect} from "react";
import { FibonacciData } from "@/app/types/FibonacciData";
import Link from "next/link";
type Props = {
  params: { n_value: string }
}

export default function Results( {params} : Props) {
  const [results, setResults] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculateFibonacci = async (num: number) => {
    const calcReq = {
      "method": "GET",
      'Content-Type': 'application/json'
    };
    try {
      console.log(num)
      let url : string = `/api/fibcalc/${num}`;
      const response = await fetch(url, calcReq);
      const fibonacciResults : {data: FibonacciData[], createdCount?: number} = await response.json();
      console.log(fibonacciResults)
      return fibonacciResults.data
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    let n = parseInt(params.n_value);

    if (Number.isNaN(n)) {
      setError("Entry was not a number. Please navigate back to home.");
    }
    else if (n <0) {
      return (
        setError("Number less than 0. Please navigate back to home."));
    } else {
      calculateFibonacci(n)
      .then(res=>{
        let fibArr : number[] = [];
        fibArr = res!.map(ele=>{return ele.fibonacci_number});

        setResults(JSON.stringify(fibArr));
      })
      .catch(e=>console.error(e));
    };
  },[]);
  
  return (
    <main className="flex h-screen flex-col items-center text-center justify-evenly">
      {
        results.length ===0 ? 
          <h1>{error}</h1> :
          <>
            <h1 className='text-3xl font-bold'>{`Here are the results for the first ${params.n_value} numbers in the Fibonacci sequence!`}</h1>
            <p>{results.slice(1,results.length-1)}</p>
        </>
      }
      <Link href={"/"}>Home</Link>
     </main>
  )
}
