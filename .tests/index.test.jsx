import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../src/app/page";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import mockRouter from "next-router-mock/async";
import Results from "../src/app/results/[n_value]/page";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import * as api from "../src/app/api/calculateFibonacci/calculateFibonacci"


jest.mock('next/navigation', () => ({
    ...require('next-router-mock'),
    usePathname: () => '/'
}));

jest.mock("../src/app/api/calculateFibonacci/calculateFibonacci");

describe('Home', ()=>{
    it('renders a heading with welcome message, form input, and submit button', ()=>{
        render(<Home />);
        
        const heading = screen.getByRole('heading', {
            name: /welcome to fibonacci calculator/i
        });
        const numInput = screen.getByPlaceholderText(/enter number here/i);

        const submitBtn = screen.getByRole("button");

        expect(heading).toBeInTheDocument();

        expect(numInput).toBeInTheDocument();

        expect(submitBtn).toBeInTheDocument();
    });

    it('shows form for number input and accepts inputs for number and shows no alerts when submitting', async ()=>{

        mockRouter.push("/");
        render(<Home />);
        const numInput = screen.getByPlaceholderText(/enter number here/i);
        const submitBtn = screen.getByRole("button");
        fireEvent.input(numInput, {
            target: {
              value: "20",
            },
          })

        expect(screen.getByDisplayValue('20')).toBeInTheDocument();
        fireEvent.click(submitBtn);
        await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    });

    it('shows error when submitting negative number input', async ()=>{
        const mockSubmit = jest.fn();

        mockRouter.push("/");
        render(<Home />);
        const numInput = screen.getByPlaceholderText(/enter number here/i);
        const submitBtn = screen.getByRole("button");
        fireEvent.input(numInput, {
            target: {
              value: "-1",
            },
          })

        expect(screen.getByDisplayValue('-1')).toBeInTheDocument();
        fireEvent.click(submitBtn);
        await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(1));
        expect(screen.getByText('Number greater than or equal to 0 is required.')).toBeInTheDocument();
        expect(mockSubmit).not.toBeCalled();
        
    });

    it('accepts no input for text and shows error for no input submission when submitting', async ()=>{
        const mockSubmit = jest.fn();

        mockRouter.push("/");
        render(<Home />);
        const numInput = screen.getByPlaceholderText(/enter number here/i);
        const submitBtn = screen.getByRole("button");
        fireEvent.input(numInput, {
            target: {
              value: "wrong",
            },
          })

        expect(screen.queryByDisplayValue('wrong')).not.toBeInTheDocument();
        fireEvent.click(submitBtn);
        await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(1));
        expect(screen.getByText('Number is required.')).toBeInTheDocument();
        expect(mockSubmit).not.toBeCalled();
    });

    it('displays Results page with first 2 Fibonacci numbers and clicking on home link returns to home page', async ()=>{
        const expectedRes1 = [
                {
                    "id": 0,
                    "fibonacci_number": 0
                },
                {
                    "id": 1,
                    "fibonacci_number": 1
                }
            ]
        ;

       api.calculateFibonacci.mockResolvedValue(expectedRes1)
       mockRouter.push("/results/2");
       render(<Results params={ {n_value: "2"} } />, 
       { wrapper: MemoryRouterProvider });
        expect(screen.getByText("Results Page")).toBeInTheDocument();
        const results  = await screen.findByTestId("results");
        expect(results).toBeInTheDocument();
        const homeButton = screen.getByTestId('link');
        expect(homeButton).toBeInTheDocument();
        fireEvent.click(homeButton);
        waitFor(()=>expect(mockRouter.pathname).toEqual('/')) 
    });

    it('displays error message in Results page for negative value as the params', async ()=>{
     mockRouter.push("/results/-1");
     render(<Results params={ {n_value: "-1"} } />, 
     { wrapper: MemoryRouterProvider });
      expect(screen.getByText("Results Page")).toBeInTheDocument();
      expect(screen.getByText("Number entered was less than or equal to 0. Please navigate back to home.")).toBeInTheDocument();

  });

  it('displays error message in Results page for non-integer as the params', async ()=>{
    mockRouter.push("/results/wrong");
    render(<Results params={ {n_value: "wrong"} } />, 
    { wrapper: MemoryRouterProvider });
     expect(screen.getByText("Results Page")).toBeInTheDocument();
     expect(screen.getByText("Entry was not a number. Please navigate back to home.")).toBeInTheDocument();

 });

})
