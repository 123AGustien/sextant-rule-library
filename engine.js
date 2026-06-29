
/***********************
 * SPD CORE ENGINE v11
 ***********************/

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

/***********************
 * AUDIT SYSTEM
 ***********************/

window.audit = function(type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

/***********************
 * SAFE STATE GUARD
 ***********************/

function ensureState(type) {
  if (!window.state[type]) {
    window.state[type] = 0;
  }
}

/***********************
 * SCENARIO ENGINE
 ***********************/

window.runScenario = function(type) {

  ensureState(type);

  window.state[type] += 2;

  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  if (typeof window.updateUI === "function") {
    window.updateUI();
  }

  if (typeof window.updateGraph === "function") {
    window.updateGraph(window.state);
  }

  if (typeof window.updateResilienceScore === "function") {
    window.updateResilienceScore();
  }
};

/***********************
 * EVENT INJECTION ENGINE
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

  ensureState(target);

  window.state[target] += 3;

  window.audit("EVENT", {
    event,
    target,
    state: { ...window.state }
  });

  if (typeof window.updateUI === "function") {
    window.updateUI();
  }

  if (typeof window.updateGraph === "function") {
    window.updateGraph(window.state);
  }

  if (typeof window.updateResilienceScore === "function") {
    window.updateResilienceScore();
  }
};