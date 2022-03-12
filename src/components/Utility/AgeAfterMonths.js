const AgeAfterMonths = (props) => {
  const age = props.age;
  const monthsToAdd = props.months;

  const years = Math.floor(monthsToAdd / 12);
  const months = monthsToAdd % 12;

  return (
    <div>
      {age + years} Years, {months} Months
    </div>
  );
};

export default AgeAfterMonths;
