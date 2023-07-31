-- CreateTable
CREATE TABLE "TestFibonacci" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fibonacci_number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TestFibonacci_id_key" ON "TestFibonacci"("id");
