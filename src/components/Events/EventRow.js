import JobLossEventDetails from "./JobLossEventDetails";
import { useDispatch } from "react-redux";
import KidEventDetails from "./KidEventDetails";
import YearlyIncrementEventDetails from "./YearlyIncrementEventDetails";
import PreExistingInvestmentDetails from "./PreExistingInvestmentDetails";
const EventRow = (props) => {
  const finEvent = props.finEvent;
  const dispatchRemoveEvent = useDispatch();

  // accepts "thisIsTheVriable" and returns "this Is The Variable"
  const getDisplayableAttr = (name) => {
    return name.split(/(?=[A-Z])/).join(" ");
  }

  const getDefaultDetails = () => {
    console.log("keys", Object.keys(finEvent.implementationDetails));
    return (Object.keys(finEvent.implementationDetails).map((key) => (
      <li style={{textTransform: "capitalize"}}>
        {" "}
        {getDisplayableAttr(key)}: {finEvent.implementationDetails[key]}{" "}
      </li>
    )));
  };

  const getDisplayableEventDetails = () => {
    console.log("fin event name for details", finEvent.name);
    switch (finEvent.name) {
      case "job_loss":
        return <JobLossEventDetails finEvent={finEvent} />;
      case "kid":
        return <KidEventDetails finEvent={finEvent} />;
      case "yearly_increment":
        return <YearlyIncrementEventDetails finEvent={finEvent} />;
      case "pre_existing_investment":
        console.log("calling pre_existing_investment_details component");
        return <PreExistingInvestmentDetails finEvent={finEvent} />;
      default:
        console.log("returning default event details");
        return <ul>{getDefaultDetails()}</ul>;
    }
  };

  const removeEvent = () => {
    console.log("removing", finEvent.id);
    dispatchRemoveEvent({
      type: "remove_event",
      event_id: finEvent.id,
    });
  };

  return (
    <tr>
      <td>{finEvent.label}</td>
      <td>{getDisplayableEventDetails()}</td>
      <td>
        <button onClick={removeEvent}>Remove</button>
      </td>
    </tr>
  );
};

export default EventRow;
