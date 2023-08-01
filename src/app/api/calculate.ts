import { FibonacciData } from "../types/FibonacciData";

export function calculation (n_value : number, array : FibonacciData[]) {
    while (array.length<n_value) {
        let index : number = array.length-1;
        let newFibonacci : number = array[index].fibonacci_number + array[index-1].fibonacci_number;
        let newEntry : {id: number, fibonacci_number: number} = {id: array.length, fibonacci_number: newFibonacci };
        array.push(newEntry);
    }

};
