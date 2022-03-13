import Simulator from "Simulator";
import { useState, useRef } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Simulation from "./Simulation";
import classes from "components/Table.module.css";

const SimulationPlayground = () => {
  const noOfMonthRef = useRef();
  const inflationRateRef = useRef();
  const userDetails = useSelector((state) => state.userDetails);
  const initialFinSituation = useSelector(
    (state) => state.presentFinancialSituation
  );

  const [showSimulation, setShowSimulation] = useState(false);
  const [simulation, setSimulation] = useState();
  const [simulationSucceeded, setSimulationSucceeded] = useState(false);

  const simulate = (event) => {
    event.preventDefault();
    const inflationRate = parseInt(inflationRateRef.current.value);
    const noOfMonths = parseInt(noOfMonthRef.current.value);
    const simulator = new Simulator(
      userDetails,
      initialFinSituation,
      [],
      inflationRate
    );
    console.log("init situation", initialFinSituation);
    const [simulationSuccessStatus, simulation] =
      simulator.simulateForMonths(noOfMonths);

    setShowSimulation(true);
    setSimulation(simulation);
    if (simulationSuccessStatus) {
      setSimulationSucceeded(true);
    }
  };

  const simVarClasses = `${classes.sim_var_child} ${classes.sim_var_container}`;

  return (
    <Fragment>
      <div class={classes.sim_var_container}>
        <form onSubmit={simulate}>
          <table>
            <thead>
              <th> Simulation Variable </th>
              <th> Set Value </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="no_of_months">
                    {" "}
                    Number Of Months to simulate{" "}
                  </label>
                </td>
                <td>
                  <input type="number" id="no_of_months" ref={noOfMonthRef} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="inflation_rate">
                    {" "}
                    Yearly Inflation Rate{" "}
                  </label>
                </td>
                <tr>
                  <input
                    type="number"
                    id="inflation_rate"
                    ref={inflationRateRef}
                  />
                </tr>
              </tr>
            </tbody>
          </table>
          <div>
            <button> Simulate</button>
          </div>
        </form>
      </div>
      <div>
        {showSimulation && (
          <Simulation
            simulation={simulation}
            simulationSucceeded={simulationSucceeded}
          />
        )}
      </div>
    </Fragment>
  );
};

export default SimulationPlayground;
