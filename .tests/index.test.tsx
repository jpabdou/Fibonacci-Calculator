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
    it('renders a heading with welcome message', ()=>{
        render(<Home />);
        
        const heading = screen.getByRole('heading', {
            name: /welcome to fibonacci calculator/i
        });
        const numInput = screen.getByPlaceholderText(/enter number here/i);

        const submitBtn = screen.getByTestId("submit");

        expect(heading).toBeInTheDocument();

        expect(numInput).toBeInTheDocument();

        expect(submitBtn).toBeInTheDocument();
    });

    it('shows form for number input and accepts inputs', async ()=>{
        mockRouter.push("/");
        const {user} = setup(<Home />)
        const numInput = screen.getByPlaceholderText(/enter number here/i);
        const submitBtn = screen.getByTestId("submit");

        await user.type(numInput, "20");

        expect(screen.getByDisplayValue('20')).toBeInTheDocument();
        fireEvent.click(submitBtn);

        // expect(mockRouter.pathname).toEqual('/results/2')
        // await waitFor (()=>{expect(mockRouter).toMatchObject({
        //     pathname: '/results/20',
        //   });})
        // await waitFor(() => expect(screen.getByText(/0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181/i)).toBeInTheDocument());

    
})
})
