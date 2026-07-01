export const EnergyEngine = {

  domain: "ENG",

  evaluate(state, event) {
    const risk = this.calculateRisk(state, event);
    const mode = this.getMode(risk);

    return {
      domain: "ENG",
      event: event?.id || "UNKNOWN",
      risk,
      mode,
      actions: this.getActions(risk),
      solution: this.getSolution(mode, risk),
      cascade: this.getCascade(mode)
    };
  },

  calculateRisk(state, event) {
    let risk = 0;

    // Base system pressure
    if (state.oilPrice < 75) risk += 1;
    if (state.cpoPrice > 1100) risk += 1;
    if (state.fiscalPressure > 0.6) risk += 2;
    if (state.reserveLevel < 0.4) risk += 1;

    // Event impact injection
    if (event?.impact) risk += event.impact;

    return risk;
  },

  getMode(risk) {
    if (risk <= 2) return "NORMAL";
    if (risk <= 5) return "TRANSITION";
    return "CONTINGENCY";
  },

  getActions(risk) {
    if (risk > 6) {
      return [
        "Increase biodiesel blend immediately",
        "Activate strategic fuel reserves",
        "Reduce fuel imports",
        "Stabilize subsidy exposure",
        "Protect fiscal liquidity"
      ];
    }

    if (risk > 3) {
      return [
        "Adjust biodiesel blend gradually",
        "Monitor subsidy pressure",
        "Balance fuel imports",
        "Stabilize pricing mechanism"
      ];
    }

    return [
      "Optimize fuel efficiency",
      "Maintain current blend",
      "Monitor market conditions"
    ];
  },

  getSolution(mode, risk) {

    if (mode === "CONTINGENCY") {
      return {
        strategy: "ENERGY SECURITY PRIORITY",
        objective: "Stabilize national fuel system under stress",
        response: [
          "Maximize biodiesel usage",
          "Secure domestic supply",
          "Reduce external dependency",
          "Protect fiscal stability"
        ]
      };
    }

    if (mode === "TRANSITION") {
      return {
        strategy: "BALANCED ADJUSTMENT",
        objective: "Gradual stabilization of fuel system",
        response: [
          "Optimize blend ratio",
          "Manage subsidy exposure",
          "Smooth supply adjustments"
        ]
      };
    }

    return {
      strategy: "COST OPTIMIZATION",
      objective: "Maintain efficiency under stable conditions",
      response: [
        "Maintain current fuel mix",
        "Optimize procurement",
        "Monitor global prices"
      ]
    };
  },

  getCascade(mode) {
    if (mode === "CONTINGENCY") {
      return [
        "FX pressure increase",
        "Inflation risk increase",
        "Fiscal deficit expansion",
        "Import dependency shock"
      ];
    }

    if (mode === "TRANSITION") {
      return [
        "Moderate FX volatility",
        "Controlled inflation pressure",
        "Budget tightening"
      ];
    }

    return [
      "Stable macro conditions",
      "Low FX impact",
      "Controlled subsidy exposure"
    ];
  }
};