let state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

let auditLog = [];

function runScenario(type) {
  state[type] += 2;

  audit("SCENARIO", { type, state });

  updateUI();
  updateGraph(state);
}

function injectEvent(event) {

  const map = {
    FX_SPIKE: "FX",
    BOND_STRESS: "DC",
    CYBER_ATTACK: "CYB",
    INFRA_FAILURE: "INF"
  };

  const target = map[event];
  if (!target) return;

  state[target] += 3;

  audit("EVENT", { event, target });

  updateUI();
  updateGraph(state);
}

function updateUI() {

  const out = document.getElementById("output");

  if (!out) return;

  out.innerHTML =
    "FX: " + state.FX + "<br>" +
    "DC: " + state.DC + "<br>" +
    "CYB: " + state.CYB + "<br>" +
    "INF: " + state.INF;
}