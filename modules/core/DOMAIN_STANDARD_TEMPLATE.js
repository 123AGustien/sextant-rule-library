export const DOMAIN_TEMPLATE = {

  domain: "X",

  version: "1.0",

  engine(state, event) {
    return {
      risk: 0,
      mode: "NORMAL",
      severity: "LOW",
      actions: [],
      solution: {},
      cascade: []
    };
  },

  cockpit(engineResult) {
    return {
      domain: "X",
      risk: engineResult.risk,
      mode: engineResult.mode,
      severity: engineResult.severity,
      ui: {
        color: "green",
        alert: false
      }
    };
  },

  autoHook(engineResult) {
    return {
      signal: "STABLE",
      weight: engineResult.risk
    };
  }

};