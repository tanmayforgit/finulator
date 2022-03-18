import Base from "./Base";
class LoanSimulator extends Base {
  // We don't need monthlyInflationRate over here but we should maintain
  // Common contract for all simulators
  constructor(finSituation, incrementEvent, monthlyInflationRate) {
    super(finSituation, incrementEvent, monthlyInflationRate);
    this.yearlyInterestRate =
      this.implementationDetails.yearlyInterestRate / 100;
    this.monthlyInterestRate = this.yearlyInterestRate / 12;
    this.startMonth = this.implementationDetails.startMonth;
    this.tenure = this.implementationDetails.tenure;
    this.amount = this.implementationDetails.amount;
    this.numberOfInstallments = this.tenure * 12;
    this.loanEndMonth = this.startMonth + this.numberOfInstallments;
    this.name = this.implementationDetails.name;
  }

  #installmentNumber(monthToSimulate) {
    if (this.startMonth > monthToSimulate) {
      return -1;
    } else {
      return monthToSimulate - this.startMonth - 1;
    }
  }

  simulate(monthToSimulate) {
    //Interest component = P x R
    // Where:

    // P = Remaining principal loan amount
    // R = Periodic interest rate (annual interest rate in decimal/12)
    // And principal component = EMI – interest component

    if (
      monthToSimulate >= this.startMonth &&
      monthToSimulate < this.loanEndMonth
    ) {
      const dueAmount = this.finSituation.liabilities.get(this.id).amountDue;
      const emi = this.finSituation.liabilities.get(this.id).emi;
      const interestComponent = dueAmount * this.monthlyInterestRate;
      const principleComponent = emi - interestComponent;

      const getComments = (
        dueBeforeEmiPayment,
        latestPrincipleAmount,
        loanName
      ) => {
        const duesAfterEmi = dueBeforeEmiPayment - latestPrincipleAmount;
        if (duesAfterEmi < 2) {
          // Should Ideally be 0 ... but with 30 year long tenures and float numbers,
          // leaving a small margin of 2 which may occure due to rounding off.
          return [
            {
              type: "good",
              text: "Loan labled " + loanName + " paid off!",
            },
          ];
        } else {
          return [];
        }
      };

      return {
        ledgers: [
          {
            type: "bank_balance_debit",
            amount: emi,
            description: "Monthly installment for loan labled " + this.name,
          },
          {
            type: "liability_debit",
            amount: principleComponent,
            description: "Principle component for loan labled " + this.name,
            liabilityId: this.id,
          },
        ],
        comments: getComments(dueAmount, principleComponent, this.name),
      };
    } else {
      return { ledgers: [], comments: [] };
    }
  }

  beforeSimulationProcedure(simulationMonthNumber) {
    console.log(
      "called before simulation procedure = loan",
      simulationMonthNumber
    );
    if (simulationMonthNumber === this.startMonth) {
      // First time the EMI will be deducted.
      // Setting up the initial liabilities.
      this.finSituation.liabilities.set(this.id, {
        amountDue: this.amount, // They will automatically become 100 during first simulation
        name: this.name,
        emi: this.#getEmi(),
      });

      console.log("loan situation", this.finSituation);

      return {
        finSituation: this.finSituation,
        comments: [
          {
            type: "info",
            text:
              "EMI for loan labled " + this.name + " started from this month",
          },
        ],
      };
    } else {
      return { finSituation: this.finSituation, comments: [] };
    }
  }

  #getEmi() {
    // EMI = P x [R x (1+R)^n]/[{(1+R)^n}-1]
    // Where:

    // P = Principal loan amount
    // R = Periodic interest rate (annual interest rate in decimal/12)
    // n = Repayment tenure in months

    const p = this.amount;
    const r = this.monthlyInterestRate;
    const n = this.numberOfInstallments;
    const onePlusRRaisedToN = Math.pow(1 + r, n);
    return (p * r * onePlusRRaisedToN) / (onePlusRRaisedToN - 1);
  }
}

export default LoanSimulator;
