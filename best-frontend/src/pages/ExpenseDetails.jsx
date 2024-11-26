/* eslint-disable react/prop-types */
import styles from "./ExpenseDetails.module.css";
import Income from "../assets/profit.png";
import Expense from "../assets/trending.png";
function ExpenseDetails({ incomeAmt, expenseAmt }) {
  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <p> Your Balance is</p>
        <h3>₹ {incomeAmt - expenseAmt}</h3>
      </div>
      {/* Show Income & Expense amount */}
      <div className={styles.amountContainer}>
        <div className={styles.results}>
          <div className={styles.icon}>
            <img src={Income} />
          </div>
          <div>
            <h3>Income</h3>
            <p className="income-amount">₹{incomeAmt}</p>
          </div>
        </div>
        <div className={styles.results}>
          <div className={styles.icon}>
            <img src={Expense} />
          </div>
          <div>
            <h3>Expense</h3>
            <p className={styles.expense}>₹{expenseAmt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
