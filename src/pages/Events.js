import React from "react";
import EventsList from "components/Events/List";
import UserChosenEvents from "components/Events/UserChosenEvents";
import { Fragment } from "react";
const Events = () => {
  return (
    <Fragment>
      <h3> Events Added to simulation</h3>
      <UserChosenEvents />
      <h3> List of all events </h3>
      <EventsList />;
    </Fragment>
  );
};

export default Events;
