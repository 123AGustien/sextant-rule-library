/***********************
 * SPD CORE ENGINE v12
 ***********************/

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

window.audit = function (type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

function ensure(type) {
  if (!window.state[type]) window.state[type] = 0;
}

window.runScenario = function (type) {

  ensure(type);
  window.state[type] += 2;

  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  window.updateUI?.();
  window.updateGraph?.(window.state);
  window.updateResilienceScore?.();
};

window.injectEvent = function (event) {

  const map = {
    FX_SPIKE: "FX",
    BOND_STRESS: "DC",
    CYBER_ATTACK: "CYB",
    INFRA_FAILURE: "INF"
  };

  const t = map[event];
  if (!t) return;

  ensure(t);
  window.state[t] += 3;

  window.audit("EVENT", {
    event,
    target: t,
    state: { ...window.state }
  });

  window.updateUI?.();
  window.updateGraph?.(window.state);
  window.updateResilienceScore?.();
};