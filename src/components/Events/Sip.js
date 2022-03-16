import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

const Sip = (props) => {
  const monthlyAmountRef = useRef();
  const startMonthRef = useRef();
  const endMonthRef = useRef();
  const nameRef = useRef();
  const yearlyRorRef = useRef();
  const [formErrors, setFormErrors] = useState([]);
  const dispatchSipEvent = useDispatch();

  const addSipEvent = (browserEvent) => {
    browserEvent.preventDefault();
    setFormErrors([]);

    const yearlyRor = parseInt(yearlyRorRef.current.value);
    const monthlyAmount = parseInt(monthlyAmountRef.current.value);
    const startMonth = parseInt(startMonthRef.current.value);
    const endMonth = parseInt(endMonthRef.current.value);
    const name = nameRef.current.value;

    if (
      isNaN(yearlyRor) ||
      isNaN(startMonth) ||
      isNaN(endMonth) ||
      isNaN(monthlyAmount)
    ) {
      setFormErrors((errors) =>
        errors.concat(
          "yearly interest rate, monthly amount, start month, end month should be integer"
        )
      );
    } else if (!name) {
      setFormErrors((errors) => errors.concat("Please enter investment name"));
    } else {
      const finEvent = {
        label: "SIP labled '" + name + "'",
        name: "sip",
        id: uuidv4(),
        implementationDetails: {
          yearlyRor: yearlyRor,
          monthlyAmount: monthlyAmount,
          startMonth: startMonth,
          endMonth: endMonth,
          name: name,
        },
      };

      const dispatchAction = {
        type: "add_event",
        finEvent: finEvent,
      };

      dispatchSipEvent(dispatchAction)
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
        onSubmit={addSipEvent}
      >
        <div className="form-control">
          <label htmlFor="yearly_ror"> Yearly rate of return </label>
          <input type="number" id="yearly_ror" ref={yearlyRorRef} />
        </div>
        <div className="form-control">
          <label htmlFor="monthly_amount">
            Monthly Amount
          </label>
          <input type="number" id="monthly_amount" ref={monthlyAmountRef} />
        </div>
        <div className="form-control">
          <label htmlFor="name">
            What should we refer to this investment as?
          </label>
          <input type="text" id="name" ref={nameRef} />
        </div>
        <div className="form-control">
          <label htmlFor="start_month">
            Starting Month
          </label>
          <input type="number" id="start_month" ref={startMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="end_month">
            End Month
          </label>
          <input type="number" id="end_month" ref={endMonthRef} />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Sip;
