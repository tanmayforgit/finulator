const FinancialSituationRow = (props) => {
  const finSituation = props.financialSituation;

  const getComments = (finSituation) => {
    return ("Yet to be implemented")
  }

  return (
    <tr>
      <td>
        {finSituation.bankBalance}
      </td>
    </tr>
  )

}

export default FinancialSituationRow;