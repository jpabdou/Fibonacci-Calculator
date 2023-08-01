import { FibonacciData } from "@/app/types/FibonacciData";
export async function calculateFibonacci (num: number) {
    const calcReq = {
      "method": "GET",
      'Content-Type': 'application/json'
    };
    try {
      let url : string = `/api/fibcalc/${num}`;
      const response = await fetch(url, calcReq);
      const fibonacciResults : {data: FibonacciData[], createdCount?: number} = await response.json();
      return fibonacciResults.data
    } catch (e) {
      console.error(e)
    }
  }
