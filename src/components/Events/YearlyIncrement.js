import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
const YearlyIncrement = (props) => {
  const yearlyIncrementRateRef = useRef();
  const [formErrors, setFormErrors] = useState([]);
  const dispatchJobLossEvent = useDispatch();


  const addYealyIncrementEvent = (browserEvent) => {
    browserEvent.preventDefault();
    setFormErrors([]);

    const yearlyIncrementRate = parseInt(yearlyIncrementRateRef.current.value);

    if (isNaN(yearlyIncrementRate)) {
      setFormErrors((errors) =>
        errors.concat("Yearly Increment should be an integer")
      );
    } else {
      const yearlyIncrementEvent = {
        label: "Yearly Increment",
        name: "yearly_increment",
        id: uuidv4(),
        implementationDetails: {
          yearlyIncrementRate: yearlyIncrementRate
        }
      }

      const dispatchAction = {
        type: "add_event",
        finEvent: yearlyIncrementEvent
      }

      dispatchJobLossEvent(dispatchAction);
      props.closeModalCallback();
    }
  };

  const errorLiElements = formErrors.map((error) => <li> {error} </li>);
  return (
    <Fragment>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form className={formClasses.simple_form} onSubmit={addYealyIncrementEvent}>
        <div className="form-control">
          <label htmlFor="yearly_increment_rate"> Yearly Increment Rate </label>
          <input type="number" id="yearly_increment_rate" ref={yearlyIncrementRateRef} />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default YearlyIncrement;
