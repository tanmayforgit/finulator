import YearFromMonths from "components/Utility/YearFromMonths";
import AgeAfterMonths from "components/Utility/AgeAfterMonths";
import Modal from "react-modal";
import { Fragment, useState } from "react";
import classes from "components/Table.module.css";
import SimulationRowComment from "./SimulationRowComment";
import LedgerRow from "./LedgerRow";

const SimulationRow = (props) => {
  console.log("called with props", props.month);
  const finSituation = props.finSituation;
  const ledgers = props.ledgers;
  const month = props.month;
  const userDetails = props.userDetails;
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const viewDetailsHandler = () => {
    console.log("ledgers", ledgers);
    setDetailsModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setDetailsModalOpen(false);
  };

  const comments = props.finSituation.comments.map((comment) => (
    <SimulationRowComment comment={comment} />
  ));

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
        <td>{Math.round(finSituation.bankBalance)}</td>
        <td>{Math.round(finSituation.assetValue)}</td>
        <td>
          <button onClick={viewDetailsHandler}> View Details</button>
        </td>
        <td> <ul>{comments}</ul> </td>
      </tr>
      <Modal isOpen={detailsModalOpen}>
        <button onClick={closeModal}>Close</button>
        <table className={classes.table}>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
          <tbody>
            {ledgers.map((ledger, i) => (
              <LedgerRow ledger={ledger} />
            ))}
          </tbody>
        </table>
      </Modal>
    </Fragment>
  );
};

export default SimulationRow;
