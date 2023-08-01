import { FibonacciData } from "@/app/types/FibonacciData";

// moved to separate file within api folder instead of a callable function within component to allow for import for mocking in Jest
export async function calculateFibonacci (num: number) {
    const calcReq = {
      "method": "GET",
      'Content-Type': 'application/json'
    };
    try {
        //num used as params in url for /api/fibcalc/[n_value] api call to determine the number of entries (n_value) in the Fibonacci table to find
        let url : string = `/api/fibcalc/${num}`;
        const response = await fetch(url, calcReq);
        // response from fetch to /api/fibcalc/[n_value] api call resolves to an object with a data key and created count key. 
        // Data key has a value of an array of objects. Each object has an id key with the value equal to n for Fibonacci(n) and a fibonacci_number key with the value equal to the Fibonacci number, F(n). Data array is sorted in ascending order by id.
        // createdCount has a number value equal to the number of new Fibonacci data entries added to the Fibonacci table.
        const fibonacciResults : {data: FibonacciData[], createdCount?: number} = await response.json();
        return fibonacciResults.data;
    } catch (e) {
      console.error(e)
    }
  }
