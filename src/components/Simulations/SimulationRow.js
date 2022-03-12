import YearFromMonths from "components/Utility/YearFromMonths";
import AgeAfterMonths from "components/Utility/AgeAfterMonths";

const SimulationRow = (props) => {
  console.log('called')
  const finSituation = props.finSituation;
  // const ledgers = props.ledgers;
  const month = props.month;
  const userDetails = props.userDetails;

  return (
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
        <button> View Details</button>
      </td>
      <td> Yet to be implemented </td>
    </tr>
  );
};

export default SimulationRow;
