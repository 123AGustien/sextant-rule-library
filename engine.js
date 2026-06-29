
/***********************
 * SPD CORE STATE (CLASS 1)
 * SIMULATION BRAIN
 ***********************/

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

/***********************
 * AUDIT CORE
 ***********************/

window.audit = function(type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

/***********************
 * SCENARIO ENGINE
 ***********************/

window.runScenario = function(type) {

  if (!window.state[type]) window.state[type] = 0;

  window.state[type] += 2;

  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  window.engineNotify();
};

/***********************
 * EVENT ENGINE
 ***********************/

window.injectEvent = function(event) {

  const map = {
    FX_SPIKE: "FX",
    BOND_STRESS: "DC",
    CYBER_ATTACK: "CYB",
    INFRA_FAILURE: "INF"
  };

  const target = map[event];
  if (!target) return;

  window.state[target] += 3;

  window.audit("EVENT", {
    event,
    target,
    state: { ...window.state }
  });

  window.engineNotify();
};

/***********************
 * NOTIFY LAYER (bridge to UI)
 ***********************/

window.engineNotify = function() {

  if (window.updateUI) window.updateUI();
  if (window.updateGraph) window.updateGraph(window.state);
  if (window.updateResilienceScore) window.updateResilienceScore();

};