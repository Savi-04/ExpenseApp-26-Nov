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
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // if((tempUpdateObj["text"] === '' && tempUpdateObj["amount"] === '')){
    
    //     return handleError('Both cannot be left empty')

    // }

    if (tempUpdateObj["text"] === "") {
      
      tempUpdateObj.text = updateExp.text;

      updateTransaction(tempUpdateObj, updateExp._id);
      updateDisplayHandlerToggler();
      return;
    }

    if (tempUpdateObj["amount"] === "") {
      
      tempUpdateObj.amount = updateExp.amount;

      updateTransaction(tempUpdateObj, updateExp._id);
      updateDisplayHandlerToggler();
      return;
    }

    updateTransaction(tempUpdateObj, updateExp._id);
    updateDisplayHandlerToggler();
  };

  
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
