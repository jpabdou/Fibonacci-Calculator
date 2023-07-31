-- CreateTable
CREATE TABLE "Fibonacci" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fibonacci_number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fibonacci_id_key" ON "Fibonacci"("id");
