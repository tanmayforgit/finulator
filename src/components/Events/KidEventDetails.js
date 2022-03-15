const KidEventDetails = (props) => {
  const eventDetails = props.finEvent.implementationDetails;
  return (
    <ul>
      <li> Name: {eventDetails.kidName}</li>
      <li> Month to Kid birth: {eventDetails.kidBirthMonth}</li>
      <li> Delivery Expenses: {eventDetails.deliveryExpense}</li>
      <li> Monthly Expenses ( 0 - 1) years: {eventDetails.oneYearExpense}</li>
      <li> Monthly Expense (1 - 5) years: {eventDetails.oneToFiveExpense}</li>
      <li> Monthly Expense (5 - 10 years): {eventDetails.fiveToTenExpense}</li>
      <li> Monthly Expense (10 - 15 years): {eventDetails.tenToFifteenExpense}</li>
      <li>
        {" "}
        Monthly Expense (15 - 18 years): {eventDetails.fifteenToEighteenExpense}
      </li>
      <li>
        {" "}
        Monthly Expense (18 - 22 years): {eventDetails.eighteenToTwentyTwoExpense}
      </li>
      <li>
        {" "}
        Monthly Expense (22 - 25 years):{" "}
        {eventDetails.twentyTwoToTwentyFiveExpense}
      </li>
    </ul>
  );
};

export default KidEventDetails;
