import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const fibonacciBase : Prisma.FibonacciCreateInput[] = [
    {
        id: 0,
        fibonacci_number: 0
    },
    {
        id: 1,
        fibonacci_number: 1
    }
];

export async function seedInit() {
    console.log(`Start seeding test database...`);
    for (const num of fibonacciBase) {
      const fibonacciEntry = await prisma.testFibonacci.create({
        data: num,
      });
      console.log(`Created fibonacci entry in test DB with id: ${fibonacciEntry.id}`);
    };
    console.log(`Test database seeding finished.`);
  };

export async function seedDestroy() {
    let deleteRes = await prisma.testFibonacci.deleteMany({});
    console.log(`Delected ${deleteRes.count} entries in test database`);
    };
