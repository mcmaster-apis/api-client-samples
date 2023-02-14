import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";

import CareerFilter from "../src/components/CareerFilter";

jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

afterEach(cleanup);

describe("CareerFilter UI render correctly", () => {
  const mockOnSelect = jest.fn();

  it("without careers data, dropdown menu should be empty", async () => {
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

  it("with mockCareers, dropdown menu should be populated", async () => {
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockCareers,
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
  it("change career filter to Undergraduate", async () => {
    const mockOnSelect = jest.fn();

    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockCareers,
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

    // expect onSelect to be triggered once with "UGRD" as 1st param
    // and an Event object as 2nd param (hence expect.anything())
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, "UGRD", expect.anything());
  });
});
