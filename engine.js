/***********************
 * SEXTANT ENGINE v3.0
 * Dynamic Simulation + Time Propagation + Scenario Map Engine
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

let activeSimulation = false;
let simulationTick = 0;

/* =========================
   MAIN ENTRY POINT
========================= */

async function runScenario(ruleId) {

  resetSystem();

  activeSimulation = true;
  simulationTick = 0;

  const initialResult = await executeRule(ruleId);

  systemState = applyPrimaryImpact(ruleId, initialResult);
  systemState = applyScenarioPropagation(ruleId, systemState);

  renderOutput(ruleId, initialResult, systemState);

  startSimulationLoop(ruleId);
}

/* =========================
   SIMULATION LOOP (NEW CORE)
========================= */

function startSimulationLoop(ruleId) {

  const interval = setInterval(() => {

    if (!activeSimulation) {
      clearInterval(interval);
      return;
    }

    simulationTick++;

    // decay + propagation reinforcement
    systemState = applyDecay(systemState);
    systemState = applyScenarioPropagation(ruleId, systemState);

    const metrics = calculateSystemMetrics(systemState);

    renderOutput(ruleId, { risk: "LIVE", cascade: "Evolving", action: "Monitoring" }, systemState, metrics);

    audit("TICK", { simulationTick, systemState });

    // auto-stop condition
    if (metrics.totalStress >= 10) {
      activeSimulation = false;
      audit("SYSTEM_CRITICAL_STOP", { systemState });
    }

  }, 1500);
}

/* =========================
   RULE EXECUTION
========================= */

async function executeRule(ruleId) {

  const filePath = getRulePath(ruleId);
  const text = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(text);

  return evaluateRule(parsed);
}

/* =========================
   ROUTER
========================= */

function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

/* =========================
   PARSER + RISK ENGINE
========================= */

function parseRule(text) {
  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

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
   PROPAGATION MAP
========================= */

function getPropagationMap() {

  return {

    "FIN-001": [
      { target: "DC", level: "YELLOW" },
      { target: "CYB", level: "ORANGE" }
    ],

    "DC-001": [
      { target: "INF", level: "ORANGE" },
      { target: "CYB", level: "YELLOW" }
    ],

    "CYB-001": [
      { target: "FIN", level: "ORANGE" },
      { target: "DC", level: "ORANGE" }
    ],

    "INF-001": [
      { target: "DC", level: "RED" },
      { target: "CYB", level: "YELLOW" }
    ]
  };
}

/* =========================
   PROPAGATION ENGINE
========================= */

function applyScenarioPropagation(ruleId, state) {

  const map = getPropagationMap();
  const triggers = map[ruleId] || [];

  for (const t of triggers) {
    state[t.target] = escalate(state[t.target], t.level);
  }

  return state;
}

/* =========================
   DECAY SYSTEM (NEW)
========================= */

function applyDecay(state) {

  const decay = {
    RED: "ORANGE",
    ORANGE: "YELLOW",
    YELLOW: "GREEN",
    GREEN: "GREEN"
  };

  for (const key in state) {
    state[key] = decay[state[key]];
  }

  return state;
}

/* =========================
   ESCALATION LOGIC
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
   METRICS ENGINE
========================= */

function riskToScore(r) {
  return { GREEN: 0, YELLOW: 1, ORANGE: 2, RED: 3 }[r] || 0;
}

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

/* =========================
   AUDIT
========================= */

let auditLog = [];

function audit(type, data) {
  auditLog.push({
    time: new Date().toISOString(),
    type,
    data
  });
}

/* =========================
   RESET
========================= */

function resetSystem() {
  systemState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };
}

/* =========================
   RENDER
========================= */

function renderOutput(ruleId, result, state, metrics) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>

    <p><b>Status:</b> ${result.risk}</p>
    <p><b>Cascade:</b> ${result.cascade}</p>
    <p><b>Action:</b> ${result.action}</p>

    <hr>

    <h4>System State (Live)</h4>
    <p>FIN: ${state.FIN}</p>
    <p>DC: ${state.DC}</p>
    <p>CYB: ${state.CYB}</p>
    <p>INF: ${state.INF}</p>

    <hr>

    <h4>Metrics</h4>
    <p>Total Stress: ${metrics.totalStress}</p>
    <p>Resilience Index: ${metrics.resilienceIndex}</p>
  `;
}
/* =========================
   AUTONOMOUS MODE v1.0
========================= */

let autonomousRunning = false;
let autonomousTimer;

/* START AUTONOMOUS SIM */
function startAutonomousMode() {

  if (autonomousRunning) return;

  autonomousRunning = true;

  autonomousLoop();
}

/* STOP AUTONOMOUS SIM */
function stopAutonomousMode() {
  autonomousRunning = false;
  clearTimeout(autonomousTimer);
}

/* MAIN LOOP */
function autonomousLoop() {

  if (!autonomousRunning) return;

  // 1. generate random system event
  const event = generateRandomEvent();

  // 2. apply to system
  applyEvent(event);

  // 3. re-evaluate system
  runScenario(event.id);

  // 4. repeat with variable timing
  const delay = 1200 + Math.random() * 2000;

  autonomousTimer = setTimeout(autonomousLoop, delay);
}

/* =========================
   RANDOM EVENT ENGINE
========================= */

function generateRandomEvent() {

  const events = [
    { id: "FIN-001", type: "FIN_STRESS" },
    { id: "DC-001", type: "COOLING_DRIFT" },
    { id: "CYB-001", type: "THREAT_SPIKE" },
    { id: "INF-001", type: "NETWORK_FLUCT" }
  ];

  return events[Math.floor(Math.random() * events.length)];
}

/* =========================
   EVENT APPLICATION HOOK
========================= */

function applyEvent(event) {

  if (!systemState) return;

  if (event.id.startsWith("FIN")) systemState.FIN = "ORANGE";
  if (event.id.startsWith("DC")) systemState.DC = "YELLOW";
  if (event.id.startsWith("CYB")) systemState.CYB = "RED";
  if (event.id.startsWith("INF")) systemState.INF = "ORANGE";
}
