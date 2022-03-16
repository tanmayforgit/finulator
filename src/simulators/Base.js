class Base {
  constructor(finSituation, finEvent, monthlyInflationRate) {
    this.finSituation = finSituation;
    this.finEvent = finEvent;
    this.implementationDetails = finEvent.implementationDetails;
    this.monthlyInflationRate = monthlyInflationRate;
    this.id = finEvent.id
  }

  yearInfo(monthNumber) {
    const year = Math.ceil(monthNumber/12);
    return [monthNumber%12 ===0, year]
  }

  yearlyToMonthlyRate(yearlyRate) {
    return Math.pow(yearlyRate / 100 + 1, 1 / 12) - 1;
  }

}

export default Base;