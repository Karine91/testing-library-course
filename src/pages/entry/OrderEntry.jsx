import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilis";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const handleNextPhase = () => {
    setOrderPhase("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button onClick={handleNextPhase}>Order Sundae!</button>
    </div>
  );
}
