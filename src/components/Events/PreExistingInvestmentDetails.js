const PreExistingInvestmentDetails = (props) => {
  const eventDetails = props.finEvent.implementationDetails;
  console.log("eventDetails", eventDetails);
  return (
    <ul>
      <li> Name: {eventDetails.name}</li>
      <li> Expected yearly rate of return: {eventDetails.yearlyRor}</li>
      <li> Amount: {eventDetails.amount}</li>
    </ul>
  );
};

export default PreExistingInvestmentDetails;
