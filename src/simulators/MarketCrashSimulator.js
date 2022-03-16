import Base from "./Base";

class MarketCrashSimulator extends Base {
  constructor(finSituation, investmentEvent, monthlyInflationRate) {
    super(finSituation, investmentEvent, monthlyInflationRate);
    this.crashMonth = this.implementationDetails.crashMonth;
    this.crashPercentage = this.implementationDetails.crashPercentage;
  }

  simulate(monthToSimulate) {
    if (monthToSimulate === this.crashMonth) {
      let ledgers = [];
      let comments = [];
      this.finSituation.investments.forEach((investment, investmentId) => {
        const investmentMultiplier = (100 - this.crashPercentage) / 100;
        console.log("investment to crash", investment)
        ledgers = ledgers.concat({
          type: "investment_multiplier",
          investment_id: investmentId,
          multiplier: investmentMultiplier,
          description:
            "Investment labled " +
            investment.name +
            "became " +
            investmentMultiplier +
            " times its value last month",
        });

        comments = comments.concat([
          {
            type: "critical",
            text:
              this.crashPercentage +
              "% crash in investment labled " +
              investment.name,
          },
        ]);
      });

      return {ledgers: ledgers, comments: comments}
    } else {
      return {ledgers: [], comments: []}
    }
  }
}

export default MarketCrashSimulator;