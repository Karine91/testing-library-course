import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy test", async () => {
  const user = userEvent.setup();
  //render app
  render(<App />);

  //add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesTopping);

  //find and click order button
  const orderButton = screen.getByRole("button", { name: /order/i });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsTotal = screen.getByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopsTotal).toHaveTextContent("4.00");

  const toppingsTotal = screen.getByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsTotal).toHaveTextContent("1.50");

  const scoopsList = screen.getByRole("list", { name: /scoops/i });

  const { getAllByRole } = within(scoopsList);
  const items = getAllByRole("listitem");
  const scoopsContents = items.map((item) => item.textContent);
  expect(items.length).toBe(1);
  expect(scoopsContents).toMatchInlineSnapshot(`
      Array [
        "2 Chocolate",
      ]
    `);

  const toppingsList = screen.getByRole("list", { name: /toppings/i });
  const { getAllByRole: getAllByRoleFromToppings } = within(toppingsList);
  const toppingListItems = getAllByRoleFromToppings("listitem");
  expect(toppingListItems.length).toBe(1);
  expect(toppingListItems.map((item) => item.textContent))
    .toMatchInlineSnapshot(`
      Array [
        "Cherries",
      ]
  `);

  // accept terms and conditions and click button to confirm order

  // confirm order number on confirmation page

  // click new order button on confirmation page

  // check that scoops and toppings subtotals have been reset
});
