import { FibonacciData } from "../types/FibonacciData";

// Function that takes in n_value number equal to the number of Fibonacci numbers to be calculated and an array of sorted (in ascending order) Fibonacci data objects {id: number of the Fibonacci value, fibonacci_number: number equal to Fibonacci(id)}
export function calculate (n_value : number, array : FibonacciData[]) {
    // If the array already contains the target length (n_value), then the function is terminated with no modification to the array.
    // Otherwise, a while loop is started with the calculation of the next Fibonacci number calculated based on the sum of the last two numbers. 
    // This result is added to the array as a data object and the loop continues until it reaches the target array length
    // Only risk of this logic is if earlier Fibonacci number entries were deleted for any reason. Can include a step where the function iterates over the entire array to check for missing entries, but it does add more time and make the calculation more costly.
    while (array.length < n_value) {
        let index : number = array.length-1;
        let newFibonacci : number = Number(array[index].fibonacci_number) + Number(array[index-1].fibonacci_number);
        let newEntry : {id: number, fibonacci_number: string} = {id: array.length, fibonacci_number: String(newFibonacci) };
        array.push(newEntry);
    }

};
