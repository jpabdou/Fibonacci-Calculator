import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

describe('Home', ()=>{
    it('renders a heading', ()=>{
        render(<Home />);
        
        const heading = screen.getByRole('heading', {
            name: /welcome to fibonacci calculator/i
        });

        expect(heading).toBeInTheDocument();
    })
})
