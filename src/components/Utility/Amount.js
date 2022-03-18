const Amount = (props) => {
  const number = props.number.toFixed(2);
  const formatter = new Intl.NumberFormat('en-IN');
  const formattedNumber = formatter.format(number)

  return(<div>{formattedNumber}</div>)
}

export default Amount;