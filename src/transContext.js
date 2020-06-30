import React, { createContext, useReducer } from "react";
import TransactionReducer from "./transReducer";

const initialTransactions = [
  { id: 0, amount: 500, desc: "Cash" },
  { id: 1, amount: -50, desc: "Cold Drink" },
  { id: 2, amount: 100, desc: "Deposit" },
  { id: 3, amount: -200, desc: "Utility Bill" },
];

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({ children }) => {
  let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

  function addTransaction(transObj) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: transObj.id,
        amount: transObj.amount,
        desc: transObj.desc,
      },
    });
  }
  function removeTransaction(itemId) {
    dispatch({
      type: "REMOVE_TRANSACTION",
      payload: {
        deleteId: itemId,
      },
    });
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions: state,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
