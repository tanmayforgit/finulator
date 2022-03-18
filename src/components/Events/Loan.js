import useFinEvent from "hooks/use-fin_event";
import formClasses from "components/Form.module.css";
import { Fragment, useRef, useState } from "react";
const Loan = (props) => {
  const eventAttributes = new Map([
    ["yearlyInterestRate", "number"],
    ["amount", "number"],
    ["startMonth", "number"],
    ["tenure", "number"],
    ["name", "text"]
  ]);

  const [errors, setErrors] = useState([]);

  const submitCallback = useFinEvent(eventAttributes, "Loan", "loan");

  const yearlyInterestRateRef = useRef();
  const amountRef = useRef();
  const tenureRef = useRef();
  const startMonthRef = useRef();
  const nameRef = useRef();


  const addLoanEvent = (event) => {
    event.preventDefault();
    const attrValues = new Map();
    attrValues.set(
      "yearlyInterestRate",
      parseInt(yearlyInterestRateRef.current.value)
    );
    attrValues.set("amount", parseInt(amountRef.current.value));
    attrValues.set("tenure", parseInt(tenureRef.current.value));
    attrValues.set("startMonth", parseInt(startMonthRef.current.value));
    attrValues.set("name", nameRef.current.value);

    console.log("attr_values", attrValues);

    const submitCallbackErrors = submitCallback(attrValues);

    if (submitCallbackErrors.length > 0) {
      setErrors(submitCallbackErrors);
    } else {
      props.closeModalCallback();
    }
  };

  const errorLiElements = errors.map((error) => <li> {error} </li>);

  return (
    <Fragment>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form className={formClasses.simple_form} onSubmit={addLoanEvent}>
        <div className="form-control">
          <label htmlFor="yearly_interest_rate"> Yearly Interest Rate </label>
          <input
            type="number"
            id="yearly_interest_rate"
            ref={yearlyInterestRateRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount"> Amount </label>
          <input type="number" id="amount" ref={amountRef} />
        </div>
        <div className="form-control">
          <label htmlFor="startMonth"> Start Month </label>
          <input type="number" id="startMonth" ref={startMonthRef} />
        </div><div className="form-control">
          <label htmlFor="tenure"> Tenure (in years)</label>
          <input type="number" id="tenure" ref={tenureRef} />
        </div>
        <div className="form-control">
          <label htmlFor="name"> Name (What should we refer this loan as)</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
        
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Loan;
