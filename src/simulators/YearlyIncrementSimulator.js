import Base from "./Base";
class YearlyIncrementSimulator extends Base {
  // We don't need monthlyInflationRate over here but we should maintain
  // Common contract for all simulators
  constructor(finSituation, incrementEvent, monthlyInflationRate) {
    super(finSituation, incrementEvent, monthlyInflationRate);
    this.monthlyIncome = finSituation.monthlyIncome;
    this.yearlyIncrementRate =
      incrementEvent.implementationDetails.yearlyIncrementRate;
    console.log('yi simulator object', this);
  }

  afterSimulationCallback(simulationMonthNumber) {
    const [itIsYearEnd, yearNumber] = this.yearInfo(simulationMonthNumber);
    if (itIsYearEnd) {
      const incrementedMonthlyIncome =
        this.monthlyIncome * (1 + this.yearlyIncrementRate/100);
      this.finSituation.monthlyIncome = incrementedMonthlyIncome;

      return {
        finSituation: this.finSituation,
        comments: [{ type: "good", text: "You received increment. Applicable from next month." }],
      };
    } else {
      return { finSituation: this.finSituation, comments: [] };
    }
  }
}

export default YearlyIncrementSimulator;