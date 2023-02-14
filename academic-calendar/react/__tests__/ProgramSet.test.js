import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ProgramSet from "../src/components/ProgramSet";
import ProgramDetails from "../src/components/ProgramDetails";

// mocking the api call
// TODO: use MSW instead for simplier syntax
jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

// Mock ProgramDetails
jest.mock("../src/components/ProgramDetails", () => {
  return jest.fn(() => null);
});

afterEach(cleanup);

describe("Test UI render correctly", () => {
  it("without data, should not have contents", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: null,
      });
    });
    render(<ProgramSet career={''} faculty={''} />)
    expect(document.querySelector(".accordion").innerHTML).toBe("");
  })

  it("with data, should render a list of accordions", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: global.mockData.mockPrograms,
      });
    });
    render(<ProgramSet career={'UGRD'} faculty={'02'} />)
    expect(API).toHaveBeenCalledWith('programs?careerCode=UGRD&facultyCode=02');
    expect(await screen.findByRole('button', { name: "UENBE" })).toBeTruthy();
    expect(await screen.findByRole('button', { name: "TEST2" })).toBeTruthy();

    // make sure the right props are passed into ProgramDetails
    expect(ProgramDetails).toHaveBeenNthCalledWith(1, { program: global.mockData.mockPrograms.programs[0] }, expect.anything())
    expect(ProgramDetails).toHaveBeenNthCalledWith(2, { program: global.mockData.mockPrograms.programs[1] }, expect.anything())
  })
})