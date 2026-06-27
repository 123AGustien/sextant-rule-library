/***********************
 * SEXTANT ENGINE v10.0
 * STEP 18–19–20 FULL INTEGRATION
 * Explainability + Governance + Event Driven System
 ***********************/

/* =========================
   GLOBAL SYSTEM STATE
========================= */
let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

/* =========================
   MARKET + MACRO STATE
========================= */
let marketData = {
  FX: {
    SGD_IDR: null,
    volatility: 0.2,
    lastUpdate: null
  }
};

let macroState = {
  BONDS: { yieldStress: 0 },
  LIQUIDITY: { stress: 0 },
  BANKING: { stress: 0 },
  SYSTEM: { contagionIndex: 0 }
};

/* =========================
   STEP 18 — AUDIT + EXPLAINABILITY
========================= */
let auditLog = [];

function logEvent(event) {
  auditLog.push({
    timestamp: Date.now(),
    ...event
  });
}

function generateExplanation(ruleId, components, risk) {

  let reasons = [];

  if (components.fx > 0.1) reasons.push("FX volatility impact detected");
  if (components.macro > 0.2) reasons.push("Macro contagion pressure present");
  if (components.shock > 0.3) reasons.push("Market shock amplification detected");
  if (components.base > 0.5) reasons.push("High structural baseline risk");

  if (reasons.length === 0) reasons.push("Stable baseline conditions");

  return {
    summary: `Risk classified as ${risk}`,
    factors: reasons
  };
}

function evaluateExplainableRisk(ruleId, components, finalScore, risk) {

  const explanation = generateExplanation(ruleId, components, risk);

  logEvent({
    type: "RISK_EVALUATION",
    ruleId,
    components,
    finalScore,
    risk,
    explanation
  });

  return { risk, explanation };
}

/* =========================
   STEP 19 — GOVERNANCE LAYER
========================= */
let governance = {
  ruleVersions: {},
  approvals: {},
  activeProfile: "DEFAULT"
};

function getRuleVersion(ruleId) {
  return governance.ruleVersions[ruleId]?.active || "v1.0";
}

function registerRuleVersion(ruleId, version, approvedBy = "SYSTEM") {

  governance.ruleVersions[ruleId] = {
    active: version,
    approvedBy,
    updatedAt: Date.now()
  };
}

/* =========================
   STEP 20 — EVENT INGESTION ENGINE
========================= */
let eventStream = [];

function ingestEvent(event) {

  eventStream.push({
    timestamp: Date.now(),
    ...event
  });

  triggerScenarioFromEvent(event);
}

function triggerScenarioFromEvent(event) {

  if (event.type === "FX_SPIKE") {
    runSystemicSimulation(["FIN-001"]);
  }

  if (event.type === "BOND_STRESS") {
    runSystemicSimulation(["FIN-002"]);
  }

  if (event.type === "CYBER_ATTACK") {
    runSystemicSimulation(["CYB-001"]);
  }

  if (event.type === "INFRA_FAILURE") {
    runSystemicSimulation(["INF-001"]);
  }
}

/* =========================
   MAIN ENGINE ENTRY (STEP 20 CORE)
========================= */
async function runSystemicSimulation(ruleIds) {

  await updateMarketData();
  await updateMacroMarkets();

  let state = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };

  for (let ruleId of ruleIds) {

    const filePath = getRulePath(ruleId);
    const ruleText = await fetch(filePath).then(r => r.text());

    const parsed = parseRule(ruleText);

    const base = getBaseRisk(ruleId);
    const shock = generateShock();

    const fx = computeFXImpact(ruleId);
    const macro = macroState.SYSTEM.contagionIndex;

    const finalScore = base + shock + fx + macro;

    const risk = mapRisk(finalScore);

    const explained = evaluateExplainableRisk(
      ruleId,
      { base, shock, fx, macro },
      finalScore,
      risk
    );

    state = applyToWorld(ruleId, risk, state);
  }

  state = applyMacroOverlay(state);

  renderFinal(state);
}

/* =========================
   SUPPORT FUNCTIONS
========================= */
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

function parseRule(text) {
  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

function getBaseRisk(ruleId) {
  if (ruleId.startsWith("FIN")) return 0.5;
  if (ruleId.startsWith("DC")) return 0.4;
  if (ruleId.startsWith("CYB")) return 0.6;
  if (ruleId.startsWith("INF")) return 0.45;
  return 0.3;
}

function generateShock() {
  return Math.random() * 0.4;
}

function computeFXImpact(ruleId) {
  return marketData.FX.volatility || 0.2;
}

function mapRisk(score) {
  if (score < 0.3) return "GREEN";
  if (score < 0.6) return "YELLOW";
  if (score < 0.8) return "ORANGE";
  return "RED";
}

/* =========================
   WORLD STATE UPDATE
========================= */
function applyToWorld(ruleId, risk, state) {

  if (ruleId.startsWith("FIN")) state.FIN = risk;
  if (ruleId.startsWith("DC")) state.DC = risk;
  if (ruleId.startsWith("CYB")) state.CYB = risk;
  if (ruleId.startsWith("INF")) state.INF = risk;

  return state;
}

/* =========================
   MACRO OVERLAY
========================= */
function applyMacroOverlay(state) {

  const c = macroState.SYSTEM.contagionIndex;

  if (c > 0.7) {
    state.FIN = escalate(state.FIN, "ORANGE");
    state.CYB = escalate(state.CYB, "ORANGE");
  }

  if (c > 0.9) {
    state.FIN = escalate(state.FIN, "RED");
  }

  return state;
}

function escalate(current, next) {

  const rank = { GREEN: 0, YELLOW: 1, ORANGE: 2, RED: 3 };

  return rank[next] > rank[current] ? next : current;
}

/* =========================
   MACRO SYSTEM UPDATE (STEP 17 dependency)
========================= */
async function updateMacroMarkets() {

  macroState.BONDS.yieldStress = Math.random();
  macroState.LIQUIDITY.stress = Math.random();
  macroState.BANKING.stress = Math.random();

  macroState.SYSTEM.contagionIndex =
    (macroState.BONDS.yieldStress +
     macroState.LIQUIDITY.stress +
     macroState.BANKING.stress +
     marketData.FX.volatility) / 4;
}

/* =========================
   MARKET DATA (FX)
========================= */
async function updateMarketData() {

  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=SGD&symbols=IDR");
    const data = await res.json();

    marketData.FX.SGD_IDR = data.rates.IDR;
    marketData.FX.volatility = Math.random() * 0.5;
    marketData.FX.lastUpdate = Date.now();

  } catch (e) {
    marketData.FX.volatility = 0.3;
  }
}

/* =========================
   RENDER OUTPUT (FINAL SYSTEM)
========================= */
function renderFinal(state) {

  document.getElementById("output").innerHTML = `
    <h2>Sextant Engine v10.0 (Step 18–20)</h2>

    <h3>System State</h3>
    <p>FIN: ${state.FIN}</p>
    <p>DC: ${state.DC}</p>
    <p>CYB: ${state.CYB}</p>
    <p>INF: ${state.INF}</p>

    <hr>

    <h3>Macro System</h3>
    <p>FX Volatility: ${marketData.FX.volatility}</p>
    <p>Contagion Index: ${macroState.SYSTEM.contagionIndex.toFixed(2)}</p>

    <hr>

    <h3>Audit Log</h3>
    <p>Total Events: ${auditLog.length}</p>

    <button onclick="console.log(auditLog)">View Audit Log</button>
  `;
}
