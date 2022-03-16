import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
const MarketCrash = (props) => {
  const crashMonthRef = useRef();
  const crashPercentageRef = useRef();
  const [formErrors, setFormErrors] = useState([]);
  const dispatchMarketCrashEvent = useDispatch();

  const addMarketCrashEvent = (browserEvent) => {
    browserEvent.preventDefault();
    setFormErrors([]);

    const crashMonth = parseInt(crashMonthRef.current.value);
    const crashPercentage = parseInt(crashPercentageRef.current.value);

    if (isNaN(crashMonth) || isNaN(crashPercentage)) {
      setFormErrors((errors) =>
        errors.concat("Crash month and crash percentage should be an integer")
      );
    } else {
      const marketCrashEvent = {
        label: "Market Crash",
        name: "market_crash",
        id: uuidv4(),
        implementationDetails: {
          crashMonth: crashMonth,
          crashPercentage: crashPercentage
        }
      }

      const dispatchAction = {
        type: "add_event",
        finEvent: marketCrashEvent
      }

      dispatchMarketCrashEvent(dispatchAction);
      props.closeModalCallback();
    }
  };

  const errorLiElements = formErrors.map((error) => <li> {error} </li>);
  return (
    <Fragment>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form className={formClasses.simple_form} onSubmit={addMarketCrashEvent}>
        <div className="form-control">
          <label htmlFor="crash_month"> Crash Month </label>
          <input type="number" id="crash_month" ref={crashMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="crash_percentage"> Crash Percentage </label>
          <input type="number" id="crash_percentage" ref={crashPercentageRef} />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default MarketCrash;
