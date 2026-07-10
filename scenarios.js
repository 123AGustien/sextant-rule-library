const SPD_SCENARIOS = {

  FX_STRESS: {
    name: "FX Market Stress",
    impact: {
      FX: 60,
      DC: 10,
      CYB: 5,
      INF: 10,
      EN: 20
    },
    solution: [
      "Activate currency monitoring",
      "Review liquidity buffer",
      "Increase market alert level"
    ]
  },

  DC_LOAD: {
    name: "Data Centre Load Surge",
    impact: {
      FX: 5,
      DC: 75,
      CYB: 15,
      INF: 25,
      EN: 35
    },
    solution: [
      "Shift workload to secondary site",
      "Enable demand management",
      "Monitor cooling systems"
    ]
  },

  CYBER_EVENT: {
    name: "Cyber Infrastructure Event",
    impact: {
      FX: 10,
      DC: 30,
      CYB: 70,
      INF: 40,
      EN: 5
    },
    solution: [
      "Activate cyber containment",
      "Switch to backup systems",
      "Begin incident response protocol"
    ]
  },

  INFRA_STRAIN: {
    name: "Critical Infrastructure Strain",
    impact: {
      FX: 20,
      DC: 30,
      CYB: 15,
      INF: 80,
      EN: 30
    },
    solution: [
      "Deploy infrastructure response team",
      "Prioritize essential services",
      "Increase resilience monitoring"
    ]
  },

  BIODIESEL_SHORTAGE: {
    name: "Energy Supply Disruption",
    impact: {
      FX: 15,
      DC: 20,
      CYB: 5,
      INF: 40,
      EN: 70
    },
    solution: [
      "Activate alternative fuel reserve",
      "Reduce non-critical load",
      "Monitor supply chain"
    ]
  }

};
