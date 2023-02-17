import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";

import CareerFilter from "../src/components/CareerFilter";

jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

const mockOnSelect = jest.fn();

afterEach(cleanup);

describe("CareerFilter UI render correctly", () => {

  it("without careers data, dropdown menu should be empty", async () => {
    // mock and spy on console.error
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    // define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: null,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalledWith("careers");

    // expect console.error to be called with a TypeError
    // wrapped in waitFor because it needs to wait for the API to resolve
    await waitFor(() => {
      expect(errorSpy.mock.calls[0][0]).toBeInstanceOf(TypeError);
    })

    const filterButton = screen.getByText("Select Career");
    expect(filterButton).toBeTruthy();

    // expect the dropdown menu is empty
    fireEvent.click(filterButton);
    const filterMenu = await screen.findByLabelText("filter-menu");
    expect(filterMenu).toBeTruthy();
    expect(filterMenu.innerHTML).toBe("");
  });

  it("with mockCareers, dropdown menu should be populated", async () => {
    // define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockCareers,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalledWith("careers");

    const filterButton = screen.getByText("Select Career");
    expect(filterButton).toBeTruthy();

    fireEvent.click(filterButton);

    const options = await screen.findAllByTestId("career-option");
    expect(options[0].innerHTML).toBe("Undergraduate");
    expect(options[1].innerHTML).toBe("Graduate");
  });
});

describe("Changing career filter", () => {
  it("change career filter to Undergraduate", async () => {
    // define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockCareers,
      });
    });

    render(<CareerFilter career={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalledWith("careers");

    fireEvent.click(screen.getByRole("button", { name: "Select Career" }));

    const option1 = await screen.findByText("Undergraduate");
    expect(option1).toBeTruthy();
    fireEvent.click(option1);

    // expect onSelect to be triggered once with "UGRD" as 1st param
    expect(mockOnSelect.mock.calls[0][0]).toBe("UGRD");
  });
});
