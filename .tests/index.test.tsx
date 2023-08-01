import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../src/app/page";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock/async";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock('next/navigation', () => ({
    ...require('next-router-mock'),
    usePathname: () => '/'
}));

function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

afterEach(() => {
    jest.clearAllMocks();
});


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

    it('shows form for number input and accepts inputs', async ()=>{

        mockRouter.push("/");
        const {user} = setup(<Home />);
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

    it('shows error for negative number input', async ()=>{
        const mockSubmit = jest.fn();

        mockRouter.push("/");
        const {user} = setup(<Home />);
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

    it('accepts no input for text and shows error for no input submission on firing', async ()=>{
        const mockSubmit = jest.fn();

        mockRouter.push("/");
        const {user} = setup(<Home />);
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

})
