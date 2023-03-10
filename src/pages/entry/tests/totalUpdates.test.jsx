import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  // make sure total starts out ad $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("$0.00");

  const mmsTopping = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mmsTopping);

  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeTopping);

  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(hotFudgeTopping);

  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts with 0.00", () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^grand total: \$/i,
    });

    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeTopping);

    expect(grandTotal).toHaveTextContent("1.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /^grand total: \$/i,
    });

    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeTopping);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    await user.click(hotFudgeTopping);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
