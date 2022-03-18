import Amount from "components/Utility/Amount";
const LedgerRow = (props) => {
  const ledger = props.ledger;
  const getDisplayLedgerType = (type) => {
    switch (type) {
      case "bank_balance_debit":
        return "Debit (from bank balance)";
      case "bank_balance_credit":
        return "Credit (to bank balance)";
      case "investment_multiplier":
        return "Asset Growth";
      case "investment_credit":
        return "Asset purchase"
      case "liability_debit":
        return "Liabilities dealt"
    }
  };

  const getAmount = (ledger) => {
    switch (ledger.type) {
      case "investment_multiplier":
        console.log(ledger.multiplier)
        return ((ledger.multiplier - 1) * 100).toFixed(2) + "%";
      default:
        return ledger.amount.toFixed(2);
    }
  };

  const displayLedgerType = getDisplayLedgerType(ledger.type);
  const amount = getAmount(ledger);

  return (
    <tr>
      <td>{displayLedgerType}</td>
      <td>{amount}</td>
      <td>{ledger.description}</td>
    </tr>
  );
};

export default LedgerRow;
