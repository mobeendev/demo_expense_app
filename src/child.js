import React, { useContext, useState } from "react";
import { TransactionContext } from "./transContext";

function Child() {
  let {
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
  } = useContext(TransactionContext);
  let [newDesc, setDesc] = useState("");
  let [newAmount, setAmount] = useState(0);
  let [isUpdate, setIsUpdate] = useState(false);
  let [updateId, setUpdateId] = useState(null);

  const handleAddition = (event) => {
    event.preventDefault();
    if (Number(newAmount) === 0) {
      alert("Please enter correct value");
      return false;
    }

    if (isUpdate) {
      updateTransaction(updateId, {
        amount: Number(newAmount),
        desc: newDesc,
      });
      setUpdateId(null);
      setIsUpdate(false);
    } else {
      addTransaction({
        id: transactions.length,
        amount: Number(newAmount),
        desc: newDesc,
      });
    }

    setDesc("");
    setAmount(0);
  };

  const updateTrans = (item) => {
    setDesc(item.desc);
    setAmount(item.amount);
    setIsUpdate(true);
    setUpdateId(item.id);
  };

  const getIncome = () => {
    let income = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) income = income + transactions[i].amount;
    }
    return income;
  };

  const getExpense = () => {
    let expense = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0) expense += transactions[i].amount;
    }
    return expense;
  };

  return (
    <div className="container">
      <h1 className="text-center">Expense Tracker</h1>

      <h3>
        <span className="blue">Your Balance</span> <br /> $
        {getIncome() + getExpense()}
      </h3>

      <div className="expense-container">
        <h3>
          <span className="green">INCOME</span> <br /> ${getIncome()}
        </h3>
        <h3>
          <span className="red">EXPENSE </span>
          <br /> ${getExpense()}
        </h3>
      </div>

      <h3>History</h3>
      <hr />

      <ul className="trnsaction-list">
        {transactions.map((transObj, ind) => {
          return (
            <li key={transObj.id}>
              <span>{transObj.desc}</span>
              <span className="actions">
                ${transObj.amount}
                <span
                  className="blue"
                  onClick={(evt) => {
                    evt.preventDefault();
                    updateTrans(transObj);
                  }}
                >
                  Edit
                </span>
                /
                <span
                  className="red"
                  onClick={() => {
                    removeTransaction(transObj.id);
                  }}
                >
                  Remove
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <h3>Add new transaction</h3>
      <hr />

      <form className="transaction-form" onSubmit={handleAddition}>
        <label>
          Enter Description <br />
          <input
            type="text"
            value={newDesc}
            placeholder="Description"
            onChange={(ev) => setDesc(ev.target.value)}
            required
          />
        </label>

        <br />
        <label>
          Enter Amount <br />
          <input
            type="number"
            value={newAmount}
            placeholder="Amount"
            onChange={(ev) => setAmount(ev.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value={!isUpdate ? "Add Transaction" : "Update"} />
      </form>
    </div>
  );
}

export default Child;
