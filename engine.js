
/***********************
 * SPD CORE ENGINE v13
 * STABLE CASCADE CORE
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
   CASCADE ENGINE (IMMUTABLE)
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
   DECAY ENGINE (IMMUTABLE + SAFE)
------------------------*/
function applyDecay(state) {

  const s = { ...state };

  Object.keys(s).forEach(k => {
    s[k] = Math.max(0, s[k] * 0.98);
  });

  return s;
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

  return Math.max(0, Math.min(100, 100 - stress));
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
   MAIN ENGINE
------------------------*/
window.runScenario = function (type) {

  ensure(type);

  let next = { ...window.state };

  next[type] += 2;
  next = applyCascade(type, next, 1);
  next = applyDecay(next);

  window.state = next;

  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  window.updateUI?.();
  window.drawGraph?.(window.state);
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

  let next = { ...window.state };

  const intensity = 1.5;

  next[t] += 3 * intensity;
  next = applyCascade(t, next, intensity);
  next = applyDecay(next);

  window.state = next;

  window.audit("EVENT", {
    event,
    target: t,
    state: { ...window.state }
  });

  window.updateUI?.();
  window.drawGraph?.(window.state);
  window.updateResilienceScore?.(calculateResilience(window.state));
};