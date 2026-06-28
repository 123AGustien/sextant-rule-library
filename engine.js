/***********************
 * SEXTANT ENGINE v2.0
 * Cross-Domain Propagation + System Scoring + Scenario Map Integration
 ***********************/

/* =========================
   SYSTEM STATE
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

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const result = evaluateRule(parsed);

  // STEP 1: Apply base domain result
  systemState = applyPrimaryImpact(ruleId, result);

  // STEP 2: Apply cross-domain propagation (SCENARIO_MAP)
  systemState = applyScenarioPropagation(ruleId, systemState);

  // STEP 3: Calculate system-wide metrics
  const metrics = calculateSystemMetrics(systemState);

  // STEP 4: Render output
  renderOutput(ruleId, result, systemState, metrics);
}

/* =========================
   RULE LOADER
========================= */

function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
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
    return { risk: "RED", cascade: "Critical impact", action: "Immediate response required" };
  }

  if (rule.hasOrange) {
    return { risk: "ORANGE", cascade: "Active stress propagation", action: "Mitigation required" };
  }

  if (rule.hasYellow) {
    return { risk: "YELLOW", cascade: "Early warning signals", action: "Monitor closely" };
  }

  return { risk: "GREEN", cascade: "Stable conditions", action: "No action required" };
}

/* =========================
   PRIMARY IMPACT
========================= */

function applyPrimaryImpact(ruleId, result) {

  if (ruleId.startsWith("FIN")) systemState.FIN = result.risk;
  if (ruleId.startsWith("DC")) systemState.DC = result.risk;
  if (ruleId.startsWith("CYB")) systemState.CYB = result.risk;
  if (ruleId.startsWith("INF")) systemState.INF = result.risk;

  return systemState;
}

/* =========================
   SCENARIO MAP PROPAGATION
========================= */

function applyScenarioPropagation(ruleId, state) {

  const map = getPropagationMap();

  const triggers = map[ruleId] || [];

  triggers.forEach(t => {
    state[t.target] = escalate(state[t.target], t.level);
  });

  return state;
}

/* =========================
   PROPAGATION MAP (FROM SCENARIO_MAP)
========================= */

function getPropagationMap() {

  return {

    // FIN triggers
    "FIN-001": [
      { target: "DC", level: "YELLOW" },
      { target: "CYB", level: "ORANGE" }
    ],

    // DC triggers
    "DC-010": [
      { target: "CYB", level: "ORANGE" },
      { target: "INF", level: "ORANGE" },
      { target: "FIN", level: "ORANGE" }
    ],

    // CYB triggers
    "CYB-010": [
      { target: "DC", level: "RED" },
      { target: "FIN", level: "ORANGE" },
      { target: "INF", level: "ORANGE" }
    ],

    // INF triggers
    "INF-010": [
      { target: "DC", level: "RED" },
      { target: "CYB", level: "ORANGE" },
      { target: "FIN", level: "ORANGE" }
    ]
  };
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
   SYSTEM METRICS
========================= */

function riskToScore(risk) {
  return { GREEN: 0, YELLOW: 1, ORANGE: 2, RED: 3 }[risk] || 0;
}

function calculateSystemMetrics(state) {

  const totalStress =
    riskToScore(state.FIN) +
    riskToScore(state.DC) +
    riskToScore(state.CYB) +
    riskToScore(state.INF);

  const maxStress = 12;

  const resilienceIndex = 1 - (totalStress / maxStress);

  return {
    totalStress,
    resilienceIndex: resilienceIndex.toFixed(2)
  };
}

/* =========================
   RENDER
========================= */

function renderOutput(ruleId, result, state, metrics) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>

    <p><b>Risk:</b> ${result.risk}</p>
    <p><b>Cascade:</b> ${result.cascade}</p>
    <p><b>Action:</b> ${result.action}</p>

    <hr>

    <h4>System State</h4>
    <p>FIN: ${state.FIN}</p>
    <p>DC: ${state.DC}</p>
    <p>CYB: ${state.CYB}</p>
    <p>INF: ${state.INF}</p>

    <hr>

    <h4>Metrics</h4>
    <p><b>Total Stress:</b> ${metrics.totalStress}</p>
    <p><b>Resilience Index:</b> ${metrics.resilienceIndex}</p>
  `;
}