import JobLossEventDetails from "./JobLossEventDetails";
import { useDispatch } from "react-redux";
import KidEventDetails from "./KidEventDetails";

const EventRow = (props) => {
  const finEvent = props.finEvent;
  const dispatchRemoveEvent = useDispatch();

  const getDisplayableEventDetails = () => {
    switch (finEvent.name) {
      case "job_loss":
        return <JobLossEventDetails finEvent={finEvent} />;
      case "kid":
        return <KidEventDetails finEvent={finEvent}/>
    }
  };

  const removeEvent = () => {
    console.log('removing', finEvent.id);
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
