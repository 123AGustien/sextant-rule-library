/***********************
 * SEXTANT ENGINE v8.0
 * STEP 18: Explainability + Audit Trail Layer
 ***********************/

/* =========================
   GLOBAL AUDIT LOG
========================= */
let auditLog = [];

/* =========================
   STEP 18: WRAPPER FOR ALL RISK EVENTS
========================= */
function logEvent(event) {

  auditLog.push({
    timestamp: Date.now(),
    ...event
  });
}

/* =========================
   ENHANCED RISK EVALUATION (WITH EXPLANATION)
========================= */
function evaluateExplainableRisk(ruleId, rule, scoreComponents) {

  const base = scoreComponents.base;
  const shock = scoreComponents.shock;
  const fx = scoreComponents.fx || 0;
  const macro = scoreComponents.macro || 0;

  const finalScore = base + shock + fx + macro;

  const risk = mapRiskLevel(finalScore);

  // 🔥 STEP 18: AUDIT TRACE ENTRY
  logEvent({
    type: "RISK_EVALUATION",
    ruleId,
    inputs: {
      base,
      shock,
      fx,
      macro
    },
    finalScore,
    risk,
    explanation: generateExplanation(ruleId, { base, shock, fx, macro }, risk)
  });

  return {
    risk,
    score: finalScore
  };
}

/* =========================
   EXPLANATION ENGINE (WHY LOGIC)
========================= */
function generateExplanation(ruleId, components, risk) {

  let reasons = [];

  if (components.fx > 0.1) {
    reasons.push("FX volatility contributed to upward risk pressure");
  }

  if (components.macro > 0.2) {
    reasons.push("Macro-system contagion increased systemic stress");
  }

  if (components.shock > 0.3) {
    reasons.push("Random market shock amplified instability");
  }

  if (components.base > 0.5) {
    reasons.push("High baseline risk inherent to domain " + ruleId.substring(0,3));
  }

  if (reasons.length === 0) {
    reasons.push("System remains within stable baseline conditions");
  }

  return {
    summary: `Risk classified as ${risk} due to multi-factor interaction.`,
    factors: reasons
  };
}

/* =========================
   STEP 18: TRACE REPLAY ENGINE
========================= */
function replayAuditTrail() {

  console.log("=== SEXTANT AUDIT TRAIL REPLAY ===");

  auditLog.forEach((entry, index) => {

    console.log(`\nEVENT ${index + 1}`);
    console.log("Type:", entry.type);
    console.log("Rule:", entry.ruleId);
    console.log("Risk:", entry.risk);
    console.log("Score:", entry.finalScore);

    if (entry.explanation) {
      console.log("Explanation:", entry.explanation.summary);
      console.log("Factors:", entry.explanation.factors);
    }
  });

  return auditLog;
}

/* =========================
   STEP 18: EXPLAINABLE WRAPPER FOR ENGINE
========================= */
function evaluateDataCalibratedRuleExplainable(ruleId, rule, inputs) {

  const result = evaluateDataCalibratedRule(ruleId, rule);

  const explained = evaluateExplainableRisk(ruleId, rule, {
    base: getBaseRiskFromDomain(ruleId),
    shock: inputs.shock || 0,
    fx: inputs.fxStress || 0,
    macro: inputs.macroStress || 0
  });

  return {
    ...result,
    explanation: explained
  };
}

/* =========================
   STEP 18: DASHBOARD OUTPUT
========================= */
function renderExplainableOutput(state, metrics) {

  document.getElementById("output").innerHTML = `
    <h2>Step 18 — Explainability Layer</h2>

    <h3>System State</h3>
    <pre>${JSON.stringify(state, null, 2)}</pre>

    <hr>

    <h3>Audit Summary</h3>
    <p>Total Events Logged: ${auditLog.length}</p>

    <button onclick="replayAuditTrail()">Replay Audit Trail</button>

    <hr>

    <h3>System Metrics</h3>
    <p>Total Stress: ${metrics.totalStress}</p>
    <p>Resilience Index: ${metrics.resilienceIndex}</p>
  `;
}

/***********************
 * SEXTANT ENGINE v7.0
 * STEP 17: Multi-Market Systemic Risk Layer
 * FULL COMPLETE ENGINE FILE
 ***********************/

/* =========================
   GLOBAL STATE
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
   WORLD STATE (DOMAINS)
========================= */
let worldState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN",
  memory: []
};

/* =========================
   MAIN ENTRY (STEP 17)
========================= */
async function runSystemicSimulation(ruleIds, iterations = 50) {

  await updateMarketData();
  await updateMacroMarkets();

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

    state = applyMacroSystemOverlay(state);

    results.push({ ...state });
  }

  const analysis = analyzeMonteCarlo(results);

  renderFinalSystemOutput(results, analysis);
}

/* =========================
   RESET WORLD
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
   RULE LOADER
========================= */
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

/* =========================
   MARKET DATA (FX LAYER)
========================= */
async function updateMarketData() {

  const fxResponse = await fetch("https://api.exchangerate.host/latest?base=SGD&symbols=IDR");
  const fxData = await fxResponse.json();

  const rate = fxData.rates.IDR;

  marketData.FX.SGD_IDR = rate;
  marketData.FX.lastUpdate = Date.now();
  marketData.FX.volatility = estimateVolatility(rate);

  return marketData;
}

function estimateVolatility(rate) {

  const baseline = 13500;
  const deviation = Math.abs(rate - baseline) / baseline;

  return Math.min(1, deviation * 5);
}

/* =========================
   MACRO MARKETS (STEP 17 CORE)
========================= */
async function updateMacroMarkets() {

  macroState.BONDS.yieldStress = simulateBondStress();
  macroState.LIQUIDITY.stress = computeLiquidityStress();
  macroState.BANKING.stress = computeBankingStress();
  macroState.SYSTEM.contagionIndex = computeContagionIndex();

  return macroState;
}

function simulateBondStress() {
  return 0.3 + Math.random() * 0.7;
}

function computeLiquidityStress() {
  return (marketData.FX.volatility + macroState.BONDS.yieldStress) / 2;
}

function computeBankingStress() {
  return (computeLiquidityStress() * 0.6) + (marketData.FX.volatility * 0.4);
}

function computeContagionIndex() {

  const fx = marketData.FX.volatility;
  const bonds = macroState.BONDS.yieldStress;
  const liquidity = macroState.LIQUIDITY.stress;
  const banking = macroState.BANKING.stress;

  return Math.min(1, (fx + bonds + liquidity + banking) / 4);
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
   DATA CALIBRATED ENGINE
========================= */
function evaluateDataCalibratedRule(ruleId, rule) {

  let base = getBaseRiskFromDomain(ruleId);
  let shock = generateMarketShock(ruleId);

  if (ruleId.startsWith("FIN") && marketData.FX.SGD_IDR) {
    base += computeFXStress(marketData.FX.SGD_IDR);
  }

  const score = base + shock;

  return {
    risk: mapRiskLevel(score),
    cascade: "multi-market calibrated cascade",
    action: "systemic response model"
  };
}

/* =========================
   DOMAIN BASELINES
========================= */
function getBaseRiskFromDomain(ruleId) {

  if (ruleId.startsWith("FIN")) return 0.50;
  if (ruleId.startsWith("DC")) return 0.40;
  if (ruleId.startsWith("CYB")) return 0.60;
  if (ruleId.startsWith("INF")) return 0.45;

  return 0.30;
}

/* =========================
   FX STRESS MODEL
========================= */
function computeFXStress(rate) {

  const lower = 13500;
  const upper = 15000;

  if (rate < lower) return 0.05;
  if (rate > upper) return 0.25;

  return 0.10;
}

/* =========================
   MARKET SHOCK MODEL
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
   WORLD ENGINE
========================= */
function applyScenarioToWorld(ruleId, result, state) {

  worldState.memory.push({ ruleId, risk: result.risk });

  if (ruleId.startsWith("FIN")) state.FIN = result.risk;
  if (ruleId.startsWith("DC")) state.DC = result.risk;
  if (ruleId.startsWith("CYB")) state.CYB = result.risk;
  if (ruleId.startsWith("INF")) state.INF = result.risk;

  return state;
}

/* =========================
   CROSS DOMAIN PROPAGATION
========================= */
function propagateInterScenarioEffects(state) {

  const last = worldState.memory[worldState.memory.length - 1];
  if (!last) return state;

  if (last.ruleId.startsWith("FIN") && last.risk === "RED") {
    state.CYB = escalate(state.CYB, "ORANGE");
  }

  const dcCount = worldState.memory.filter(x => x.ruleId.startsWith("DC")).length;

  if (dcCount >= 2) {
    state.INF = escalate(state.INF, "YELLOW");
  }

  if (state.CYB === "RED") {
    state.FIN = escalate(state.FIN, "ORANGE");
  }

  return state;
}

/* =========================
   MACRO SYSTEM OVERLAY
========================= */
function applyMacroSystemOverlay(state) {

  const c = macroState.SYSTEM.contagionIndex;

  if (c > 0.7) {
    state.FIN = escalate(state.FIN, "ORANGE");
    state.DC = escalate(state.DC, "YELLOW");
    state.CYB = escalate(state.CYB, "ORANGE");
    state.INF = escalate(state.INF, "YELLOW");
  }

  if (c > 0.9) {
    state.FIN = escalate(state.FIN, "RED");
  }

  return state;
}

/* =========================
   ESCALATION
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
   OUTPUT
========================= */
function renderFinalSystemOutput(results, analysis) {

  document.getElementById("output").innerHTML = `
    <h2>Step 17 — Multi-Market Systemic Engine</h2>

    <p><b>Collapse Probability:</b> ${analysis.collapseProbability}</p>
    <p><b>Stress Probability:</b> ${analysis.highStressProbability}</p>
    <p><b>Stable Probability:</b> ${analysis.stableProbability}</p>

    <hr>

    <h3>Latest System State</h3>
    <pre>${JSON.stringify(results[results.length - 1], null, 2)}</pre>

    <hr>

    <h3>Macro System</h3>
    <p>FX: ${marketData.FX.SGD_IDR}</p>
    <p>Contagion: ${macroState.SYSTEM.contagionIndex.toFixed(2)}</p>
  `;
}
