import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimulationPlayground from "components/Simulations/SimulationPlayground";

const PresentFinancialSituation = () => {
  console.log("rendering PresentFinancialSituationComponent");

  const presentFinancialSituation = useSelector(
    (state) => state.presentFinancialSituation
  );

  console.log("presentFinancialSituation read from redux is");
  console.log(presentFinancialSituation);

  const [monthlyExpense, setMonthlyExpense] = useState(
    presentFinancialSituation?.monthlyExpense
  );

  const [yearlyExpense, setYearlyExpense] = useState(
    presentFinancialSituation?.yearlyExpense
  );

  const [yearlyIncome, setYearlyIncome] = useState(
    presentFinancialSituation?.yearlyIncome
  );
  const [monthlyIncome, setMonthlyIncome] = useState(
    presentFinancialSituation?.monthlyIncome
  );

  const [bankBalance, setBankBalance] = useState(
    presentFinancialSituation?.bankBalance
  );

  const dispatchPresentFinancialSituation = useDispatch();

  const monthlyExpenseChangeHandler = (event) => {
    setMonthlyExpense(event.target.value);
  };

  const yearlyExpenseChangeHandler = (event) => {
    setYearlyExpense(event.target.value);
  };

  const monthlyIncomeChangeHandler = (event) => {
    setMonthlyIncome(event.target.value);
  };

  const yearlyIncomeChangeHandler = (event) => {
    setYearlyIncome(event.target.value);
  };

  const bankBalanceChangeHandler = (event) => {
    setBankBalance(event.target.value);
  };

  const finInfoSubmitHandler = (event) => {
    event.preventDefault();
    const dispatchObj = {
      type: "set_present_financial_situation",
      presentFinancialSituation: {
        bankBalance: parseInt(bankBalance),
        monthlyIncome: parseInt(monthlyIncome),
        yearlyIncome: parseInt(yearlyIncome),
        monthlyExpense: parseInt(monthlyExpense),
        yearlyExpense: parseInt(yearlyExpense),
      }
    };

    dispatchPresentFinancialSituation(dispatchObj);
    setFormIsSubmitted(true);
  };

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const showForm =
    presentFinancialSituation === null ||
    presentFinancialSituation === undefined ||
    !formIsSubmitted;

  console.log(presentFinancialSituation);
  console.log(showForm);

  if (showForm) {
    return (
      <form onSubmit={finInfoSubmitHandler}>
        <div className="form-control">
          <label htmlFor="current_bank_balance"> Current Bank Balance </label>
          <input
            type="number"
            id="current_bank_balance"
            onChange={bankBalanceChangeHandler}
            value={bankBalance}
          />
        </div>
        <div className="form-control">
          <label htmlFor="monthly_income">
            {" "}
            Your monthly income (after taxes){" "}
          </label>
          <input
            type="number"
            id="monthly_income"
            onChange={monthlyIncomeChangeHandler}
            value={monthlyIncome}
          />
        </div>
        <div className="form-control">
          <label htmlFor="yearly_income"> Any additional yearly income </label>
          <input
            type="number"
            id="yearly_income"
            onChange={yearlyIncomeChangeHandler}
            value={yearlyIncome}
          />
        </div>
        <div className="form-control">
          <label htmlFor="monthly_expense"> Your total monthly expense </label>
          <input
            type="number"
            id="monthly_expense"
            onChange={monthlyExpenseChangeHandler}
            value={monthlyExpense}
          />
        </div>
        <div className="form-control">
          <label htmlFor="yearly_expense">
            {" "}
            Any additional yearly expense{" "}
          </label>
          <input
            type="number"
            id="yearly_expense"
            onChange={yearlyExpenseChangeHandler}
            value={yearlyExpense}
          />
        </div>
        <button>Submit</button>
      </form>
    );
  } else {
    return (
      <div id="showPresentFinancialSituation">
        <table>
          <thead>
            <th>
              Bank Balance
            </th>
            <th>
              Monthly Income
            </th>
            <th>
              Monthly Expense
            </th>
            <th>
              Yearly Income (such as bonuns etc)
            </th>
            <th>
              Yearly Expense (Any yearly expense separate from monthly expense)
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                {presentFinancialSituation.bankBalance}
              </td>
              <td>
                {presentFinancialSituation.monthlyIncome}
              </td>
              <td>
                {presentFinancialSituation.monthlyExpense}
              </td>
              <td>
                {presentFinancialSituation.yearlyIncome}
              </td>
              <td>
                {presentFinancialSituation.yearlyExpense}
              </td>
            </tr>
          </tbody>
        </table>
        <SimulationPlayground/>
      </div>
    );
  }
};

export default PresentFinancialSituation;
