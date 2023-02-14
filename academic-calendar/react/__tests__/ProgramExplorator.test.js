import "@testing-library/jest-dom";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import PropTypes from "prop-types";
import ProgramExplorator from "../src/components/ProgramExplorator";

//set up a mock API call
jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

afterEach(cleanup);

//set up a mock module
jest.mock("../src/components/CareerFilter", () => {
  const MockCareerFilter = (props) => {
    const onClick = () => {
      props.onSelect("UGRD");
    };
    return <button data-testid="mock-career-filter" onClick={onClick}></button>;
  };
  return MockCareerFilter;
});

//set up a mock module
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

describe("Test selecting career filter", () => {
  it("no career filter, state.career should be empty", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: null,
      });
    });
    render(<ProgramExplorator />);
    expect((await screen.findByTestId("selected-career")).innerHTML).toBe("");
  });

  it("set career filter to UGRD", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: null,
      });
    });
    render(<ProgramExplorator />);
    const careerState = screen.getByTestId("selected-career");
    expect(careerState.innerHTML).toBe("");

    fireEvent.click(screen.getByTestId("mock-career-filter"));

    expect(screen.getByTestId("selected-career").innerHTML).toBe("UGRD");
  });
});
