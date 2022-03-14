class Simulator {
  constructor(userDetails, initialFinSituation, events, yearlyInflationRate) {
    this.userDetails = userDetails;
    this.initialFinSituation = initialFinSituation;
    this.currentFinSituation = initialFinSituation;
    this.events = events.concat(this.#defaultEvents());
    this.currentMonth = 0;
    this.currentYear = 0;
    this.monthlyFinancialSituations = new Map();
    this.monthlyLedgers = new Map();
    this.monthToSimulate = 1;
    this.yearlyInflationRate = yearlyInflationRate;
    this.monthlyInflationRate =
      this.#getMonthlyInflationRate(yearlyInflationRate);
    this.currentSimulationComments = [];
  }

  simulateForMonths(noOfMonths) {
    for (let index = 0; index < noOfMonths; index++) {
      if (!this.simulateOneMonth()) {
        return [false, this];
      }
    }

    return [true, this];
  }

  simulateOneMonth() {
    this.#beforeSimulationProcedure();
    const ledgers = this.#getLedgers();

    console.log("ledgers", ledgers);
    const simulatedFinSituation = this.#constructFinSituation(ledgers);

    simulatedFinSituation.comments = this.currentSimulationComments;

    console.log("simulated situation for month " + this.monthToSimulate, simulatedFinSituation);
    this.monthlyLedgers.set(this.monthToSimulate, ledgers);
    this.monthlyFinancialSituations.set(
      this.monthToSimulate,
      simulatedFinSituation
    );
    this.currentMonth = this.currentMonth + 1;
    this.monthToSimulate = this.monthToSimulate + 1;
    this.currentFinSituation = simulatedFinSituation;
    this.currentSimulationComments = [];

    console.log("this after a round", this);

    if (simulatedFinSituation.bankBalance < 0) {
      return false;
    } else {
      return true;
    }
  }

  #beforeSimulationProcedure() {
    this.events.forEach((finEvent) => {
      switch (finEvent.name) {
        case "job_loss":
          this.#simulateJobLoss(finEvent);
      }
    });
  }

  #simulateJobLoss(jobLossEvent) {
    const implementationDetails = jobLossEvent.implementationDetails;
    const monthToSimulate = this.monthToSimulate;
    if (
      monthToSimulate >= implementationDetails.fromMonth &&
      monthToSimulate <= implementationDetails.toMonth
    ) {
      this.currentFinSituation.monthlyIncome = 0;
    }

    if (monthToSimulate === implementationDetails.toMonth + 1) {
      // Job loss event just ended
      this.currentFinSituation.monthlyIncome =
        implementationDetails.postJlMonthlyIncome;
    }

    if (monthToSimulate == implementationDetails.fromMonth) {
      this.currentSimulationComments = this.currentSimulationComments.concat({
        type: "warn",
        text: "You lost your job",
      });
    }

    if (monthToSimulate == implementationDetails.toMonth) {
      this.currentSimulationComments = this.currentSimulationComments.concat({
        type: "good",
        text: "You got another job starting next month!",
      });
    }
  }

  #constructFinSituation(ledgers) {
    console.log("current month", this.currentMonth);
    console.log("current fin situation", this.currentFinSituation);
    const currentFinSituation = { ...this.currentFinSituation };
    return ledgers.reduce(this.#addLedgerToFinSituation, currentFinSituation);
  }

  #addCommnetToCurrentSimulation(comment) {
    this.currentSimulationComments =
      this.currentSimulationComments.concat(comment);
  }

  #addLedgerToFinSituation(finSituation, ledger) {
    console.log(finSituation);
    console.log(ledger);
    switch (ledger.type) {
      case "bank_balance_credit":
        finSituation.bankBalance =
          finSituation.bankBalance + Math.round(ledger.amount);
        return finSituation;
      case "bank_balance_debit":
        finSituation.bankBalance =
          finSituation.bankBalance - Math.round(ledger.amount);
        return finSituation;
    }
  }

  #getLastSimulatedFinancialSituation() {
    return this.monthlyFinancialSituations[this.currentMonth];
  }

  #getLedgers() {
    return this.events.reduce(this.#addEventLedgers.bind(this), []);
  }

  #addEventLedgers(other_event_ledgers, finEvent) {
    return other_event_ledgers.concat(this.#getEventLedgers(finEvent));
  }

  #getEventLedgers(finEvent) {
    switch (finEvent.name) {
      case "monthly_expense":
        return this.#getMonthlyExpenseLedgers();
      case "yearly_expense":
        return this.#getYearlyExpenseLedgers();
      case "monthly_income":
        return this.#getMonthlyIncomeLedgers();
      case "yearly_income":
        return this.#getYearlyIncomeLedgers();
      case "job_loss":
        return [];
    }
  }

  #getMonthlyExpenseLedgers() {
    const initMontlyExpense = this.initialFinSituation.monthlyExpense;
    const monthlyExpense =
      initMontlyExpense *
      Math.pow(1 + this.monthlyInflationRate, this.monthToSimulate);

    return [
      {
        type: "bank_balance_debit",
        amount: monthlyExpense,
        description:
          "Inflation adjusted expense for month number " + this.monthToSimulate,
      },
    ];
  }

  #getYearlyExpenseLedgers() {
    if (this.#itIsYearEnd()) {
      const yearNumber = this.#getYearOfSimulationMonth();
      const yearlyExpense =
        Math.pow(1 + this.yearlyInflationRate / 100, yearNumber) *
        this.currentFinSituation.yearlyExpense;
      console.log("yearlyExpense", yearlyExpense);
      return [
        {
          type: "bank_balance_debit",
          amount: yearlyExpense,
          description:
            "inflation adjusted once a year expense for year " + yearNumber,
        },
      ];
    } else {
      return [];
    }
  }

  #getMonthlyIncomeLedgers() {
    const monthlyIncome = this.currentFinSituation.monthlyIncome;
    return [
      {
        type: "bank_balance_credit",
        amount: monthlyIncome,
        description: "Monthly Income for month number " + this.monthToSimulate,
      },
    ];
  }

  #getYearlyIncomeLedgers() {
    if (this.#itIsYearEnd()) {
      const yearNumber = this.#getYearOfSimulationMonth();
      return [
        {
          type: "bank_balance_credit",
          amount: this.initialFinSituation.yearlyIncome,
          description: "Yearly Income for year " + yearNumber,
        },
      ];
    } else {
      return [];
    }
  }

  #itIsYearEnd() {
    return this.monthToSimulate % 12 === 0;
  }

  #getYearOfSimulationMonth() {
    return Math.ceil(this.monthToSimulate / 12);
  }

  #defaultEvents() {
    return [
      {
        label: "Monthly Expense",
        name: "monthly_expense",
        implementationDetails: {},
      },
      {
        label: "Yearly Expense",
        name: "yearly_expense",
        implementationDetails: {},
      },
      {
        label: "Monthly Income",
        name: "monthly_income",
        implementationDetails: {},
      },
      {
        label: "Yearly Income",
        name: "yearly_income",
        implementationDetails: {},
      },
    ];
  }

  #getMonthlyInflationRate(yearly_inflation_rate) {
    // If A is the yearly rate then formula for montly rate is
    // (A/100 + 1)^1/12 - 1

    return Math.pow(yearly_inflation_rate / 100 + 1, 1 / 12) - 1;
  }
}
export default Simulator;
