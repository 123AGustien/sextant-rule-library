let state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

let auditLog = [];

function runScenario(type) {

  const impactMap = {
    FX: 2,
    DC: 3,
    CYB: 5,
    INF: 4
  };

  state[type] += impactMap[type] || 1;

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

  const total =
    state.FX + state.DC + state.CYB + state.INF;

  out.innerHTML =
    "FX: " + state.FX + "<br>" +
    "DC: " + state.DC + "<br>" +
    "CYB: " + state.CYB + "<br>" +
    "INF: " + state.INF + "<br><hr>" +
    "TOTAL STRESS: " + total;
}
