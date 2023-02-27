import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ProgramExplorator from "../src/components/ProgramExplorator";
import ProgramSet from "../src/components/ProgramSet";

afterEach(cleanup);

//set up a mock module for CareerFilter
jest.mock("../src/components/CareerFilter", () => {
  const PropTypes = require('prop-types')
  const MockCareerFilter = (props) => {
    const onClick = () => {
      props.onSelect("UGRD");
    };
    return <button data-testid="mock-career-filter" onClick={onClick}></button>;
  };
  MockCareerFilter.propTypes = {
    onSelect: PropTypes.func.isRequired
  }
  return MockCareerFilter;
});

//set up a mock module for FacultyFilter
jest.mock("../src/components/FacultyFilter", () => {
  const PropTypes = require('prop-types')
  const MockFacultyFilter = (props) => {
    const onClick = () => {
      props.onSelect("02");
    };
    return (
      <button data-testid="mock-faculty-filter" onClick={onClick}></button>
    );
  };

  MockFacultyFilter.propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  return MockFacultyFilter;
});

//set up a mock module for ProgramSet
jest.mock("../src/components/ProgramSet", () => {
  return jest.fn(() => null);
})

describe("Test selecting filters", () => {
  it("no filter, state.career and state.faculty should be empty", async () => {
    render(<ProgramExplorator />);

    expect(screen.queryByText("UGRD")).not.toBeInTheDocument();
    expect(screen.queryByText("02")).not.toBeInTheDocument();
  });

  it("set career filter to UGRD", async () => {
    render(<ProgramExplorator />);
    expect(screen.queryByText("UGRD")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("mock-career-filter"));
    expect(screen.getByText("UGRD")).toBeInTheDocument();
  });

  it("set faculty filter to 02", async () => {
    render(<ProgramExplorator />);
    expect(screen.queryByText("02")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("mock-faculty-filter"));
    expect(screen.getByText("02")).toBeInTheDocument();
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
