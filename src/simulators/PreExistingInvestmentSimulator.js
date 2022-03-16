import Base from "./Base";
class PreExistingInvestmentSimulator extends Base {
  constructor(finSituation, investmentEvent, monthlyInflationRate) {
    super(finSituation, investmentEvent, monthlyInflationRate);
    this.crashes = this.implementationDetails.crashes;
    this.name = this.implementationDetails.name;
    this.yearlyRor = this.implementationDetails.yearlyRor;
  }

  simulate(monthToSimulate) {
    const [investmentMultiplier, comments] =
      this.#getMultiplierAndComments(monthToSimulate);

    const displayableMultiplier = investmentMultiplier.toFixed(3)
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

export default PreExistingInvestmentSimulator;
