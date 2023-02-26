import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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

  test("checking checkbox enables button", async () => {
    //arrange
    const user = userEvent.setup();
    render(<SummaryForm />);

    //act
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    await user.click(checkbox);

    //assert
    expect(button).toBeEnabled();

    //act
    await user.click(checkbox);

    //assert
    expect(button).toBeDisabled();
  });
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
