import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import axios from 'axios'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import FacultyFilter from "../src/components/FacultyFilter";
import ProgramExplorator from "../src/components/ProgramExplorator";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const mockFaculty = {
    "id": "mockId",
    "careers": [{
        "id": "mockId/UGRD",
        "description": "Undergraduate",
        "code": "UGRD",
        "shortDescription": "Undergrad"
    }, {
        "id": "mockId/GRAD",
        "code": "GRAD",
        "description": "Graduate",
        "shortDescription": "Graduate"
    }]
}

describe('UI render correctly', () => {
    const mockHandlCareerChange = jest.fn();
    it('on component emounting DOM', () => {
        act(() => {
            render(<CareerFilter career={''} onSelect={mockHandlCareerChange} />), container
        })

        const filterButton = document.querySelector('#career-filter')
        expect(filterButton.innerHTML).toBe("Select Career");
    })
})

describe('Changing career filter', () => {

    it('no career filter, state.career should be empty', () => {
        act(() => {
            render(<ProgramExplorator />, container)
        })
        const careerState = document.querySelector('#selected-career');
        expect(careerState.innerHTML).toBe("")
    })

    it('set career filter to UGRD', async () => {
        jest.spyOn(axios, "get").mockImplementation(() => {
            Promise.resolve({
                json: () => Promise.resolve(mockCareer)
            })
        })
        await act(async () => {
            render(<ProgramExplorator />, container)
        })
        const careerState = document.querySelector('#selected-career');
        expect(careerState.innerHTML).toBe("")

        const filterButton = document.querySelector('#career-filter');

        await act(async () => {
            await fireEvent(filterButton, new MouseEvent('click', { bubbles: true }))
        })

        const undergradDropdownItem = await screen.findByText('Undergraduate')

        await act(async () => {
            await fireEvent(undergradDropdownItem, new MouseEvent('click', { bubbles: true }))
        })

        expect(careerState.innerHTML).toBe("UGRD")
    })
})