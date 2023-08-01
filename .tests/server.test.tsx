import {GET} from "../src/app/api/testcalc/[n_value]/route"
import {seedInit, seedDestroy} from "../prisma/test-seed";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

describe('test server', ()=>{
    describe('[GET] api/testcalc/calcuate', ()=>{
        const expectedRes1 = {
            "data": [
                {
                    "id": 0,
                    "fibonacci_number": 0
                },
                {
                    "id": 1,
                    "fibonacci_number": 1
                }
            ]
        };

        const expectedRes2 = {
            "data": [
                {
                    "id": 0,
                    "fibonacci_number": 0
                },
                {
                    "id": 1,
                    "fibonacci_number": 1
                },
                {
                    "id": 2,
                    "fibonacci_number": 1
                },                
                {
                    "id": 3,
                    "fibonacci_number": 2
                },
                {
                    "id": 4,
                    "fibonacci_number": 3
                }
            ],
            "createdCount": 3
        };




        beforeAll(async ()=>{
            try {
                await seedDestroy();
                await prisma.$disconnect();
            } catch (e) {
                console.error(e);
                await prisma.$disconnect(); 
            }
             
                    

        });

        beforeEach(async ()=>{
            try {
                await seedInit();
                await prisma.$disconnect();
            } catch (e) {
                console.error(e);
                await prisma.$disconnect(); 
            }
             
        });

        afterEach( async ()=>{
            try {
                await seedDestroy();
                await prisma.$disconnect();
            } catch (e) {
                console.error(e);
                await prisma.$disconnect(); 
            }
             
        });

        it('should return a successful 200 response for the first 2 Fibonacci numbers', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/2");
                const res = await GET(req, {params: {n_value: "2"}});
    
                const {data} = await res.json();
    
                expect(data).toEqual(expectedRes1.data);
                expect(res.status).toBe(200);
            } catch (e) {
                console.log(e);
            };

        });

        it('should return a successful 200 response for the first 5 Fibonacci numbers and create entries', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/5");
                const res = await GET(req, {params: {n_value: "5"}});
    
                const {data, createdCount} = await res.json();
    
                expect(res.status).toBe(200);
                expect(data).toEqual(expectedRes2.data);
                expect(createdCount).toEqual(expectedRes2.createdCount);
            } catch (e) {
                console.log(e);
            };


            
        });        
})
})
