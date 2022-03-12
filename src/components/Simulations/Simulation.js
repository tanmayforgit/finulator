import { Fragment } from "react";
import SimulationRow from "./SimulationRow";
const Simulation = (props) => {
  const simulation = props.simulation;
  const simulationSucceeded = props.simulationSucceeded;

  console.log("simulation", simulation);
  const userDetails = simulation.userDetails;
  const tableBody = [1, 2, 3, 4].map((n, i) => {
    console.log("n", n);
    console.log("i", i);
    <tr>
      <td>{n}</td>
    </tr>;
  });

  console.log("monthly situations", simulation.monthlyFinancialSituations);
  const simulationRows = Array.from(simulation.monthlyFinancialSituations);
  console.log("simulations to show", simulationRows);

  // const tableRows = (
  //   <Fragment>
  //     {simulationRows.map(([month, finSituation]) => {
  //       // <SimulationRow finSituation={finSituation} month={month} userDetails={userDetails}/>
  //       <tr> 1 {console.log('thing', month)}</tr>
  //     })}
  //   </Fragment>
  // );
  // console.log("tablerows", tableRows);

  return (
    <Fragment>
      <table>
        <thead>
          <th> Time Into Simulation</th>
          <th> Your Age (approx) </th>
          <th>Bank Balance</th>
          <th>Actions</th>
          <th>Comments</th>
        </thead>
        <tbody>
          {simulationRows.map(([month, finSituation], i) => (
            <SimulationRow
              finSituation={finSituation}
              month={month}
              userDetails={userDetails}
            />
          ))}
        </tbody>
      </table>
      {!simulationSucceeded && <p>Simulation did not complete since your balance became negative </p>}
    </Fragment>
  );
};

export default Simulation;
