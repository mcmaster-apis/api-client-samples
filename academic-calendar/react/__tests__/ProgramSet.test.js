import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import ProgramSet from "../src/components/ProgramSet";

jest.mock("../src/api", () => jest.fn());
const API = require("../src/api");

afterEach(cleanup);

describe("Test UI render correctly", () => {
  it("without data, should not render", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: null,
      });
    });
    render(<ProgramSet career={''} faculty={''} />)
    expect(document.querySelector(".accordion").innerHTML).toBe("");
  })
  it("with data, should render list of accordions", async () => {
    API.mockImplementation(() => {
      return Promise.resolve({
        data: global.mockData.mockPrograms,
      });
    });
    render(<ProgramSet career={'UGRD'} faculty={'02'} />)
    expect(API).toHaveBeenCalledWith('programs?careerCode=UGRD&facultyCode=02');
    expect(await screen.findByRole('button', { name: "UENBE" })).toBeTruthy();
    expect(await screen.findByRole('button', { name: "TEST2" })).toBeTruthy();
  })
})