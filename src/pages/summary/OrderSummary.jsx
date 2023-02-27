import React from "react";
import SummaryForm from "./SummaryForm";

import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilis";

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionsCounts } = useOrderDetails();

  const scoopsList = Object.entries(optionsCounts.scoops)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    ));

  const toppingsList = Object.entries(optionsCounts.toppings)
    .filter(([key, value]) => !!value)
    .map(([key]) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2 id="scoops-heading">Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul aria-labelledby="scoops-heading">{scoopsList}</ul>
      <h2 id="topping-heading">Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul aria-labelledby="topping-heading">{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
