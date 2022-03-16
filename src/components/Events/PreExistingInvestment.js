import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
const PreExistingInvestment = (props) => {
  const yearlyRorRef = useRef();
  const amountRef = useRef();
  const investmentNameRef = useRef();
  const [formErrors, setFormErrors] = useState([]);
  const dispatchPreExistingInvestmentEvent = useDispatch();

  const addPreExistingInvestmentEvent = (browserEvent) => {
    browserEvent.preventDefault();
    setFormErrors([]);

    const yearlyRor = parseInt(yearlyRorRef.current.value);
    const amount = parseInt(amountRef.current.value);
    const investmentName = investmentNameRef.current.value;

    if (isNaN(yearlyRor) || isNaN(amount)) {
      setFormErrors((errors) =>
        errors.concat("Yearly Rate of Return should be an integer")
      );
    } else if (!investmentName) {
      setFormErrors((errors) => errors.concat("Please enter investment name"));
    } else {
      const finEvent = {
        label: "Pre Existing Investment",
        name: "pre_existing_investment",
        id: uuidv4(),
        implementationDetails: {
          yearlyRor: yearlyRor,
          amount: amount,
          name: investmentName
        },
      };

      const dispatchAction = {
        type: "add_event",
        finEvent: finEvent,
      };

      dispatchPreExistingInvestmentEvent(dispatchAction);
      props.closeModalCallback();
    }
  };

  const errorLiElements = formErrors.map((error) => <li> {error} </li>);
  return (
    <Fragment>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form
        className={formClasses.simple_form}
        onSubmit={addPreExistingInvestmentEvent}
      >
        <div className="form-control">
          <label htmlFor="yearly_ror"> Yearly rate of return </label>
          <input type="number" id="yearly_ror" ref={yearlyRorRef} />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            {" "}
            Current value of the investment{" "}
          </label>
          <input type="number" id="amount" ref={amountRef} />
        </div>
        <div className="form-control">
          <label htmlFor="name">
            What should we refer to this investment as?
          </label>
          <input type="text" id="name" ref={investmentNameRef} />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default PreExistingInvestment;
