import YearFromMonths from "components/Utility/YearFromMonths";
import AgeAfterMonths from "components/Utility/AgeAfterMonths";
import Modal from "react-modal";
import { Fragment, useState } from "react";
import classes from "components/Table.module.css";

const SimulationRow = (props) => {
  console.log("called");
  const finSituation = props.finSituation;
  const ledgers = props.ledgers;
  const month = props.month;
  const userDetails = props.userDetails;
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const viewDetailsHandler = () => {
    console.log('ledgers', ledgers);
    setDetailsModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setDetailsModalOpen(false);
  };

  const displayLedgerType = (type) => {
    switch (type) {
      case "bank_balance_debit":
        return "Debit (from bank balance)";
      case "bank_balance_credit":
        return "Credit (to bank balance)";
    }
  };

  return (
    <Fragment>
      <tr>
        <td>
          {" "}
          <YearFromMonths months={month} />{" "}
        </td>
        <td>
          {" "}
          <AgeAfterMonths age={userDetails.age} months={month} />{" "}
        </td>
        <td>{finSituation.bankBalance}</td>
        <td>
          <button onClick={viewDetailsHandler}> View Details</button>
        </td>
        <td> Yet to be implemented </td>
      </tr>
      <Modal isOpen={detailsModalOpen}>
        <button onClick={closeModal}>Close</button>
        <table className={classes.table}>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
          <tbody>
            {ledgers.map((ledger, i) => (
              <tr>
                <td>{displayLedgerType(ledger.type)}</td>
                <td>{ledger.amount}</td>
                <td>{ledger.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </Fragment>
  );
};

export default SimulationRow;
