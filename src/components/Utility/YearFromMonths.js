const YearFromMonths = (props) => {
  const noOfMonths = props.months;
  const year = Math.floor(noOfMonths / 12);
  const month = noOfMonths % 12;

  switch (year) {
    case 0:
      return <div>{month} Months</div>;
    case 1:
      return <div> 1 Year, {month} Months</div>;
    default:
      return (
        <div>
          {" "}
          {year} Years, {month} Months{" "}
        </div>
      );
  }
};

export default YearFromMonths;
