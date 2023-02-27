import React from "react";
import SummaryForm from "./SummaryForm";

import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilis";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopsList = Object.entries(optionCounts.scoops).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsList = Object.keys(optionCounts.toppings).map((key) => (
    <li key={key}>{key}</li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm />
    </div>
  );
};

export default OrderSummary;
