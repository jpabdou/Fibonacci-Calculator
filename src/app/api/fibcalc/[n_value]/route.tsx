import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { calculation } from '@/app/api/calculate';
let prisma = new PrismaClient();

export async function GET(request: Request, {params} : {params: {n_value: string}}) {
    if (request.method !== "GET") {
        return NextResponse.json({message: "Method Not Allowed"})
    }
    try {

        let n_value : number = parseInt(params.n_value);
        if (Number.isNaN(n_value)) return NextResponse.json({message: "Input was not a number, please input a number >= 0"});
        if (n_value < 1) return NextResponse.json({message: "Number greater than or equal to 0 only"});
        if (n_value > 76) n_value = 76;
        
        let fibonacciNumbers = await prisma.fibonacci.findMany(
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

        if (fibonacciNumbers.length === 0) {
            fibonacciNumbers = [{id: 0, fibonacci_number: 0}, {id: 1, fibonacci_number: 1}]
        };

        const originalIndex : number = fibonacciNumbers.length;

        calculation(n_value, fibonacciNumbers);

        if (originalIndex !== fibonacciNumbers.length) {
            let inserts = [];
            for (let entry of fibonacciNumbers.slice(originalIndex)) {
                let result = prisma.fibonacci.create({data: entry });
                inserts.push(result);
            }
            let transactionRes = await prisma.$transaction(inserts);

            return NextResponse.json({data:fibonacciNumbers, createdCount: transactionRes.length});
        }

        return NextResponse.json({data: fibonacciNumbers});
        
        } catch (e) {
            console.error(e);
            return NextResponse.json({message: e});
    };
};
