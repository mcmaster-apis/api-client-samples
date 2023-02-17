import "@testing-library/jest-dom";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ProgramExplorator from "../src/components/ProgramExplorator";
import ProgramSet from "../src/components/ProgramSet";

//set up a mock API call
jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

afterEach(cleanup);

//set up a mock module for CareerFilter
jest.mock("../src/components/CareerFilter", () => {
  const MockCareerFilter = (props) => {
    const onClick = () => {
      props.onSelect("UGRD");
    };
    return <button data-testid="mock-career-filter" onClick={onClick}></button>;
  };
  return MockCareerFilter;
});

//set up a mock module for FacultyFilter
jest.mock("../src/components/FacultyFilter", () => {
  const MockFacultyFilter = (props) => {
    const onClick = () => {
      props.onSelect("02");
    };
    return (
      <button data-testid="mock-faculty-filter" onClick={onClick}></button>
    );
  };

  return MockFacultyFilter;
});

//set up a mock module for ProgramSet
jest.mock("../src/components/ProgramSet", () => {
  return jest.fn(() => null);
})

// define mocked API behaviour
API.mockImplementation(() => {
  return Promise.resolve({
    data: null,
  });
});

describe("Test selecting filters", () => {
  it("no filter, state.career and state.faculty should be empty", async () => {
    render(<ProgramExplorator />);
    expect((await screen.findByTestId("selected-career")).innerHTML).toBe("");
    expect((await screen.findByTestId("selected-faculty")).innerHTML).toBe("");
  });

  it("set career filter to UGRD", async () => {
    render(<ProgramExplorator />);
    const careerState = screen.getByTestId("selected-career");
    expect(careerState.innerHTML).toBe("");

    fireEvent.click(screen.getByTestId("mock-career-filter"));
    expect(screen.getByTestId("selected-career").innerHTML).toBe("UGRD");
  });

  it("set faculty filter to 02", async () => {
    render(<ProgramExplorator />);
    const careerState = screen.getByTestId("selected-faculty");
    expect(careerState.innerHTML).toBe("");

    fireEvent.click(screen.getByTestId("mock-faculty-filter"));
    expect(screen.getByTestId("selected-faculty").innerHTML).toBe("02");
  });

  it("should pass the right params to ProgramSet", async () => {
    render(<ProgramExplorator />);
    fireEvent.click(screen.getByTestId("mock-faculty-filter"));
    fireEvent.click(screen.getByTestId("mock-career-filter"));
    expect(await screen.findByText("UGRD")).toBeInTheDocument();
    expect(await screen.findByText("02")).toBeInTheDocument();
    expect(ProgramSet).lastCalledWith({ faculty: "02", career: "UGRD" }, expect.anything())
  })
});

