import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("checkbox enables button", () => {
  test("init condition", () => {
    //arrange
    render(<SummaryForm />);

    //act
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    //assert
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("checking checkbox enables button", () => {
    //arrange
    render(<SummaryForm />);

    //act
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    fireEvent.click(checkbox);

    //assert
    expect(button).toBeEnabled();

    //act
    fireEvent.click(checkbox);

    //assert
    expect(button).toBeDisabled();
  });
});
