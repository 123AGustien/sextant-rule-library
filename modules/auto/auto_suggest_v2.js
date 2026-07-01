export const AutoSuggestV2 = {

  version: "2.0",

  evaluate(domains) {

    const summary = this.aggregate(domains);
    const globalRisk = this.calculateGlobalRisk(summary);
    const mode = this.getGlobalMode(globalRisk);

    return {

      version: this.version,

      globalRisk,
      mode,

      domainSummary: summary,

      priorityActions: this.generatePriorityActions(summary, mode),

      cascadeMatrix: this.buildCascade(summary),

      systemSignal: this.getSystemSignal(globalRisk),

      recommendedStance: this.getStance(mode)

    };

  },

  aggregate(domains) {

    return {
      FX: domains?.FX?.risk || 0,
      DC: domains?.DC?.risk || 0,
      CYB: domains?.CYB?.risk || 0,
      INF: domains?.INF?.risk || 0,
      ENG: domains?.ENG?.risk || 0
    };

  },

  calculateGlobalRisk(summary) {

    // weighted system (ENG + FX are highest macro impact)
    return (
      (summary.FX * 1.3) +
      (summary.ENG * 1.3) +
      (summary.DC * 1.1) +
      (summary.CYB * 1.2) +
      (summary.INF * 1.0)
    );

  },

  getGlobalMode(risk) {

    if (risk >= 18) return "SYSTEM_CRITICAL";
    if (risk >= 10) return "SYSTEM_WARNING";
    return "SYSTEM_STABLE";

  },

  generatePriorityActions(summary, mode) {

    const actions = [];

    if (summary.FX >= 5) {
      actions.push("Stabilize currency exposure immediately");
    }

    if (summary.ENG >= 5) {
      actions.push("Activate energy subsidy control layer");
    }

    if (summary.CYB >= 5) {
      actions.push("Isolate cyber threat surface");
    }

    if (summary.DC >= 5) {
      actions.push("Reduce data center load and redistribute compute");
    }

    if (summary.INF >= 5) {
      actions.push("Activate infrastructure fallback routing");
    }

    if (mode === "SYSTEM_CRITICAL") {
      actions.push("ENTER FULL RESILIENCE MODE");
      actions.push("Freeze non-essential system operations");
    }

    return actions;

  },

  buildCascade(summary) {

    return {

      FX: summary.ENG > 6 ? "Fuel subsidy pressure → FX weakening" : "Stable",

      ENG: summary.FX > 5 ? "Currency shock → fuel import stress" : "Stable",

      CYB: summary.DC > 6 ? "Infra load → attack surface expansion" : "Stable",

      DC: summary.CYB > 6 ? "Cyber disruption → compute instability" : "Stable",

      INF: summary.FX > 5 ? "Import cost shock → infrastructure strain" : "Stable"

    };

  },

  getSystemSignal(risk) {

    if (risk >= 18) return "GLOBAL_CRISIS";
    if (risk >= 10) return "GLOBAL_STRESS";
    return "GLOBAL_STABLE";

  },

  getStance(mode) {

    if (mode === "SYSTEM_CRITICAL") {
      return {
        posture: "DEFENSIVE LOCKDOWN",
        objective: "Preserve system stability at all costs"
      };
    }

    if (mode === "SYSTEM_WARNING") {
      return {
        posture: "CONTROLLED INTERVENTION",
        objective: "Stabilize cross-domain pressure"
      };
    }

    return {
      posture: "OPTIMIZATION",
      objective: "Maintain efficiency and balance"
    };
  }

};