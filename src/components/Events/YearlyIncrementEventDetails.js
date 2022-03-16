const YearlyIncrementEventDetails = (props) => {
  const eventDetails = props.finEvent.implementationDetails;
  return (
    <ul>
      <li> Increment Rate: {eventDetails.yearlyIncrementRate}</li>
    </ul>
  );
};

export default YearlyIncrementEventDetails;
