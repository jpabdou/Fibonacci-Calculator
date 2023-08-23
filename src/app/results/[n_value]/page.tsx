"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import {calculateFibonacci} from "@/app/public/calculateFibonacci";

// n_value is the length of the list of Fibonacci numbers requested
type Props = {
  params: { n_value: string }
}

export default function Results( {params} : Props) {
  // results state is set as a string to be updated with a stringified array for simple slice operation to display comma-separated Fibonacci numbers for the user
  const [results, setResults] = useState<string>("");
  // error message state is a string for telling the user that they set the route with the incorrect params and to return to the Home page. 
  // Initially, set as a Loading... message as it will be visible to the user while the results are loaded from the asynchronous API call due to the ternary logic in the return statement 
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("Loading...");
  useEffect(()=>{
    // Series of conditionals in case the user changes the /results/[n_value] route so that it would create a bad request in the API
    // Check if user entered the params directly in the route as a float and sets error message accordingly
    if (params.n_value.includes('.')) setError('Please input a whole number. No decimals.');

    let n = Number(params.n_value);
    // Check if user entered the params directly in the route as a non-number (string) and sets error message accordingly
    if (Number.isNaN(n)) {
      setError("Entry was not a number. Please navigate back to home.");
    } else {
      // Fetches array of Fibonacci number data objects, maps the array to an array of Fibonacci numbers, converts the array to a string through JSON.stringify, and sets the results state as the value
      calculateFibonacci(n)
        .then(res=>{
          let fibArr : string[] = [];
          fibArr = res!.map(ele=>{return Number(ele.fibonacci_number)});
          setLoading("");
          setError("");
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
        /* If no results are returned, then this is due to the API not being called as a result of the error setting conditonals. In this case, the error message is displayed. Otherwise, the comma-separated list of Fibonacci numbers is displayed. */
        error.length !==0 ? 
          <h1>{error}</h1> :
          <div className="w-3/4 flex flex-wrap flex-col">
            <h2 className='text-2xl font-bold my-3'>{`Here are the results for the first ${Number(params.n_value) > 79 ? 79 : params.n_value} numbers in the Fibonacci sequence:`}</h2>
            <p className="font-bold break-all" data-testid="results">{results.slice(1,results.length-1)}</p>
        </div>
      }
      {
        loading.length > 0 && <h1>{loading}</h1>
      }
      
     </main>
  )
}
