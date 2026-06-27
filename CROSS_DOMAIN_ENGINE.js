let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

function applyCrossDomainEffects(ruleId, result) {

  // Reset influence each run
  systemState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };

  // PRIMARY EFFECT
  if (ruleId.startsWith("FIN")) {
    systemState.FIN = result.risk;

    // FIN affects DC (economic → infrastructure pressure)
    if (result.risk === "ORANGE" || result.risk === "RED") {
      systemState.DC = "YELLOW";
    }

    // FIN affects CYB (financial stress → attack surface risk)
    if (result.risk === "RED") {
      systemState.CYB = "ORANGE";
    }
  }

  // DC effects
  if (ruleId.startsWith("DC")) {
    systemState.DC = result.risk;

    // DC failure affects CYB (system instability)
    if (result.risk === "RED") {
      systemState.CYB = "ORANGE";
    }

    // DC failure affects INF
    if (result.risk === "RED") {
      systemState.INF = "YELLOW";
    }
  }

  // CYB effects
  if (ruleId.startsWith("CYB")) {
    systemState.CYB = result.risk;

    // Cyber attack affects FIN confidence
    if (result.risk === "RED") {
      systemState.FIN = "ORANGE";
    }
  }

  // INF effects
  if (ruleId.startsWith("INF")) {
    systemState.INF = result.risk;

    // Network outage affects all systems slightly
    if (result.risk === "RED") {
      systemState.FIN = "YELLOW";
      systemState.CYB = "YELLOW";
    }
  }

  return systemState;
}
