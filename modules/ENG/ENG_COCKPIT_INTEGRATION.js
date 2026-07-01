export const ENG_COCKPIT_INTEGRATION = {

  domain: "ENG",

  version: "1.0",

  connect(engineResult, cockpitState) {

    return {
      domain: "ENG",

      risk: engineResult?.risk || 0,
      mode: engineResult?.mode || "NORMAL",
      severity: engineResult?.severity || "LOW",

      solutionLayer: engineResult?.solutionLayer || "Price Buffer Layer",

      actions: engineResult?.actions || [],

      cascade: engineResult?.cascade || [],

      ui: {
        tile: "ENG",
        color: this.getColor(engineResult?.mode),
        alert: engineResult?.risk >= 7
      }

    };

  },

  getColor(mode) {

    if (mode === "CONTINGENCY") return "red";
    if (mode === "TRANSITION") return "yellow";
    return "green";

  }

};