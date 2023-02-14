import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import FacultyFilter from "../src/components/FacultyFilter";

//set up a mock API call
jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

afterEach(cleanup);

describe("FacultyFilter UI render correctly", () => {
  //mock onSelect function
  const mockOnSelect = jest.fn();

  it("without careers data", async () => {
    //define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: null,
      });
    });

    render(<FacultyFilter faculty={""} onSelect={mockOnSelect} />);

    const filterButton = screen.getByRole("button", { name: "Select Faculty" });
    expect(filterButton).toBeTruthy();

    fireEvent.click(filterButton);

    // the dropdown items may not render right away,
    // hence we use waitFor()
    await waitFor(() => {
      screen.findByLabelText("filter-menu");
    });

    expect(screen.getByLabelText("filter-menu")).toBeTruthy();
    expect(screen.getByLabelText("filter-menu").innerHTML).toBe("");
  });

  it("with mockCareers", async () => {
    //define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockFaculties,
      });
    });

    render(<FacultyFilter faculty={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalled();

    const filterButton = screen.getByRole("button", { name: "Select Faculty" });
    expect(filterButton).toBeTruthy();

    fireEvent.click(filterButton);

    const options = await screen.findAllByTestId("faculty-option");
    expect(options[0].innerHTML).toBe("Faculty of Science");
    expect(options[1].innerHTML).toBe("Faculty of Engineering");
  });
});

describe("Changing career filter", () => {
  //mock onSelect function
  const mockOnSelect = jest.fn();

  it("change career filter to Undergraduate", async () => {
    //define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockFaculties,
      });
    });

    render(<FacultyFilter faculty={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Select Faculty" }));

    // the dropdown items may not render right away,
    // hence we use waitFor()
    await waitFor(() => {
      screen.getByText("Faculty of Science");
    });

    expect(screen.getByText("Faculty of Science")).toBeTruthy();
    fireEvent.click(screen.getByText("Faculty of Science"));

    // expect onSelect to be triggered once with "02" as 1st param
    // and an Event object as 2nd param (hence expect.anything())
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, "02", expect.anything());
  });
});
