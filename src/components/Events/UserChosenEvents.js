import { useSelector } from "react-redux";
import tableClasses from "components/Table.module.css";
import { Fragment } from "react";
import EventRow from "./EventRow";
const UserChosenEvents = () => {
  const userSelectedEvents = useSelector((state) => state.userSelectedEvents);
  console.log("userSelectedEVents", userSelectedEvents);

  const eventRows = userSelectedEvents.map((finEvent) => (
    <EventRow finEvent={finEvent} />
  ));

  console.log("length", userSelectedEvents.length);
  if (userSelectedEvents.length === 0) {
    return (<h5> You have not yet added any events to simulation</h5>)
  } else {
    return (
      <Fragment>
        <h3>Events added to your simulation</h3>
        <table className={tableClasses.table}>
          <thead>
            <th>Event</th>
            <th>Details</th>
            <th>Actions</th>
          </thead>
          <tbody>{eventRows}</tbody>
        </table>
      </Fragment>
    );
  }
};

export default UserChosenEvents;
