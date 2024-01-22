import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button";

jest.mock("class-variance-authority", () => ({
  cva: jest.fn().mockImplementation(() => () => "mocked-cva"),
}));

jest.mock("@/lib/utils", () => ({
  cn: jest.fn().mockImplementation(() => "mocked-cn"),
}));

describe("Button", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<Button>Test Button</Button>);

    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <Button onClick={handleClick}>Test Button</Button>
    );

    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
