/***********************
 * SPD CORE ENGINE v13
 * MAX CASCADE UPGRADE
 ***********************/

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

/* -----------------------
   AUDIT SYSTEM
------------------------*/
window.audit = function (type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

/* -----------------------
   SAFE INIT
------------------------*/
function ensure(type) {
  if (window.state[type] === undefined) {
    window.state[type] = 0;
  }
}

/* -----------------------
   CASCADE ENGINE (CORE)
------------------------*/
function applyCascade(eventType, state, intensity = 1) {

  const s = { ...state };

  switch (eventType) {

    case "FX":
      s.CYB += 1.2 * intensity;
      s.DC += 0.8 * intensity;
      break;

    case "CYB":
      s.INF += 1.5 * intensity;
      s.DC += 0.6 * intensity;
      break;

    case "DC":
      s.FX += 0.7 * intensity;
      s.CYB += 0.4 * intensity;
      break;

    case "INF":
      s.CYB += 0.9 * intensity;
      s.FX += 0.3 * intensity;
      break;
  }

  return s;
}

/* -----------------------
   DECAY ENGINE (SYSTEM STABILITY)
------------------------*/
function applyDecay(state) {

  Object.keys(state).forEach(k => {
    state[k] *= 0.98; // slow stabilization
    if (state[k] < 0.01) state[k] = 0;
  });

  return state;
}

/* -----------------------
   RESILIENCE SCORE
------------------------*/
function calculateResilience(state) {

  const stress =
    state.FX * 1.2 +
    state.DC * 1.0 +
    state.CYB * 1.5 +
    state.INF * 1.3;

  const max = 100;

  return Math.max(0, Math.min(max, max - stress));
}

/* -----------------------
   GRAPH FORMATTER
------------------------*/
function buildGraph(state) {
  return [
    { domain: "FX", value: state.FX },
    { domain: "DC", value: state.DC },
    { domain: "CYB", value: state.CYB },
    { domain: "INF", value: state.INF }
  ];
}

/* -----------------------
   MAIN SCENARIO ENGINE
------------------------*/
window.runScenario = function (type) {

  ensure(type);

  window.state[type] += 2;

  // cascade propagation
  window.state = applyCascade(type, window.state, 1);

  // system decay
  window.state = applyDecay(window.state);

  // audit
  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  // UI hooks
  window.updateUI?.();
  window.updateGraph?.(buildGraph(window.state));
  window.updateResilienceScore?.(calculateResilience(window.state));
};

/* -----------------------
   EVENT ENGINE
------------------------*/
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

  const intensity = 1.5;

  window.state[t] += 3 * intensity;

  window.state = applyCascade(t, window.state, intensity);
  window.state = applyDecay(window.state);

  window.audit("EVENT", {
    event,
    target: t,
    state: { ...window.state }
  });

  window.updateUI?.();
  window.updateGraph?.(buildGraph(window.state));
  window.updateResilienceScore?.(calculateResilience(window.state));
};