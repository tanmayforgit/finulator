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

  const simulate = (event) => {
    event.preventDefault();
    const inflationRate = inflationRateRef.current.value;
    const noOfMonths = noOfMonthRef.current.value;
    const simulator = new Simulator(
      userDetails,
      initialFinSituation,
      [],
      inflationRate
    );

    const [simulationSucceeded, simulation] =
      simulator.simulateForMonths(noOfMonths);

    console.log("simulation in playground", simulation);
    setShowSimulation(true);
    setSimulation(simulation);
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
      <div>{showSimulation && <Simulation simulation={simulation}/>}</div>
    </Fragment>
  );
};

export default SimulationPlayground;
