import Simulator from "Simulator";
import { useState, useRef } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Simulation from "./Simulation";

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

  return (
    <Fragment>
      <form onSubmit={simulate}>
        <div className="form-control">
          <label htmlFor="no_of_months"> Number Of Months to simulate </label>
          <input type="number" id="no_of_months" ref={noOfMonthRef} />
        </div>
        <div className="form-control">
          <label htmlFor="inflation_rate"> Yearly Inflation Rate </label>
          <input type="number" id="inflation_rate" ref={inflationRateRef} />
        </div>
        <div className="form-actions">
          <button> Simulate</button>
        </div>
      </form>
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
