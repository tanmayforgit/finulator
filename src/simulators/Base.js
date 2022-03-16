class Base {
  constructor(finSituation, finEvent, monthlyInflationRate) {
    this.finSituation = finSituation;
    this.finEvent = finEvent;
    this.implementationDetails = finEvent.implementationDetails;
    this.monthlyInflationRate = monthlyInflationRate;
  }

  yearInfo(monthNumber) {
    const year = Math.ceil(monthNumber/12);
    return [monthNumber%12 ===0, year]
  }
}

export default Base;