import { PrismaClient, Prisma } from '@prisma/client';
import { seedInit } from './test-seed';

const prisma = new PrismaClient();

export const fibonacciBase: Prisma.FibonacciCreateInput[] = [
    {
        id: 0,
        fibonacci_number: "0"
    },
    {
        id: 1,
        fibonacci_number: "1"
    }
];

async function main() {
    console.log(`Start seeding ...`);
    for (const num of fibonacciBase) {
      const fibonacciEntry = await prisma.fibonacci.create({
        data: num,
      });
      console.log(`Created fibonacci entry with id: ${fibonacciEntry.id}`);
    };
    console.log(`Seeding finished.`);
    await seedInit();
  };
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
