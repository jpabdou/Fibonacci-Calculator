import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../src/app/page";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

describe('Home', ()=>{
    it('renders a heading with welcome message', ()=>{
        render(<Home />);
        
        const heading = screen.getByRole('heading', {
            name: /welcome to fibonacci calculator/i
        });

        expect(heading).toBeInTheDocument();
    });

    it('shows form for number input and accepts inputs', ()=>{
        render(<Home />);
        const numInput = screen.getByPlaceholderText(/enter number here/i);
        const submitBtn = screen.getByText(/submit/i);

        fireEvent.keyDown(numInput, {key: '2', code: 'Digit2'});
        fireEvent.keyDown(numInput, {key: '0', code: 'Digit0'});
        fireEvent.click(submitBtn);

        

    })
})
