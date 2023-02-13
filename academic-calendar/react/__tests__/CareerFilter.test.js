// eslint-disable-next-line no-unused-vars
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";

import CareerFilter from "../src/components/CareerFilter";

//import ProgramExplorator from "../src/components/ProgramExplorator";

jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

// jest.mock("../src/components/FacultyFilter", () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return <div></div>;
//     },
//   };
// });

const mockCareers = {
  id: "mockId",
  careers: [
    {
      id: "mockId/UGRD",
      description: "Undergraduate",
      code: "UGRD",
      shortDescription: "Undergrad",
    },
    {
      id: "mockId/GRAD",
      code: "GRAD",
      description: "Graduate",
      shortDescription: "Graduate",
    },
  ],
};

//let container = null;

// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

afterEach(cleanup);

describe("CareerFilter UI render correctly", () => {
  const mockOnSelect = jest.fn();

  it("without careers data", async () => {
    //jest.setTimeout(5000);
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: null,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    const filterButton = screen.getByText("Select Career");
    expect(filterButton).toBeTruthy();

    fireEvent.click(filterButton);
    await waitFor(() => {
      screen.findByLabelText("filter-menu");
    });
    expect(screen.getByLabelText("filter-menu")).toBeTruthy();
    expect(screen.getByLabelText("filter-menu").innerHTML).toBe("");
  });

  it("with mockCareers", async () => {
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: mockCareers,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalled();

    const filterButton = screen.getByText("Select Career");
    expect(filterButton).toBeTruthy();

    fireEvent.click(filterButton);

    const options = await screen.findAllByTestId("career-option");
    expect(options[0].innerHTML).toBe("Undergraduate");
    expect(options[1].innerHTML).toBe("Graduate");
  });
});

describe("Changing career filter", () => {
  // it("no career filter, state.career should be empty", async () => {
  //   API.mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       data: mockCareers,
  //     });
  //   });
  //   await act(async () => {
  //     render(<ProgramExplorator />, container);
  //   });
  //   const careerState = document.querySelector("#selected-career");
  //   expect(careerState.innerHTML).toBe("");
  // });

  // it("set career filter to UGRD", async () => {
  //   API.mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       data: mockCareers,
  //     });
  //   });

  //   await act(async () => {
  //     render(<ProgramExplorator />, container);
  //   });

  //   const careerState = document.querySelector("#selected-career");
  //   expect(careerState.innerHTML).toBe("");

  //   const filterButton = document.querySelector("#career-filter");

  //   await act(async () => {
  //     fireEvent(filterButton, new MouseEvent("click", { bubbles: true }));
  //   });

  //   const undergradDropdownItem = await screen.findByText("Undergraduate");

  //   await act(async () => {
  //     fireEvent(
  //       undergradDropdownItem,
  //       new MouseEvent("click", { bubbles: true })
  //     );
  //   });

  //   expect(careerState.innerHTML).toBe("UGRD");
  // });

  it("change career filter to Undergraduate", async () => {
    const mockOnSelect = jest.fn();

    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: mockCareers,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Select Career" }));

    await waitFor(() => {
      screen.getByText("Undergraduate");
    });
    expect(screen.getByText("Undergraduate")).toBeTruthy();
    fireEvent.click(screen.getByText("Undergraduate"));
    expect(mockOnSelect).toHaveBeenCalled();
  });
});
