import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "userOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionsCounts = { ...optionsCounts };

    newOptionsCounts[optionType][itemName] = newItemCount;
    setOptionsCounts(newOptionsCounts);
  };

  const resetOrder = () => {
    setOptionsCounts({
      scoops: {},
      toppings: {},
    });
  };

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionsCounts[optionType]);
    const total = countsArray.reduce((total, value) => total + value, 0);

    return total * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionsCounts, updateItemCount, resetOrder, totals };
  return <OrderDetails.Provider value={value} {...props} />;
};
