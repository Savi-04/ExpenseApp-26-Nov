/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdatorRender from "./UpdatorRender";
import styles from "./ExpenseTable.module.css";

const ExpenseTable = ({ expenses, deleteExpens, updateTransaction }) => {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const updateDisplayHandler = (expenseId) => {
    setSelectedExpenseId(selectedExpenseId === expenseId ? null : expenseId);
  };

  //this function will be called by cross buttons in UpdatorRender component
  //also when submit is clicked in updator form there ,then to hide form

  const updateDisplayHandlerToggler = () => {
    setSelectedExpenseId(null);
    return;
  };

  return (
    <div className={styles.container}>
      {expenses?.map((expense, index) => (
        <div key={index} className={styles.item}>
         <div className={styles.items}>
         <button
            className={styles.delete}
            onClick={() => deleteExpens(expense._id)}
          >
            X
          </button>
          <div className={styles.desc}>{expense.text}</div>
          <div
            className={styles.amount}
            style={{ color: expense.amount > 0 ? "#27ae60" : "#c0392b" }}
          >
            ₹{expense.amount}
          </div>
          <button className={styles.update} onClick={() => updateDisplayHandler(expense._id)}>
            Update
          </button>
         </div>

          {selectedExpenseId === expense._id && (
            <UpdatorRender
              updateExp={expense}
              updateTransaction={updateTransaction}
              updateDisplayHandlerToggler={updateDisplayHandlerToggler}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;
