const YearlyIncrementEventDetails = (props) => {
  const eventDetails = props.finEvent.implementationDetails;
  console.log("event details", eventDetails)
  return (
    <ul>
      <li> Increment Rate: {eventDetails.yearlyIncrementRate}</li>
    </ul>
  );
};

export default YearlyIncrementEventDetails;
