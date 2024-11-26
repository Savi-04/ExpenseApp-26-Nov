/* eslint-disable react/prop-types */
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import styles from "./UpdatorRender.module.css";

function UpdatorRender({
  updateExp,
  updateTransaction,
  updateDisplayHandlerToggler,
}) {
  const [tempUpdateObj, setTempUpdateObj] = useState({ ...updateExp });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...tempUpdateObj };
    temp[name] = value;
    setTempUpdateObj(temp);
    console.log(tempUpdateObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit is running");

    // if((tempUpdateObj["text"] === '' && tempUpdateObj["amount"] === '')){
    //     console.log("Condition for both empty")
    //     return handleError('Both cannot be left empty')

    // }

    if (tempUpdateObj["text"] === "") {
      console.log("Condition for text empty");
      tempUpdateObj.text = updateExp.text;

      updateTransaction(tempUpdateObj, updateExp._id);
      updateDisplayHandlerToggler();
      return;
    }

    if (tempUpdateObj["amount"] === "") {
      console.log("Condition for amount empty");
      tempUpdateObj.amount = updateExp.amount;

      updateTransaction(tempUpdateObj, updateExp._id);
      updateDisplayHandlerToggler();
      return;
    }

    updateTransaction(tempUpdateObj, updateExp._id);
    updateDisplayHandlerToggler();
  };

  console.log("Running");
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br></br>
        <input
          placeholder={updateExp.text}
          onChange={handleChange}
          type="text"
          id="name"
          name="text"
        />
        <br />
        <br />

        <label htmlFor="amount">Amount:</label><br></br>
        <input
          placeholder={updateExp.amount}
          onChange={handleChange}
          type="number"
          id="amount"
          name="amount"
        />
        <br />
        <br />
<div className={styles.btn}>
<button  type="submit">Submit</button>

</div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdatorRender;
