import formClasses from "components/Form.module.css";
import { useDispatch } from "react-redux";
import { useState, useRef, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

const Kid = (props) => {
  const kidBirthMonthRef = useRef();
  const deliveryExpenseRef = useRef();
  const oneYearExpenseRef = useRef();
  const oneToFiveExpenseRef = useRef();
  const fiveToTenExpenseRef = useRef();
  const tenToFifteenExpenseRef = useRef();
  const fifteenToEighteenExpenseRef = useRef();
  const eighteenToTwentyTwoExpenseRef = useRef();
  const twentyTwoToTwentyFiveExpenseRef = useRef();
  const kidNameRef = useRef();

  const [formErrors, setFormErrors] = useState([]);

  const addKidEvent = (event) => {
    event.preventDefault();
    setFormErrors([]);

    const kidBirthMonth = parseInt(kidBirthMonthRef.current.value);
    const deliveryExpense = parseInt(deliveryExpenseRef.current.value);
    const oneYearExpense = parseInt(oneYearExpenseRef.current.value);
    const oneToFiveExpense = parseInt(oneToFiveExpenseRef.current.value);
    const fiveToTenExpense = parseInt(fiveToTenExpenseRef.current.value);
    const tenToFifteenExpense = parseInt(tenToFifteenExpenseRef.current.value);
    const fifteenToEighteenExpense = parseInt(
      fifteenToEighteenExpenseRef.current.value
    );
    const eighteenToTwentyTwoExpense = parseInt(
      eighteenToTwentyTwoExpenseRef.current.value
    );
    const twentyTwoToTwentyFiveExpense = parseInt(
      twentyTwoToTwentyFiveExpenseRef.current.value
    );

    const kidName = kidNameRef.current.value;
    if (
      isNaN(deliveryExpense) ||
      isNaN(oneYearExpense) ||
      isNaN(oneToFiveExpense) ||
      isNaN(fiveToTenExpense) ||
      isNaN(tenToFifteenExpense) ||
      isNaN(fifteenToEighteenExpense) ||
      isNaN(eighteenToTwentyTwoExpense) ||
      isNaN(twentyTwoToTwentyFiveExpense)
    ) {
      setFormErrors((errors) =>
        errors.concat(["All expense numbers should be integers."])
      );
    }

    if (!kidName) {
      setFormErrors((errors) => errors.concat(["Kid name must be present."]));
    } else if (kidName.trim().length < 1) {
      setFormErrors((errors) => errors.concat(["Please enter kid name."]));
    }

    if (isNaN(kidBirthMonth)) {
      setFormErrors((errors) =>
        errors.concat(["Kid birth month should be an integer."])
      );
    }

    console.log("form errors", formErrors);
    if (formErrors.length === 0) {
      const kidEvent = {
        label: "Kid",
        name: "kid",
        id: uuidv4(),
        implementationDetails: {
          kidBirthMonth: kidBirthMonth,
          deliveryExpense: deliveryExpense,
          oneYearExpense: oneYearExpense,
          oneToFiveExpense: oneToFiveExpense,
          fiveToTenExpense: fiveToTenExpense,
          tenToFifteenExpense: tenToFifteenExpense,
          fifteenToEighteenExpense: fifteenToEighteenExpense,
          eighteenToTwentyTwoExpense: eighteenToTwentyTwoExpense,
          twentyTwoToTwentyFiveExpense: twentyTwoToTwentyFiveExpense,
          kidName: kidName,
        },
      };

      const dispatchAction = {
        type: "add_event",
        finEvent: kidEvent,
      };

      dispatchKidEvent(dispatchAction);
      props.closeModalCallback();
    }
  };

  const dispatchKidEvent = useDispatch();
  const errorLiElements = formErrors.map((error) => <li> {error} </li>);

  return (
    <Fragment>
      <p>
        Don't worry about what the expenses are going to be in respective age
        brackets. Enter in today's money and we will take care of the inflation!
      </p>
      <div className={formClasses.form_error_container}>
        <ul>{errorLiElements}</ul>
      </div>
      <form className={formClasses.simple_form} onSubmit={addKidEvent}>
        <div className="form-control">
          <label htmlFor="kid_birth_month">
            {" "}
            Number of months till child birth{" "}
          </label>
          <input type="number" id="kid_birth_month" ref={kidBirthMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="kid_name">
            {" "}
            What should we refer this kid as (you can have multiple kid events
            for multiple kids){" "}
          </label>
          <input type="text" id="kid_name" ref={kidNameRef} />
        </div>
        <div className="form-control">
          <label htmlFor="delivery_expense"> Delivery Expenses </label>
          <input type="number" id="delivery_expense" ref={deliveryExpenseRef} />
        </div>
        <div className="form-control">
          <label htmlFor="one_year_expense">
            {" "}
            Monthly expense till kid is 1 year old{" "}
          </label>
          <input type="number" id="one_year_expense" ref={oneYearExpenseRef} />
        </div>
        <div className="form-control">
          <label htmlFor="one_to_five">
            {" "}
            Monthly expense till kid is between 1 to 5 years old{" "}
          </label>
          <input type="number" id="one_to_five" ref={oneToFiveExpenseRef} />
        </div>

        <div className="form-control">
          <label htmlFor="five_to_ten">
            {" "}
            Monthly expense till kid is between 5 to 10 years old{" "}
          </label>
          <input type="number" id="five_to_ten" ref={fiveToTenExpenseRef} />
        </div>
        <div className="form-control">
          <label htmlFor="ten_to_15">
            {" "}
            Monthly expense till kid is between 10 to 15 years old{" "}
          </label>
          <input type="number" id="ten_to_15" ref={tenToFifteenExpenseRef} />
        </div>
        <div className="form-control">
          <label htmlFor="15_to_18">
            {" "}
            Monthly expense till kid is between 15 to 18 years old{" "}
          </label>
          <input
            type="number"
            id="15_to_18"
            ref={fifteenToEighteenExpenseRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="18_to_22">
            {" "}
            Monthly expense till kid is between 18 to 22 years old{" "}
          </label>
          <input
            type="number"
            id="18_to_22"
            ref={eighteenToTwentyTwoExpenseRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="22_to_25">
            {" "}
            Monthly expense till kid is between 22 to 25 years old{" "}
          </label>
          <input
            type="number"
            id="22_to_25"
            ref={twentyTwoToTwentyFiveExpenseRef}
          />
        </div>
        <div className="form-actions">
          <button> Add </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Kid;
