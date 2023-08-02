"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormValues = {
  n_value: number;
};

export default function Home() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();

  // On successful form submission, push user to results route "/results/[n_value]", where n_value is then number of Fibonacci number requested
  const onSubmit = (data: FormValues) => {
    router.push(`/results/${data.n_value}`)};


  return (
    <main className="flex h-screen flex-col items-center text-center justify-evenly">
        <h1 className='text-3xl font-bold'>Welcome to Fibonacci Calculator!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className= "h-1/2 flex flex-col flex-wrap justify-evenly">
            <p>Enter the number <i>n</i> for the number of Fibonacci numbers you want to display up to F<sub>n-1</sub> (Enter a number greater than 0):<br/>
              Note: Fibonacci numbers greater than the 47th number will not be displayed due to database limitations.
            </p>
            {/* react hook form input with validation */}
            <input type="number" placeholder="Enter number here" {...register("n_value", {required: true, min: 1})} />
            {/* Errors display as p elements upon clicking submit button with an error in form input with matching type to the validation rules */}
            {errors.n_value?.type === "min" && (
              <p role="alert">Number greater than or equal to 0 is required.</p>
            )}
            {errors.n_value?.type === "required" && (
              <p role="alert">Number is required.</p>
            )}
            <button className={"self-center w-52 rounded-md border-2 p-3 border-black object-left bg-lime-700 text-white cursor-pointer"} type="submit">SUBMIT</button>
          </form>
    </main>
  )
}
