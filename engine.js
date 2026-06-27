/***********************
 * SEXTANT ENGINE v5.0
 * FULL SYSTEM: Cross-Domain + Time + World + Monte Carlo + Data Calibration
 ***********************/

/* =========================
   WORLD STATE
========================= */
let worldState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN",
  memory: []
};

/* =========================
   ENTRY POINT (MASTER RUN)
========================= */
async function runSimulation(ruleIds, mode = "MONTE_CARLO", iterations = 100) {

  if (mode === "MONTE_CARLO") {
    return runMonteCarlo(ruleIds, iterations);
  }

  if (mode === "SINGLE") {
    return runSingleScenario(ruleIds[0]);
  }
}

/* =========================
   SINGLE SCENARIO MODE
========================= */
async function runSingleScenario(ruleId) {

  resetWorld();

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const result = evaluateDataCalibratedRule(ruleId, parsed);

  worldState = applyScenarioToWorld(ruleId, result, worldState);
  worldState = propagateInterScenarioEffects(worldState);

  const metrics = calculateSystemMetrics(worldState);

  renderFinal(worldState, metrics);
}

/* =========================
   MONTE CARLO MODE
========================= */
async function runMonteCarlo(ruleIds, iterations) {

  let results = [];

  for (let i = 0; i < iterations; i++) {

    resetWorld();

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

      const result = evaluateDataCalibratedRule(ruleId, parsed);

      state = applyScenarioToWorld(ruleId, result, state);
      state = propagateInterScenarioEffects(state);
    }

    results.push({ ...state });
  }

  const analysis = analyzeMonteCarlo(results);
  renderMonteCarlo(analysis);
}

/* =========================
   RESET SYSTEM
========================= */
function resetWorld() {
  worldState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN",
    memory: []
  };
}

/* =========================
   RULE PATH MAPPING
========================= */
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

/* =========================
   PARSER
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
   STEP 13: DATA-CALIBRATED RISK MODEL
========================= */
function evaluateDataCalibratedRule(ruleId, rule) {

  const base = getBaseRiskFromDomain(ruleId);
  const shock = generateMarketShock(ruleId);

  const score = base + shock;

  return {
    risk: mapRiskLevel(score),
    cascade: "data-calibrated cascade",
    action: "model-driven response"
  };
}

/* =========================
   DOMAIN BASELINES
========================= */
function getBaseRiskFromDomain(ruleId) {

  if (ruleId.startsWith("FIN")) return 0.50; // FX volatility
  if (ruleId.startsWith("DC")) return 0.40;  // infra risk
  if (ruleId.startsWith("CYB")) return 0.60; // cyber risk
  if (ruleId.startsWith("INF")) return 0.45; // network risk

  return 0.30;
}

/* =========================
   MARKET SHOCK (VOLATILITY MODEL)
========================= */
function generateMarketShock(ruleId) {

  let volatility = 0.25;

  if (ruleId.startsWith("FIN")) volatility = 0.35;

  const u = Math.random();
  const v = Math.random();

  const gaussian =
    Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

  return gaussian * volatility;
}

/* =========================
   RISK MAPPING
========================= */
function mapRiskLevel(score) {

  if (score < 0.30) return "GREEN";
  if (score < 0.60) return "YELLOW";
  if (score < 0.80) return "ORANGE";
  return "RED";
}

/* =========================
   WORLD INJECTION
========================= */
function applyScenarioToWorld(ruleId, result, state) {

  worldState.memory.push({
    ruleId,
    risk: result.risk
  });

  if (ruleId.startsWith("FIN")) state.FIN = result.risk;
  if (ruleId.startsWith("DC")) state.DC = result.risk;
  if (ruleId.startsWith("CYB")) state.CYB = result.risk;
  if (ruleId.startsWith("INF")) state.INF = result.risk;

  return state;
}

/* =========================
   CROSS-DOMAIN PROPAGATION
========================= */
function propagateInterScenarioEffects(state) {

  const history = worldState.memory;
  const last = history[history.length - 1];

  if (!last) return state;

  if (last.ruleId.startsWith("FIN") && last.risk === "RED") {
    state.CYB = escalate(state.CYB, "ORANGE");
  }

  const dcCount = history.filter(h => h.ruleId.startsWith("DC")).length;

  if (dcCount >= 2) {
    state.INF = escalate(state.INF, "YELLOW");
  }

  if (state.CYB === "RED") {
    state.FIN = escalate(state.FIN, "ORANGE");
  }

  return state;
}

/* =========================
   ESCALATION ENGINE
========================= */
function escalate(current, next) {

  const rank = {
    GREEN: 0,
    YELLOW: 1,
    ORANGE: 2,
    RED: 3
  };

  return rank[next] > rank[current] ? next : current;
}

/* =========================
   MONTE CARLO ANALYSIS
========================= */
function analyzeMonteCarlo(results) {

  let collapse = 0;
  let stress = 0;
  let stable = 0;

  for (let r of results) {

    const score =
      riskToScore(r.FIN) +
      riskToScore(r.DC) +
      riskToScore(r.CYB) +
      riskToScore(r.INF);

    if (score >= 9) collapse++;
    else if (score >= 5) stress++;
    else stable++;
  }

  return {
    collapseProbability: (collapse / results.length).toFixed(2),
    highStressProbability: (stress / results.length).toFixed(2),
    stableProbability: (stable / results.length).toFixed(2)
  };
}

/* =========================
   SCORING
========================= */
function riskToScore(risk) {
  if (risk === "GREEN") return 0;
  if (risk === "YELLOW") return 1;
  if (risk === "ORANGE") return 2;
  if (risk === "RED") return 3;
  return 0;
}

/* =========================
   OUTPUT RENDERERS
========================= */
function renderMonteCarlo(result) {
  document.getElementById("output").innerHTML = `
    <h2>Monte Carlo Results</h2>
    <p>Collapse: ${result.collapseProbability}</p>
    <p>Stress: ${result.highStressProbability}</p>
    <p>Stable: ${result.stableProbability}</p>
  `;
}

function renderFinal(state, metrics) {
  document.getElementById("output").innerHTML = `
    <h2>Single Scenario Result</h2>
    <p>FIN: ${state.FIN}</p>
    <p>DC: ${state.DC}</p>
    <p>CYB: ${state.CYB}</p>
    <p>INF: ${state.INF}</p>
    <hr>
    <p>Total Stress: ${metrics.totalStress}</p>
    <p>Resilience Index: ${metrics.resilienceIndex}</p>
  `;
}

/* =========================
   SYSTEM METRICS (FINAL)
========================= */
function calculateSystemMetrics(state) {

  const total =
    riskToScore(state.FIN) +
    riskToScore(state.DC) +
    riskToScore(state.CYB) +
    riskToScore(state.INF);

  return {
    totalStress: total,
    resilienceIndex: (1 - total / 12).toFixed(2)
  };
}
