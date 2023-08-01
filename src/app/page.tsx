"use client";
import { useForm } from 'react-hook-form';

type FormValues = {
  n_value: number;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));
  const calculateFibonacci = async (num: number) => {
    const calcReq = {
      "method": "GET",
      'Content-Type': 'application/json'
    };
    try {
      let url : string = `api/fibcalc/${num}`;
      const response = await fetch(url, calcReq);
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="flex h-screen flex-col items-center text-center justify-evenly">
        <h1 className='text-3xl font-bold'>Welcome to Fibonacci Calculator!</h1>
        <form onSubmit={onSubmit} className= "h-1/2 flex flex-col flex-wrap justify-evenly">
            <p>Enter the number <i>n</i> for the list of Fibonacci sequence you want to display up to F<sub>n</sub> (Greater than or equal to 0):<br/>
              Note: Fibonacci numbers greater than the 76th number will not be displayed due to JavaScript/TypeScript limitations.
            </p>
            
            <input type="number" placeholder="Enter number here" {...register("n_value", {required: true, min: 0})} />
            {errors.n_value?.type === "min" && (
              <p role="alert">Number greater than or equal to 0 is required.</p>
            )}
            {errors.n_value?.type === "required" && (
              <p role="alert">Number is required.</p>
            )}

            <input className={"self-center w-52 rounded-md border-2 p-3 border-black object-left bg-lime-700 text-white cursor-pointer"} type="submit" />
          </form>
          <p>{}</p>
    </main>
  )
}
