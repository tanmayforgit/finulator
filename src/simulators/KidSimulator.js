class KidSimulator {
  constructor(finSituation, kidEvent, monthlyInflationRate) {
    this.finSituation = finSituation;
    this.kidEvent = kidEvent;
    this.implementationDetails = kidEvent.implementationDetails;
    this.monthlyInflationRate = monthlyInflationRate;
    this.deliveryExpense = this.implementationDetails.deliveryExpense;
    this.oneYearExpense = this.implementationDetails.oneYearExpense;
    this.oneToFiveExpense = this.implementationDetails.oneToFiveExpense;
    this.fiveToTenExpense = this.implementationDetails.fiveToTenExpense;
    this.tenToFifteenExpense = this.implementationDetails.tenToFifteenExpense;
    this.fifteenToEighteenExpense =
      this.implementationDetails.fifteenToEighteenExpense;
    this.eighteenToTwentyTwoExpense =
      this.implementationDetails.eighteenToTwentyTwoExpense;
    this.twentyTwoToTwentyFiveExpense =
      this.implementationDetails.twentyTwoToTwentyFiveExpense;
    this.kidBirthMonth = this.implementationDetails.kidBirthMonth;
    this.kidName = this.implementationDetails.kidName;
  }

  simulate(simulationMonthNumber) {
    let ledgers = [];
    let comments = [];
    const kidAge = this.#getKidAge(simulationMonthNumber);
    console.log("Kid Age", kidAge);

    if (kidAge === -1 || kidAge > 300) {
      // Kid is not born yet
      return { ledgers: [], comments: [] };
    } else if (kidAge === 0) {
      // Kid birth is this month!
      const deliveryExpense = this.#applyInflation(
        this.implementationDetails.deliveryExpense,
        simulationMonthNumber
      );
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: deliveryExpense,
          description: "Delivery expenses for " + this.kidName,
        },
        {
          type: "bank_balance_debit",
          amount: this.#getBelowOneYearMonthlyExpense(simulationMonthNumber),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      comments = comments.concat([
        {
          type: "good",
          text: "kid " + this.kidName + " is born!",
        },
      ]);
    } else if (kidAge < 12) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getBelowOneYearMonthlyExpense(simulationMonthNumber),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
    } else if (kidAge >= 12 && kidAge < 60) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getOneToFiveMonthlyExpense(simulationMonthNumber),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 12) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is One year old" },
        ]);
      }
    } else if (kidAge >= 60 && kidAge < 120) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getFiveToTenMonthlyExpense(simulationMonthNumber),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 60) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is five year old" },
        ]);
      }
    } else if (kidAge >= 120 && kidAge < 180) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getTenToFifteenMonthlyExpense(simulationMonthNumber),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 120) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is 10 year old" },
        ]);
      }
    } else if (kidAge >= 180 && kidAge < 216) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getFifteenToEighteenMonthlyExpense(
            simulationMonthNumber
          ),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 180) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is 15 year old" },
        ]);
      }
    } else if (kidAge >= 216 && kidAge < 264) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getEighteenToTwntyTwoMonthlyExpense(
            simulationMonthNumber
          ),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 216) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is 18 year old" },
          {
            type: "good",
            text:
              "You should introduce " +
              this.kidName +
              " to finulator at this point :)",
          },
        ]);
      }
    } else if (kidAge >= 264 && kidAge < 300) {
      ledgers = ledgers.concat([
        {
          type: "bank_balance_debit",
          amount: this.#getFifteenToEighteenMonthlyExpense(
            simulationMonthNumber
          ),
          description: "Inflation Adjusted monthly expense for " + this.kidName,
        },
      ]);
      if (kidAge == 264) {
        comments = comments.concat([
          { type: "info", text: this.kidName + " is 22 year old" },
        ]);
      }
    }

    return { ledgers: ledgers, comments: comments };
  }

  beforeSimulationProcedure(simulationMonthNumber) {
    return {finSituation: this.finSituation, comments: []};
  }

  #getBelowOneYearMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(this.oneYearExpense, simulationMonthNumber);
  }

  #getOneToFiveMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(this.oneToFiveExpense, simulationMonthNumber);
  }

  #getFiveToTenMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(this.fiveToTenExpense, simulationMonthNumber);
  }

  #getTenToFifteenMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(
      this.tenToFifteenExpense,
      simulationMonthNumber
    );
  }

  #getFifteenToEighteenMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(
      this.fifteenToEighteenExpense,
      simulationMonthNumber
    );
  }

  #getEighteenToTwntyTwoMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(
      this.eighteenToTwentyTwoExpense,
      simulationMonthNumber
    );
  }

  #getTwntyTwoToTwentyFiveMonthlyExpense(simulationMonthNumber) {
    return this.#applyInflation(
      this.twentyTwoToTwentyFiveExpense,
      simulationMonthNumber
    );
  }

  #getKidAge(simulationMonthNumber) {
    if (simulationMonthNumber < this.kidBirthMonth) {
      return -1;
    } else {
      return simulationMonthNumber - this.kidBirthMonth;
    }
  }

  #applyInflation(amount, monthNumber) {
    return Math.pow(1 + this.monthlyInflationRate, monthNumber) * amount;
  }
}

export default KidSimulator;
