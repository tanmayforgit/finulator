import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
const JobLoss = (props) => {
  const fromMonthRef = useRef();
  const toMonthRef = useRef();
  const postJlMonthlyIncomeRef = useRef();
  const [formErrors, setFormErrors] = useState([]);

  const addJobLossEvent = (event) => {
    event.preventDefault();
    setFormErrors([]);
    const fromMonth = parseInt(fromMonthRef.current.value);
    const toMonth = parseInt(toMonthRef.current.value);
    const postJlMonthlyIncome = parseInt(postJlMonthlyIncomeRef.current.value);

    console.log("fromMonth", fromMonth);
    if (isNaN(fromMonth) || isNaN(toMonth) || isNaN(postJlMonthlyIncome)) {
      console.log("added nan error");
      setFormErrors((errors) =>
        errors.concat(["From month, To Month and Monthly income after job loss should be Integer."])
      );
    } else if (toMonth <= fromMonth) {
      setFormErrors((errors) =>
        errors.concat(["To month should be greater that From month."])
      );
    } else {
      console.log("dispatching event");
      const jobLossEvent = {
        label: "Job Loss",
        name: "job_loss",
        id: uuidv4(),
        implementationDetails: {
          fromMonth: fromMonth,
          toMonth: toMonth,
          postJlMonthlyIncome: postJlMonthlyIncome,
        },
      };

      const dispatchAction = {
        type: "add_event",
        finEvent: jobLossEvent,
      };

      dispatchJobLossEvent(dispatchAction);
      props.closeModalCallback();
    }
  };

  const dispatchJobLossEvent = useDispatch();
  const errorLiElements = formErrors.map((error) => <li> {error} </li>);
  return (
    <Fragment>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form className={formClasses.simple_form} onSubmit={addJobLossEvent}>
        <div className="form-control">
          <label htmlFor="jl_from_month"> From Month </label>
          <input type="number" id="jl_from_month" ref={fromMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="jl_to_month"> To Month </label>
          <input type="number" id="jl_to_month" ref={toMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="post_jl_monthly_income">
            {" "}
            Monthly income after job loss (after taxes){" "}
          </label>
          <input
            type="number"
            id="post_jl_monthly_income"
            ref={postJlMonthlyIncomeRef}
          />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default JobLoss;
