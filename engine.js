/***********************
 * SEXTANT ENGINE v3.1
 * CLEAN SPA WIRED CORE
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

let auditLog = [];
let simulationTick = 0;
let activeSimulation = false;
let loopHandle = null;

/* =========================
   RULE SET (LOCAL — NO GITHUB DEPENDENCY)
========================= */

const RULES = {
  "FIN-001": { name: "POWER SURGE", impact: 2 },
  "DC-001": { name: "COOLING FAILURE", impact: 3 },
  "CYB-001": { name: "RANSOMWARE ATTACK", impact: 5 },
  "INF-001": { name: "NETWORK OUTAGE", impact: 4 }
};

/* =========================
   ENTRY POINT (SINGLE BRAIN)
========================= */

function runScenario(ruleId) {

  resetSystem();

  activeSimulation = true;
  simulationTick = 0;

  const rule = RULES[ruleId];
  if (!rule) return renderOutputError("RULE NOT FOUND: " + ruleId);

  applyPrimaryImpact(ruleId, rule);
  applyPropagation(ruleId);

  render(ruleId, rule);

  startLoop(ruleId);
}

/* =========================
   LOOP ENGINE (SAFE SPA LOOP)
========================= */

function startLoop(ruleId) {

  if (loopHandle) clearInterval(loopHandle);

  loopHandle = setInterval(() => {

    if (!activeSimulation) {
      clearInterval(loopHandle);
      return;
    }

    simulationTick++;

    applyDecay();
    applyPropagation(ruleId);

    const metrics = calculateMetrics();

    renderLive(ruleId, metrics);

    audit("TICK", { tick: simulationTick, state: { ...systemState } });

    if (metrics.total >= 10) {
      activeSimulation = false;
      audit("CRITICAL_STOP", { state: systemState });
    }

  }, 1200);
}

/* =========================
   CORE RULE APPLICATION
========================= */

function applyPrimaryImpact(ruleId, rule) {

  const domain = ruleId.split("-")[0];
  systemState[domain] = "ORANGE";
}

function applyPropagation(ruleId) {

  const map = {
    "FIN-001": { DC: "YELLOW", CYB: "ORANGE" },
    "DC-001": { INF: "ORANGE", CYB: "YELLOW" },
    "CYB-001": { FIN: "ORANGE", DC: "ORANGE" },
    "INF-001": { DC: "RED", CYB: "YELLOW" }
  };

  const effects = map[ruleId] || {};

  for (let k in effects) {
    escalate(k, effects[k]);
  }
}

function applyDecay() {

  const decay = { RED: "ORANGE", ORANGE: "YELLOW", YELLOW: "GREEN", GREEN: "GREEN" };

  for (let k in systemState) {
    systemState[k] = decay[systemState[k]];
  }
}

function escalate(domain, level) {

  const rank = { GREEN: 0, YELLOW: 1, ORANGE: 2, RED: 3 };

  if (rank[level] > rank[systemState[domain]]) {
    systemState[domain] = level;
  }
}

/* =========================
   METRICS ENGINE
========================= */

function calculateMetrics() {

  const score = (r) => ({ GREEN: 0, YELLOW: 1, ORANGE: 2, RED: 3 }[r]);

  const total =
    score(systemState.FIN) +
    score(systemState.DC) +
    score(systemState.CYB) +
    score(systemState.INF);

  return {
    total,
    resilience: (1 - total / 12).toFixed(2)
  };
}

/* =========================
   RENDER LAYER (SPA OUTPUT ONLY)
========================= */

function render(ruleId, rule) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>
    <p>INITIAL EVENT: ${rule.name}</p>
    <p>STATUS: ACTIVE</p>
  `;
}

function renderLive(ruleId, metrics) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId} (LIVE)</h3>

    <p>FIN: ${systemState.FIN}</p>
    <p>DC: ${systemState.DC}</p>
    <p>CYB: ${systemState.CYB}</p>
    <p>INF: ${systemState.INF}</p>

    <hr>

    <p>Total Stress: ${metrics.total}</p>
    <p>Resilience Index: ${metrics.resilience}</p>
  `;
}

function renderOutputError(msg) {
  document.getElementById("output").innerHTML = `<b style="color:red">${msg}</b>`;
}

/* =========================
   AUDIT SYSTEM
========================= */

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