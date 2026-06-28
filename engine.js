<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sextant Engine v3.1 - Fully Wired SPA</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b0f14;
  color: #e5f3ff;
}

.header {
  background:#0f172a;
  padding:12px;
  border-bottom:1px solid #1f2a44;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:12px;
  color:#9fb0c3;
}

h1 {
  margin: 15px;
  font-size: 20px;
}

.panel {
  margin: 15px;
  padding: 15px;
  background: #111827;
  border: 1px solid #2a2f3a;
  border-radius: 8px;
}

button {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  background: #1f2937;
  color: white;
  border: 1px solid #374151;
  border-radius: 6px;
}

button:hover {
  background:#374151;
}

#output {
  min-height: 80px;
  padding: 10px;
  background:#0a0f1f;
  border:1px solid #2a2f3a;
  border-radius:6px;
}

pre {
  background:#0a0f1f;
  padding:10px;
  overflow:auto;
}
</style>
</head>

<body>

<div class="header">
  <div>🛰 SEXTANT ENGINE v3.1 · FULLY WIRED SIMULATION CORE</div>
  <button onclick="showAudit()">AUDIT</button>
</div>

<h1>🧠 Resilience Simulation Console</h1>

<!-- CONTROL PANEL -->
<div class="panel">
  <h2>Scenario Engine</h2>

  <button onclick="runScenario('FIN-001')">Power Surge</button>
  <button onclick="runScenario('DC-001')">Cooling Failure</button>
  <button onclick="runScenario('CYB-001')">Ransomware</button>
  <button onclick="runScenario('INF-001')">Network Outage</button>

  <p style="color:#7aa2b7;font-size:12px;">
    Engine-first simulation model active
  </p>
</div>

<!-- OUTPUT -->
<div class="panel">
  <h2>System Output</h2>
  <div id="output">SYSTEM BOOTING...</div>
</div>

<!-- AUDIT -->
<div class="panel">
  <h2>Audit Log</h2>
  <button onclick="clearAudit()">Clear</button>
  <pre id="audit"></pre>
</div>

<script>

/* =========================
   SINGLE SOURCE STATE
========================= */

let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

let auditLog = [];
let simulationTick = 0;
let loopHandle = null;
let active = false;

/* =========================
   RULE ENGINE (LOCAL ONLY)
========================= */

const RULES = {
  "FIN-001": { name: "POWER SURGE", impact: 2 },
  "DC-001": { name: "COOLING FAILURE", impact: 3 },
  "CYB-001": { name: "RANSOMWARE ATTACK", impact: 5 },
  "INF-001": { name: "NETWORK OUTAGE", impact: 4 }
};

/* =========================
   ENTRY POINT
========================= */

function runScenario(ruleId) {

  resetSystem();

  const rule = RULES[ruleId];
  if (!rule) return renderError("RULE NOT FOUND");

  active = true;
  simulationTick = 0;

  applyPrimaryImpact(ruleId);
  applyPropagation(ruleId);

  renderInitial(ruleId, rule);

  startLoop(ruleId);
}

/* =========================
   LOOP ENGINE
========================= */

function startLoop(ruleId) {

  if (loopHandle) clearInterval(loopHandle);

  loopHandle = setInterval(() => {

    if (!active) return clearInterval(loopHandle);

    simulationTick++;

    applyDecay();
    applyPropagation(ruleId);

    const metrics = calculateMetrics();

    renderLive(ruleId, metrics);

    audit("TICK", { tick: simulationTick, state: {...systemState} });

    if (metrics.total >= 10) {
      active = false;
      audit("CRITICAL_STOP", systemState);
    }

  }, 1200);
}

/* =========================
   CORE ENGINE LOGIC
========================= */

function applyPrimaryImpact(ruleId) {
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
  const decay = {
    RED: "ORANGE",
    ORANGE: "YELLOW",
    YELLOW: "GREEN",
    GREEN: "GREEN"
  };

  for (let k in systemState) {
    systemState[k] = decay[systemState[k]];
  }
}

function escalate(domain, level) {
  const rank = { GREEN:0, YELLOW:1, ORANGE:2, RED:3 };
  if (rank[level] > rank[systemState[domain]]) {
    systemState[domain] = level;
  }
}

/* =========================
   METRICS
========================= */

function score(r) {
  return { GREEN:0, YELLOW:1, ORANGE:2, RED:3 }[r];
}

function calculateMetrics() {
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
   RENDER ENGINE
========================= */

function renderInitial(ruleId, rule) {
  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>
    <p>EVENT: ${rule.name}</p>
    <p>STATUS: INITIALIZED</p>
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

function renderError(msg) {
  document.getElementById("output").innerHTML =
    `<span style="color:red">${msg}</span>`;
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

function showAudit() {
  document.getElementById("audit").textContent =
    JSON.stringify(auditLog, null, 2);
}

function clearAudit() {
  auditLog = [];
  resetSystem();
  document.getElementById("audit").textContent = "CLEARED";
  document.getElementById("output").innerHTML = "RESET COMPLETE";
}

/* =========================
   RESET
========================= */

function resetSystem() {
  systemState = {
    FIN:"GREEN",
    DC:"GREEN",
    CYB:"GREEN",
    INF:"GREEN"
  };
}

window.onload = function () {
  document.getElementById("output").innerHTML =
    "🛰 ENGINE READY — SELECT SCENARIO";
};

</script>

</body>
</html>