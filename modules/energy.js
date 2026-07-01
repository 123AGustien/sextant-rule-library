export const EnergyModule = {
  evaluate(state) {
    let risk = 0;

    if (state.oilPrice < 75) risk += 1;
    if (state.cpoPrice > 1100) risk += 1;
    if (state.fiscalPressure > 0.6) risk += 2;
    if (state.reserveLevel < 0.4) risk += 1;

    return {
      domain: "ENG",
      risk,
      mode:
        risk < 2 ? "NORMAL" :
        risk < 4 ? "TRANSITION" :
        "CONTINGENCY",

      actions: this.getActions(risk)
    };
  },

  getActions(risk) {
    if (risk >= 4) {
      return [
        "Increase biodiesel blend",
        "Activate strategic reserves",
        "Reduce fuel imports",
        "Prioritize energy security"
      ];
    }

    if (risk >= 2) {
      return [
        "Adjust biodiesel gradually",
        "Monitor subsidy exposure"
      ];
    }

    return [
      "Optimize fuel efficiency",
      "Maintain current blend"
    ];
  }
};