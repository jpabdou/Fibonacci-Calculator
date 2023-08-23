import {GET} from "../src/app/api/fibcalc/[n_value]/route"
import {seedInit, seedDestroy} from "../prisma/test-seed";
import { prisma } from "../src/app/public/prisma";

describe('test server', ()=>{
    describe('[GET] api/fibcalc/calcuate', ()=>{
        const expectedRes1 = {
            "data": [
                {
                    "id": 0,
                    "fibonacci_number": "0"
                },
                {
                    "id": 1,
                    "fibonacci_number": "1"
                }
            ]
        };

        const expectedRes2 = {
            "data": [
                {
                    "id": 0,
                    "fibonacci_number": "0"
                },
                {
                    "id": 1,
                    "fibonacci_number": "1"
                },
                {
                    "id": 2,
                    "fibonacci_number": "1"
                },                
                {
                    "id": 3,
                    "fibonacci_number": "2"
                },
                {
                    "id": 4,
                    "fibonacci_number": "3"
                }
            ],
            "createdCount": 3
        };

        const expectedRes3 = {
            "data": [
                {
                    "id": 0,
                    "fibonacci_number": "0"
                }
            ]
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
                const req : Request = new Request("http://localhost:3000/api/fibcalc/2?testing=true");
                const res = await GET(req, {params: {n_value: "2"}});
    
                const {data} = await res.json();
    
                expect(data).toEqual(expectedRes1.data);
                expect(res.status).toBe(200);
            } catch (e) {
                console.log(e);
            };
        });

        it('should return a successful 200 response for the first 5 Fibonacci numbers and created entries count', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/5?testing=true");
                const res = await GET(req, {params: {n_value: "5"}});
    
                const {data, createdCount} = await res.json();
    
                expect(res.status).toBe(200);
                expect(data).toEqual(expectedRes2.data);
                expect(createdCount).toEqual(expectedRes2.createdCount);
            } catch (e) {
                console.log(e);
            };           
        });
        
        it('should return a failed 400 response for string input as the param', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/wrong?testing=true");
                const res = await GET(req, {params: {n_value: "wrong"}});
    
                const {message} = await res.json();
    
                expect(res.status).toBe(400);
                expect(message).toEqual("Input was not a number, please input a number >= 0.");
            } catch (e) {
                console.log(e);
            };   
        });

        it('should return a successful 200 response for the first Fibonacci number for 0 input as the param', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/0?testing=true");
                const res = await GET(req, {params: {n_value: "0"}});
    
    
                const {data} = await res.json();
    
                expect(res.status).toBe(200);
                expect(data).toEqual(expectedRes3.data);
            } catch (e) {
                console.log(e);
            };   
        });

        it('should return a failed 400 response for float input as the param', async ()=>{
            try {
                const req : Request = new Request("http://localhost:3000/api/testcalc/3.0?testing=true");
                const res = await GET(req, {params: {n_value: "3.0"}});
    
                const {message} = await res.json();
    
                expect(res.status).toBe(400);
                expect(message).toEqual("Please input a whole number. No decimals.");
            } catch (e) {
                console.log(e);
            };   
        });        
        
})
})
