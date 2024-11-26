/* eslint-disable react/prop-types */
import { useState } from "react";
import { handleError } from "../utils";
import styles from "./ExpenseForm.module.css";
function ExpenseForm({ addTransaction }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(!isNaN(value))console.log("Not valid")     //to be removed
    console.log(value) //to be removed
    const copyExpenseInfo = { ...expenseInfo };
    copyExpenseInfo[name] = value;
    setExpenseInfo(copyExpenseInfo);
  };

  const addExpenses = (e) => {
    
    console.log("add expense is called")   //to be removed
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError("Please add Expense Details");
      return;
    }
    if(!isNaN(text) || isNaN(amount)){
      handleError("Please enter a valid input")
      return;
    }
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: "", text: "" });
    return
  };

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <form className={styles.form} onSubmit={addExpenses}>
        <div className={styles.field}>
          <label htmlFor="text">Expense Detail</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your Expense Detail..."
            value={expenseInfo.text}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter your Amount..."
            value={expenseInfo.amount}
          />
        </div>
        <div className={styles.btn}>
        <button type="submit">Add Expense</button>
      </div>
      </form>
      
    </div>
  );
}

export default ExpenseForm;
