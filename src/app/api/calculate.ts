import { FibonacciData } from "../types/FibonacciData";

// Function that takes in n_value number equal to the number of Fibonacci numbers to be calculated and an array of sorted (in ascending order) Fibonacci data objects {id: number of the Fibonacci value, fibonacci_number: number equal to Fibonacci(id)}
export function calculation (n_value : number, array : FibonacciData[]) {
    // If the array already contains the target length (n_value), then the function is terminated with no modification to the array.
    // Otherwise, a while loop is started with the calculation of the next Fibonacci number calculated based on the sum of the last two numbers. 
    // This result is added to the array as a data object and the loop continues until it reaches the target array length
    while (array.length < n_value) {
        let index : number = array.length-1;
        let newFibonacci : number = array[index].fibonacci_number + array[index-1].fibonacci_number;
        let newEntry : {id: number, fibonacci_number: number} = {id: array.length, fibonacci_number: newFibonacci };
        array.push(newEntry);
    }

};
