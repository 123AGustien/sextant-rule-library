/***********************
 * SEXTANT ENGINE v2.0
 * Temporal Simulation Layer Added
 ***********************/

/* =========================
   GLOBAL STATE
========================= */
let systemState = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

let timeline = [];

/* =========================
   MAIN ENTRY POINT
========================= */
async function runScenario(ruleId) {

  resetSystemState();

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const baseResult = evaluateRule(parsed);

  timeline = runTemporalSimulation(ruleId, baseResult);

  const finalState = timeline[timeline.length - 1].state;
  const metrics = calculateSystemMetrics(finalState);

  renderTimeline(ruleId, timeline, metrics);
}

/* =========================
   RESET
========================= */
function resetSystemState() {
  systemState = {
    FIN: "GREEN",
    DC: "GREEN",
    CYB: "GREEN",
    INF: "GREEN"
  };
}

/* =========================
   RULE LOADER
========================= */
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

/* =========================
   PARSER
========================= */
function parseRule(text) {
  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

/* =========================
   RISK ENGINE
========================= */
function evaluateRule(rule) {

  if (rule.hasRed) {
    return { risk: "RED", cascade: "High impact", action: "Immediate response" };
  }

  if (rule.hasOrange) {
    return { risk: "ORANGE", cascade: "Active stress", action: "Mitigation required" };
  }

  if (rule.hasYellow) {
    return { risk: "YELLOW", cascade: "Early warning", action: "Monitor" };
  }

  return { risk: "GREEN", cascade: "Stable", action: "No action" };
}

/* =========================
   TEMPORAL ENGINE (STEP 10 CORE)
========================= */
function runTemporalSimulation(ruleId, baseResult) {

  const steps = [];
  let state = { ...systemState };

  for (let t = 0; t <= 4; t++) {

    state = applyTimeStep(ruleId, baseResult, state, t);

    const metrics = calculateSystemMetrics(state);

    steps.push({
      time: t,
      state: { ...state },
      metrics
    });
  }

  return steps;
}

/* =========================
   TIME EVOLUTION LOGIC
========================= */
function applyTimeStep(ruleId, result, state, t) {

  // T0: initial shock
  if (t === 0) {
    state = applyCrossDomainEffects(ruleId, result);
  }

  // T1: early propagation
  if (t === 1) {
    amplify(state, 1.1);
  }

  // T2: system stress
  if (t === 2) {
    amplify(state, 1.25);
  }

  // T3: high strain
  if (t === 3) {
    amplify(state, 1.4);
  }

  // T4: stabilization attempt
  if (t === 4) {
    dampen(state);
  }

  return state;
}

/* =========================
   CROSS DOMAIN (same as before)
========================= */
function applyCrossDomainEffects(ruleId, result) {

  if (ruleId.startsWith("FIN")) {
    systemState.FIN = result.risk;

    if (result.risk === "ORANGE") systemState.DC = escalate(systemState.DC, "YELLOW");
    if (result.risk === "RED") {
      systemState.DC = escalate(systemState.DC, "ORANGE");
      systemState.CYB = escalate(systemState.CYB, "ORANGE");
    }
  }

  if (ruleId.startsWith("DC")) {
    systemState.DC = result.risk;

    if (result.risk === "RED") {
      systemState.CYB = escalate(systemState.CYB, "ORANGE");
      systemState.INF = escalate(systemState.INF, "YELLOW");
    }
  }

  if (ruleId.startsWith("CYB")) {
    systemState.CYB = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = escalate(systemState.FIN, "ORANGE");
    }
  }

  if (ruleId.startsWith("INF")) {
    systemState.INF = result.risk;

    if (result.risk === "RED") {
      systemState.FIN = escalate(systemState.FIN, "YELLOW");
      systemState.CYB = escalate(systemState.CYB, "YELLOW");
    }
  }

  return systemState;
}

/* =========================
   ESCALATION
========================= */
function escalate(current, next) {

  const rank = {
    GREEN: 0,
    YELLOW: 1,
    ORANGE: 2,
    RED: 3
  };

  return rank[next] > rank[current] ? next : current;
}

/* =========================
   STRESS FUNCTIONS
========================= */
function amplify(state, factor) {

  Object.keys(state).forEach(k => {
    state[k] = escalate(state[k], scale(state[k], factor));
  });

  return state;
}

function scale(current, factor) {

  const levels = ["GREEN", "YELLOW", "ORANGE", "RED"];
  let i = levels.indexOf(current);

  i = Math.min(3, Math.floor(i * factor));

  return levels[i];
}

function dampen(state) {

  Object.keys(state).forEach(k => {
    if (state[k] === "RED") state[k] = "ORANGE";
    else if (state[k] === "ORANGE") state[k] = "YELLOW";
  });

  return state;
}

/* =========================
   SCORING ENGINE (same as Step 9)
========================= */
function riskToScore(risk) {
  if (risk === "GREEN") return 0;
  if (risk === "YELLOW") return 1;
  if (risk === "ORANGE") return 2;
  if (risk === "RED") return 3;
  return 0;
}

function calculateSystemMetrics(state) {

  const total =
    riskToScore(state.FIN) +
    riskToScore(state.DC) +
    riskToScore(state.CYB) +
    riskToScore(state.INF);

  const max = 12;

  return {
    totalStress: total,
    resilienceIndex: Number((1 - total / max).toFixed(2))
  };
}

/* =========================
   RENDER TIMELINE
========================= */
function renderTimeline(ruleId, timeline, metrics) {

  let html = `<h2>${ruleId} — Temporal Simulation</h2>`;

  timeline.forEach(step => {

    html += `
      <div class="panel">
        <h4>T${step.time}</h4>

        <p>FIN: ${step.state.FIN}</p>
        <p>DC: ${step.state.DC}</p>
        <p>CYB: ${step.state.CYB}</p>
        <p>INF: ${step.state.INF}</p>

        <p><b>Stress:</b> ${step.metrics.totalStress}/12</p>
        <p><b>Resilience:</b> ${step.metrics.resilienceIndex}</p>
      </div>
    `;
  });

  html += `
    <hr>
    <h3>Final Metrics</h3>
    <p><b>Total Stress:</b> ${metrics.totalStress}/12</p>
    <p><b>Resilience Index:</b> ${metrics.resilienceIndex}</p>
  `;

  document.getElementById("output").innerHTML = html;
}
