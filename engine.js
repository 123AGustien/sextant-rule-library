let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

let active = false;
let tick = 0;
let loop = null;

const RULES = {
  "FIN-001": { name: "FX STRESS", impact: 2 },
  "DC-001": { name: "COOLING FAILURE", impact: 3 },
  "CYB-001": { name: "RANSOMWARE", impact: 5 },
  "INF-001": { name: "NETWORK OUTAGE", impact: 4 }
};

function runScenario(id) {

  reset();

  const rule = RULES[id];
  if (!rule) return renderError("RULE NOT FOUND");

  active = true;
  tick = 0;

  applyPrimary(id);
  applyCascade(id);

  renderInitial(id, rule);
  startLoop(id);
}

function startLoop(id) {

  if (loop) clearInterval(loop);

  loop = setInterval(() => {

    if (!active) return clearInterval(loop);

    tick++;

    decay();
    applyCascade(id);

    const metrics = calculate();

    renderLive(id, metrics);

    audit("TICK", { tick, state: { ...systemState } });

    if (metrics.total >= 10) {
      active = false;
      audit("CRITICAL_STOP", systemState);
    }

  }, 1200);
}

function applyPrimary(id) {
  const d = id.split("-")[0];
  systemState[d] = "ORANGE";
}

function applyCascade(id) {

  const map = {
    "FIN-001": { DC: "YELLOW", CYB: "ORANGE" },
    "DC-001": { INF: "ORANGE", CYB: "YELLOW" },
    "CYB-001": { FIN: "ORANGE", DC: "ORANGE" },
    "INF-001": { DC: "RED", CYB: "YELLOW" }
  };

  const effects = map[id] || {};

  for (let k in effects) {
    escalate(k, effects[k]);
  }
}

function decay() {
  const d = { RED:"ORANGE", ORANGE:"YELLOW", YELLOW:"GREEN", GREEN:"GREEN" };
  for (let k in systemState) systemState[k] = d[systemState[k]];
}

function escalate(domain, level) {
  const r = { GREEN:0, YELLOW:1, ORANGE:2, RED:3 };
  if (r[level] > r[systemState[domain]]) systemState[domain] = level;
}

function calculate() {

  const s = r => ({ GREEN:0, YELLOW:1, ORANGE:2, RED:3 }[r]);

  const total =
    s(systemState.FIN) +
    s(systemState.DC) +
    s(systemState.CYB) +
    s(systemState.INF);

  return {
    total,
    resilience: (1 - total / 12).toFixed(2)
  };
}

function injectEvent(type) {

  if (type === "FX") systemState.FIN = "ORANGE";
  if (type === "BOND") systemState.FIN = "YELLOW";
  if (type === "CYBER") systemState.CYB = "RED";
  if (type === "INFRA") systemState.INF = "ORANGE";

  audit("EVENT_INJECT", { type, state: { ...systemState } });
}

function reset() {
  systemState = { FIN:"GREEN", DC:"GREEN", CYB:"GREEN", INF:"GREEN" };
}