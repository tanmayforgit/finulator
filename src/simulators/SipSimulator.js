import Base from "./Base";

class SipSimulator extends Base {
  constructor(finSituation, investmentEvent, monthlyInflationRate) {
    super(finSituation, investmentEvent, monthlyInflationRate);
    this.monthlyAmount = this.implementationDetails.monthlyAmount;
    this.startMonth = this.implementationDetails.startMonth;
    this.endMonth = this.implementationDetails.endMonth;
    this.investment_id = investmentEvent.id;
    this.investmentDetails = finSituation.investments.get(this.investment_id);
    this.name = this.implementationDetails.name;
    this.crashes = this.implementationDetails.crashes;
    this.yearlyRor = this.implementationDetails.yearlyRor;
  }

  simulate(monthToSimulate) {
    if (
      monthToSimulate >= this.startMonth &&
      monthToSimulate <= this.endMonth
    ) {
      const [investmentMultiplier, comments] =
        this.#getMultiplierAndComments(monthToSimulate);
      const currentUnitPrice = this.investmentDetails.unitPrice;
      const unitsToAdd = this.monthlyAmount / currentUnitPrice;

      const displayableMultiplier = investmentMultiplier.toFixed(3);

      return {
        ledgers: [
          {
            type: "bank_balance_debit",
            amount: this.monthlyAmount,
            description: "SIP purchased labled '" + this.name + "'",
            investment_id: this.investment_id,
          },
          {
            type: "investment_credit",
            amount: unitsToAdd,
            description: "SIP purchased labled '" + this.name + "'",
            investment_id: this.investment_id,
          },
          ,
          {
            type: "investment_multiplier",
            investment_id: this.id,
            description:
              "Your investment labled " +
              this.name +
              " became " +
              displayableMultiplier +
              " times its value last month",
            multiplier: investmentMultiplier,
          },
        ],
        comments: comments,
      };
    } else if (monthToSimulate > this.endMonth) {
      // You won't buy the sip but existing units will still grow
      const [investmentMultiplier, comments] =
        this.#getMultiplierAndComments(monthToSimulate);

      const displayableMultiplier = investmentMultiplier.toFixed(3);

      return {
        ledgers: [
          {
            type: "investment_multiplier",
            investment_id: this.id,
            description:
              "Your investment labled " +
              this.name +
              " became " +
              displayableMultiplier +
              " times its value last month",
            multiplier: investmentMultiplier,
          },
        ],
        comments: comments,
      };
    } else {
      return { ledgers: [], comments: [] };
    }
  }

  beforeSimulationCallback(simulationMonthNumber) {
    if (simulationMonthNumber === this.startMonth) {
      // First time the SIP will be deducted... setting unit price to
      // monthlyAmount/100
      this.finSituation.investments.set(this.investment_id, {
        unitsHeld: 0, // They will automatically become 100 during first simulation
        unitPrice: this.monthlyAmount / 100,
        name: this.name
      });

      return {
        finSituation: this.finSituation,
        comments: [
          {
            type: "info",
            text: "SIP labled " + this.name + " started from this month",
          },
        ],
      };
    } else {
      return { finSituation: this.finSituation, comments: [] };
    }
  }

  #getMultiplierAndComments(monthToSimulate) {
    const crashPercentage = this.crashes && this.crashes[monthToSimulate];
    // If crash was 30% then this means investment will become
    // (100 - 30)/100 = 70% of the value it previously was.
    if (crashPercentage) {
      return [
        (100 - this.crashes[monthToSimulate]) / 100,
        [
          {
            type: "critical",
            text: crashPercentage + "% crash in investment labled " + this.name,
          },
        ],
      ];
    } else {
      return [1 + this.yearlyToMonthlyRate(this.yearlyRor), []];
    }
  }
}

export default SipSimulator;
