export const ENG_COCKPIT_INTEGRATION = {

  domain: "ENG",
  version: "1.1",

  connect(engineResult, cockpitState = {}) {

    if (!engineResult) {
      return this.emptyState();
    }

    const normalized = this.normalize(engineResult);

    return {

      domain: "ENG",

      // Core risk layer
      risk: normalized.risk,
      mode: normalized.mode,
      severity: normalized.severity,
      solutionLayer: normalized.solutionLayer,

      // Operational outputs
      actions: normalized.actions,
      solution: normalized.solution,
      cascade: normalized.cascade,

      // Cockpit UI layer
      ui: {
        tile: "ENG",
        color: this.getColor(normalized.mode),
        alert: normalized.risk >= 7,
        pulse: normalized.mode === "CONTINGENCY"
      },

      // System intelligence hook
      signal: this.getSignal(normalized),

      // Merge back into cockpit state
      stateUpdate: {
        ENG: normalized
      }

    };

  },

  normalize(result) {

    return {

      risk: result.risk ?? 0,
      mode: result.mode ?? "NORMAL",
      severity: result.severity ?? "LOW",
      solutionLayer: result.solutionLayer ?? "Price Buffer Layer",

      actions: result.actions ?? [],

      solution: result.solution ?? {
        strategy: "UNKNOWN",
        objective: "No data available",
        response: []
      },

      cascade: result.cascade ?? []

    };

  },

  getSignal(result) {

    if (result.risk >= 7) {
      return "ENG_CRITICAL";
    }

    if (result.risk >= 4) {
      return "ENG_WARNING";
    }

    return "ENG_STABLE";

  },

  getColor(mode) {

    if (mode === "CONTINGENCY") return "red";
    if (mode === "TRANSITION") return "yellow";
    return "green";

  },

  emptyState() {

    return {

      domain: "ENG",
      risk: 0,
      mode: "NORMAL",
      severity: "LOW",
      solutionLayer: "Price Buffer Layer",
      actions: [],
      cascade: [],
      ui: {
        tile: "ENG",
        color: "green",
        alert: false,
        pulse: false
      },
      signal: "ENG_STABLE"

    };

  }

};