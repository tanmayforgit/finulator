const JobLossEventDetails = (props) => {
  const eventDetails = props.finEvent.implementationDetails;
  return (
    <ul>
      <li> From Month: {eventDetails.fromMonth}</li>
      <li> To Month: {eventDetails.toMonth}</li>
      <li> Income after job loss: {eventDetails.postJlMonthlyIncome}</li>
    </ul>
  );
};

export default JobLossEventDetails;
