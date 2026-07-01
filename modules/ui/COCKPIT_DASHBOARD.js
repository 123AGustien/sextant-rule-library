export const COCKPIT_DASHBOARD = {

  render(domains) {

    const summary = this.summarize(domains);
    const globalRisk = this.globalRisk(summary);

    return {

      globalRisk,
      status: this.getStatus(globalRisk),

      tiles: {
        FX: this.tile(domains.FX),
        DC: this.tile(domains.DC),
        CYB: this.tile(domains.CYB),
        INF: this.tile(domains.INF),
        ENG: this.tile(domains.ENG)
      },

      alerts: this.getAlerts(domains),

      systemView: this.systemView(globalRisk)

    };

  },

  summarize(domains) {

    return Object.keys(domains || {}).reduce((acc, k) => {
      acc[k] = domains[k]?.risk || 0;
      return acc;
    }, {});

  },

  globalRisk(summary) {

    return Object.values(summary).reduce((a, b) => a + b, 0);

  },

  getStatus(risk) {

    if (risk >= 18) return "CRITICAL";
    if (risk >= 10) return "WARNING";
    return "STABLE";

  },

  tile(domain) {

    if (!domain) return null;

    return {
      risk: domain.risk,
      mode: domain.mode,
      alert: domain.risk >= 7
    };

  },

  getAlerts(domains) {

    const alerts = [];

    Object.entries(domains || {}).forEach(([key, d]) => {
      if (d?.risk >= 7) {
        alerts.push(`${key}_CRITICAL`);
      }
    });

    return alerts;

  },

  systemView(risk) {

    return {
      label:
        risk >= 18 ? "SYSTEM COLLAPSE RISK" :
        risk >= 10 ? "SYSTEM UNDER STRESS" :
        "SYSTEM STABLE",

      risk
    };

  }

};