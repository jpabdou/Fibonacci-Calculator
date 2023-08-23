import { NextResponse } from 'next/server';
import { prisma } from '../../../public/prisma';
import { calculate } from '@/app/public/calculate';
import { FibonacciData } from '@/app/types/FibonacciData';

export async function GET(request: Request, {params} : {params: {n_value: string}}) {
    if (request.method !== "GET") {
        return NextResponse.json({message: "Method Not Allowed"})
    }
    try {
        // Conditional to ensure floats aren't used in the API call. Ensures consistent behavior of the API based on the request params.
        if (params.n_value.includes('.')) return NextResponse.json({message: "Please input a whole number. No decimals."}, {status: 400});
        // n_value is equal to the number of Fibonacci numbers requested
        let n_value : number = Number(params.n_value);
        // Conditional to ensure non-integers return an error message.
        if (Number.isNaN(n_value)) return NextResponse.json({message: "Input was not a number, please input a number >= 0."}, {status: 400});
        // Conditional to ensure that non-zero, non-negative numbers return an error message. Can't request for 0 or negative numbers in a sequence.
        if (n_value < 1) n_value = 1;
        // Set the n_value to be no higher than 79. This is due to the fact that a Fibonacci number greater than Fibonacci(78) exceeds the Number.MAX_SAFE_INTEGER, 2^53-1. 
        if (n_value > 79) n_value = 79;
        
        // searchParams can contain a parameter "testing" that indicates the route should be accessing the testFibonacci table for testing, not the Fibonacci table for users
        const { searchParams } = new URL(request.url!);
        let testing : string = searchParams.get("testing") || "";

        let fibonacciNumbers : FibonacciData[] = []

        // Conditional deterimining if testing route is used or not and using the prisma model corresponding to the testFibonacci table and actual Fibonacci table exposed to users accordingly
        if (testing.length > 0) {
            // findMany call of SQLite Fibonacci table, a 2 column table of id, which corresponds to the index within the Fibonacci sequence or n in Fibonacci(n), and of fibonacci_number, which corresponds to the Fibonacci number at n, or Fibonacci(n)
            fibonacciNumbers = await prisma.testFibonacci.findMany(
                {
                    where: 
                    {
                        id: 
                        {
                            lt: n_value
                        }
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
                );
        } else {
            fibonacciNumbers = await prisma.fibonacci.findMany(
                {
                    where: 
                    {
                        id: 
                        {
                            lt: n_value
                        }
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
                );
        }



        // Stores the length of returned array from the findMany call, fibonacciNumbers. The purpose of the originalIndex value is to check if new entries are added during the calculation of Fibonacci(n_value) and indicates where the index where these new entries begin
        const originalIndex : number = fibonacciNumbers.length;

        // Conditional in case the database was deleted. Starts calculations and repopulates the database with entries for the base cases of the Fibonacci sequence, Fibonacci(0) and Fibonacci(1)
        if (fibonacciNumbers.length === 0) {
            fibonacciNumbers = [{id: 0, fibonacci_number: "0"}, {id: 1, fibonacci_number: "1"}]
        };

        // Function that pushes new Fibonacci entries to fibonacciNumbers when the Fibonacci(n_value) hasn't been returned from the database. Leaves array unmodified if Fibonacci(n_value) was included in the array.
        calculate(n_value, fibonacciNumbers);

        // Conditional that checks if new entries were added to fibonacciNumbers from the calculation function. If so, creates an array of create calls to the Fibonacci table and processes them in a transaction. This is due to the fact that Prisma does not support SQLite bulk insert calls.
        if (originalIndex !== fibonacciNumbers.length) {
            let inserts = [];
            for (let entry of fibonacciNumbers.slice(originalIndex)) {
                if (testing.length > 0) {
                    inserts.push(prisma.testFibonacci.create({data: entry }));
                } else {
                    inserts.push(prisma.fibonacci.create({data: entry }));
                }

            }
            let transactionRes = await prisma.$transaction(inserts);
            // Returns response as a json with a data key with a value of a arry of Fibonacci entry objects up to Fibonacci(n_value) and a createdCount key with a number value equal to the number of new entries added to the database
            return NextResponse.json({data:fibonacciNumbers, createdCount: transactionRes.length});
        }

        // Returns response as a json with a data key with a value of a arry of Fibonacci entry objects up to Fibonacci(n_value)
        return NextResponse.json({data: fibonacciNumbers});
        
        } catch (e) {
            console.error(e);
            return NextResponse.json({message: e}, {status: 500});
    };
};
