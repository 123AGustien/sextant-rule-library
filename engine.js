/***********************
 * SEXTANT ENGINE v1.1
 * Cross-Domain + Scoring + Safe State
 ***********************/

/* =========================
   GLOBAL STATE
========================= */
let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

/* =========================
   MAIN ENTRY POINT
========================= */
async function runScenario(ruleId) {

  resetSystemState();

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const result = evaluateRule(parsed);

  systemState = applyCrossDomainEffects(ruleId, result);

  const metrics = calculateSystemMetrics(systemState);

  renderOutput(ruleId, result, systemState, metrics);
}

/* =========================
   RESET SYSTEM
========================= */
function resetSystemState() {
  systemState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };
}

/* =========================
   RULE LOADER
========================= */
function getRulePath(ruleId) {

  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";

  throw new Error("Unknown rule ID: " + ruleId);
}

/* =========================
   RULE PARSER
========================= */
function parseRule(text) {
  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

/* =========================
   RISK ENGINE
========================= */
function evaluateRule(rule) {

  if (rule.hasRed) {
    return {
      risk: "RED",
      cascade: "High system impact",
      action: "Immediate response required"
    };
  }

  if (rule.hasOrange) {
    return {
      risk: "ORANGE",
      cascade: "Active stress propagation",
      action: "Mitigation required"
    };
  }

  if (rule.hasYellow) {
    return {
      risk: "YELLOW",
      cascade: "Early warning signals",
      action: "Monitor closely"
    };
  }

  return {
    risk: "GREEN",
    cascade: "Stable conditions",
    action: "No action required"
  };
}

/* =========================
   CROSS-DOMAIN ENGINE (STATEFUL)
========================= */
function applyCrossDomainEffects(ruleId, result) {

  if (ruleId.startsWith("FIN")) {
    systemState.FIN = result.risk;

    if (result.risk === "ORANGE") {
      systemState.DC = escalate(systemState.DC, "YELLOW");
    }

    if (result.risk === "RED") {
      systemState.DC = escalate(systemState.DC, "ORANGE");
      systemState.CYB = escalate(systemState.CYB, "ORANGE");
    }
  }

  if (ruleId.startsWith("DC")) {
    systemState.DC = result.risk;

    if (result.risk === "RED") {
      systemState.CYB = escalate(systemState.CYB, "ORANGE");
      systemState.INF = escalate(systemState.INF, "YELLOW");
    }
  }

  if (ruleId.startsWith("CYB")) {
    systemState.CYB = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = escalate(systemState.FIN, "ORANGE");
    }
  }

  if (ruleId.startsWith("INF")) {
    systemState.INF = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = escalate(systemState.FIN, "YELLOW");
      systemState.CYB = escalate(systemState.CYB, "YELLOW");
    }
  }

  return systemState;
}

/* =========================
   ESCALATION LOGIC
========================= */
function escalate(current, newLevel) {

  const rank = {
    GREEN: 0,
    YELLOW: 1,
    ORANGE: 2,
    RED: 3
  };

  return (rank[newLevel] > rank[current]) ? newLevel : current;
}

/* =========================
   SYSTEM SCORING ENGINE
========================= */
function riskToScore(risk) {
  if (risk === "GREEN") return 0;
  if (risk === "YELLOW") return 1;
  if (risk === "ORANGE") return 2;
  if (risk === "RED") return 3;
  return 0;
}

function calculateSystemMetrics(state) {

  const fin = riskToScore(state.FIN);
  const dc  = riskToScore(state.DC);
  const cyb = riskToScore(state.CYB);
  const inf = riskToScore(state.INF);

  const totalStress = fin + dc + cyb + inf;

  const maxStress = 12;

  const resilienceIndex = 1 - (totalStress / maxStress);

  return {
    totalStress,
    resilienceIndex: Number(resilienceIndex.toFixed(2))
  };
}

/* =========================
   RENDER OUTPUT
========================= */
function renderOutput(ruleId, result, systemState, metrics) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>

    <p><b>Main Risk:</b> ${result.risk}</p>
    <p><b>Cascade:</b> ${result.cascade}</p>
    <p><b>Action:</b> ${result.action}</p>

    <hr>

    <h4>System State (Cross-Domain)</h4>
    <p>FIN: ${systemState.FIN}</p>
    <p>DC: ${systemState.DC}</p>
    <p>CYB: ${systemState.CYB}</p>
    <p>INF: ${systemState.INF}</p>

    <hr>

    <h4>System Metrics</h4>
    <p><b>Total Stress:</b> ${metrics.totalStress} / 12</p>
    <p><b>Resilience Index:</b> ${metrics.resilienceIndex}</p>
  `;
}
