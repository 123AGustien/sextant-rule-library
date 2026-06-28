/***********************
 * SPD v10 ENGINE CORE
 ***********************/

const systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

let tick = 0;
let active = false;
let auditLog = [];

const rules = {
  "FIN-001": { domain: "FIN", impact: 2 },
  "DC-001":  { domain: "DC", impact: 3 },
  "CYB-001": { domain: "CYB", impact: 5 },
  "INF-001": { domain: "INF", impact: 4 }
};

const rank = { GREEN:0, YELLOW:1, ORANGE:2, RED:3 };
const reverseRank = ["GREEN","YELLOW","ORANGE","RED"];

function runScenario(id) {
  reset();
  active = true;
  tick = 0;

  applyImpact(id);
  propagate(id);

  audit("SCENARIO_START", { id, state: {...systemState} });

  loop();
}

function injectEvent(type) {
  const map = {
    FX: "FIN-001",
    BOND: "DC-001",
    CYBER: "CYB-001",
    INFRA: "INF-001"
  };
  runScenario(map[type]);
}

function applyImpact(id) {
  const r = rules[id];
  escalate(r.domain, 2);
}

function propagate(id) {
  const map = {
    "FIN-001": { DC:1, CYB:2 },
    "DC-001": { INF:2, CYB:1 },
    "CYB-001": { FIN:2, DC:2 },
    "INF-001": { DC:3, CYB:1 }
  };

  const effects = map[id] || {};
  for (let k in effects) {
    escalate(k, effects[k]);
  }
}

function escalate(domain, level) {
  const current = rank[systemState[domain]];
  const next = Math.min(3, current + level);
  systemState[domain] = reverseRank[next];
}

function decay() {
  for (let k in systemState) {
    const r = rank[systemState[k]];
    systemState[k] = reverseRank[Math.max(0, r - 1)];
  }
}

function calculateRisk() {
  return Object.values(systemState)
    .map(v => rank[v])
    .reduce((a,b)=>a+b,0);
}

function loop() {
  if (!active) return;

  tick++;

  decay();
  propagate("FIN-001");

  const risk = calculateRisk();

  updateUI({
    tick,
    state: systemState,
    risk
  });

  updateGraph(systemState);

  audit("TICK", { tick, state:{...systemState}, risk });

  if (risk >= 10) {
    active = false;
    audit("CRITICAL_STOP", systemState);
  }

  setTimeout(loop, 1000);
}

function reset() {
  systemState.FIN = "GREEN";
  systemState.DC = "GREEN";
  systemState.CYB = "GREEN";
  systemState.INF = "GREEN";
}

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
  reset();
  document.getElementById("audit").textContent = "CLEARED";
  updateUI({ tick:0, state:systemState, risk:0 });
}

/***********************
 * UI HOOK
 ***********************/
function updateUI(data) {
  document.getElementById("output").innerHTML = `
    <b>TICK:</b> ${data.tick}<br>
    FIN:${data.state.FIN} |
    DC:${data.state.DC} |
    CYB:${data.state.CYB} |
    INF:${data.state.INF}<br>
    <b>RISK:</b> ${data.risk}
  `;
}
