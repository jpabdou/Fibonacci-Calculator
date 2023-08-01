"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import {calculateFibonacci} from "@/app/api/calculateFibonacci/calculateFibonacci";
type Props = {
  params: { n_value: string }
}

export default function Results( {params} : Props) {
  const [results, setResults] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(()=>{
    if (params.n_value.includes('.')) setError('Please input a whole number. No decimals.');

    let n = Number(params.n_value);
    if (Number.isNaN(n)) {
      setError("Entry was not a number. Please navigate back to home.");
    }
    else if (n <=0) {
      return (
        setError("Number entered was less than or equal to 0. Please navigate back to home."));
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
      <div>
      <h1 className='text-3xl font-bold my-2'>Results Page</h1>
      <Link data-testid="link" href={"/"} className="underline font-bold">Home</Link>
      </div>
      {
        results.length ===0 ? 
          <h1>{error}</h1> :
          <div>
            <h2 className='text-2xl font-bold my-3'>{`Here are the results for the first ${params.n_value} numbers in the Fibonacci sequence:`}</h2>
            <p className="font-bold" data-testid="results">{results.slice(1,results.length-1)}</p>
        </div>
      }
      
     </main>
  )
}
