-- CreateTable
CREATE TABLE "Fibonacci" (
    "id" INTEGER NOT NULL,
    "fibonacci_number" TEXT NOT NULL,

    CONSTRAINT "Fibonacci_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestFibonacci" (
    "id" INTEGER NOT NULL,
    "fibonacci_number" TEXT NOT NULL,

    CONSTRAINT "TestFibonacci_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fibonacci_id_key" ON "Fibonacci"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TestFibonacci_id_key" ON "TestFibonacci"("id");
