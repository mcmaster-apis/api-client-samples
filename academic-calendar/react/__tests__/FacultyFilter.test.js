import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import FacultyFilter from "../src/components/FacultyFilter";

//set up a mock API call
jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

// mock onSelect function
const mockOnSelect = jest.fn();

afterEach(cleanup)

describe("FacultyFilter UI render correctly", () => {

  it("without careers data", async () => {
    // mock and spy on console.error
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    // define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: null,
      });
    });

    render(<FacultyFilter faculty={""} onSelect={mockOnSelect} />);

    // expect console.error to be called with a TypeError error
    // wrapped in waitFor because it needs to wait for the API to resolve
    await waitFor(() => {
      expect(errorSpy.mock.calls[0][0]).toBeInstanceOf(TypeError);
    })

    const filterButton = screen.getByRole("button", { name: "Select Faculty" });
    expect(filterButton).toBeTruthy();

    // expect the dropdown menu is empty
    fireEvent.click(filterButton);
    const filterMenu = await screen.findByLabelText("filter-menu");
    expect(filterMenu).toBeTruthy();
    expect(filterMenu.innerHTML).toBe("");
  });

  it("with mockCareers", async () => {
    // define the behavior of the mocked API call
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

  it("change career filter to Undergraduate", async () => {
    // define the behavior of the mocked API call
    API.mockImplementationOnce(() => {
      return Promise.resolve({
        data: global.mockData.mockFaculties,
      });
    });

    render(<FacultyFilter faculty={""} onSelect={mockOnSelect} />);

    expect(API).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Select Faculty" }));

    const option1 = await screen.findByText("Faculty of Science")

    expect(option1).toBeTruthy();
    fireEvent.click(option1);

    // expect onSelect to be triggered once with "02" as 1st param
    expect(mockOnSelect.mock.calls[0][0]).toBe("02");
  });
});