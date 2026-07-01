export const DOMAIN_UNIFIED_STANDARD = {

  version: "1.0",

  create(domain, logic) {

    return {

      domain,

      engine(state, event) {

        const result = logic(state, event);

        return {
          domain,
          risk: result.risk ?? 0,
          mode: this.getMode(result.risk ?? 0),
          severity: this.getSeverity(result.risk ?? 0),
          actions: result.actions ?? [],
          solution: result.solution ?? {},
          cascade: result.cascade ?? []
        };

      },

      cockpit(engineResult) {

        return {
          domain,
          risk: engineResult.risk,
          mode: engineResult.mode,
          severity: engineResult.severity,

          ui: {
            color: this.getColor(engineResult.mode),
            alert: engineResult.risk >= 7
          }
        };

      },

      autoHook(engineResult) {

        return {
          domain,
          signal: this.getSignal(engineResult.risk),
          weight: engineResult.risk
        };

      },

      getMode(risk) {
        if (risk <= 2) return "NORMAL";
        if (risk <= 5) return "TRANSITION";
        return "CONTINGENCY";
      },

      getSeverity(risk) {
        if (risk >= 7) return "HIGH";
        if (risk >= 4) return "MEDIUM";
        return "LOW";
      },

      getSignal(risk) {
        if (risk >= 7) return "CRITICAL";
        if (risk >= 4) return "WARNING";
        return "STABLE";
      },

      getColor(mode) {
        if (mode === "CONTINGENCY") return "red";
        if (mode === "TRANSITION") return "yellow";
        return "green";
      }

    };

  }

};