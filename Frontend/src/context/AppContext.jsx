import React, { createContext, useEffect, useState } from "react";
import { AllOrders } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);

  // Simulate fetching orders
  const fetchAllOrders = async () => {
    setAllOrders(AllOrders);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  const value = {
    allOrders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
