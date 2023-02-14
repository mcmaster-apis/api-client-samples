import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ProgramDetails from "../src/components/ProgramDetails";

afterEach(cleanup)

describe("Test UI render correctly", () => {
  it("with data, should render", async () => {
    render(<ProgramDetails program={global.mockData.mockPrograms.programs[0]} />)
    expect(screen.getByText("UENBE")).toBeInTheDocument();
    expect(screen.getByText("Engineering Bachelors")).toBeInTheDocument();
  })
})