
let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

async function runScenario(ruleId) {

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const result = evaluateRule(parsed);

  // STEP 8: cross-domain propagation
  systemState = applyCrossDomainEffects(ruleId, result);

  renderOutput(ruleId, result, systemState);
}

// Map rule ID → file
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

// Parse rule
function parseRule(text) {
  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

// Evaluate rule
function evaluateRule(rule) {

  if (rule.hasRed) {
    return { risk: "RED", cascade: "High system impact", action: "Immediate response required" };
  }

  if (rule.hasOrange) {
    return { risk: "ORANGE", cascade: "Active stress propagation", action: "Mitigation required" };
  }

  if (rule.hasYellow) {
    return { risk: "YELLOW", cascade: "Early warning signals", action: "Monitor closely" };
  }

  return { risk: "GREEN", cascade: "Stable conditions", action: "No action required" };
}

// STEP 8: CROSS DOMAIN ENGINE
function applyCrossDomainEffects(ruleId, result) {

  // reset baseline
  systemState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };

  // FIN impacts
  if (ruleId.startsWith("FIN")) {
    systemState.FIN = result.risk;

    if (result.risk === "ORANGE" || result.risk === "RED") {
      systemState.DC = "YELLOW";
    }

    if (result.risk === "RED") {
      systemState.CYB = "ORANGE";
    }
  }

  // DC impacts
  if (ruleId.startsWith("DC")) {
    systemState.DC = result.risk;

    if (result.risk === "RED") {
      systemState.CYB = "ORANGE";
      systemState.INF = "YELLOW";
    }
  }

  // CYB impacts
  if (ruleId.startsWith("CYB")) {
    systemState.CYB = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = "ORANGE";
    }
  }

  // INF impacts
  if (ruleId.startsWith("INF")) {
    systemState.INF = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = "YELLOW";
      systemState.CYB = "YELLOW";
    }
  }

  return systemState;
}

// Render output (UPDATED)
function renderOutput(ruleId, result, systemState) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>

    <p><b>Risk Level:</b> ${result.risk}</p>
    <p><b>Cascade:</b> ${result.cascade}</p>
    <p><b>Action:</b> ${result.action}</p>

    <hr>

    <h4>System State (Cross-Domain)</h4>
    <p>FIN: ${systemState.FIN}</p>
    <p>DC: ${systemState.DC}</p>
    <p>CYB: ${systemState.CYB}</p>
    <p>INF: ${systemState.INF}</p>
  `;
}
