/***********************
 * SPD v10 LIVE CASCADE ENGINE
 * Real-Time Propagation Model
 ***********************/

/* =========================
   GLOBAL STATE
========================= */

let systemState = {
  FIN: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

let eventQueue = [];
let auditLog = [];

/* =========================
   CASCADE MATRIX (CORE MODEL)
========================= */

const CASCADE = {
  FIN: { DC: 0.6, CYB: 0.4 },
  DC:  { INF: 0.7, CYB: 0.3 },
  CYB: { FIN: 0.5, DC: 0.5 },
  INF: { DC: 0.6, CYB: 0.4 }
};

/* =========================
   EVENT ENTRY (USER ACTIONS)
========================= */

function runScenario(code) {

  enqueueEvent({
    type: code.split("-")[0],
    strength: getImpact(code),
    source: "SCENARIO"
  });

  startCascade();
}

function injectEvent(type) {

  enqueueEvent({
    type,
    strength: 2,
    source: "INJECTION"
  });

  startCascade();
}

/* =========================
   EVENT QUEUE SYSTEM
========================= */

function enqueueEvent(event) {
  eventQueue.push({
    ...event,
    time: Date.now()
  });

  log("EVENT_ENQUEUE", event);
}

/* =========================
   CASCADE ENGINE (LIVE LOOP)
========================= */

let cascadeRunning = false;

function startCascade() {

  if (cascadeRunning) return;

  cascadeRunning = true;

  const interval = setInterval(() => {

    if (eventQueue.length === 0) {
      cascadeRunning = false;
      clearInterval(interval);
      return;
    }

    const event = eventQueue.shift();

    applyEvent(event);
    propagate(event.type, event.strength);

    render();
    updateCascadeView();

    log("CASCADE_TICK", {
      state: { ...systemState },
      event
    });

  }, 900);
}

/* =========================
   CORE IMPACT APPLICATION
========================= */

function applyEvent(event) {
  systemState[event.type] += event.strength;
}

/* =========================
   PROPAGATION MODEL
========================= */

function propagate(origin, strength) {

  const links = CASCADE[origin] || {};

  for (let target in links) {

    const impact = Math.round(strength * links[target]);

    systemState[target] += impact;

    enqueueEvent({
      type: target,
      strength: impact,
      source: "CASCADE"
    });
  }
}

/* =========================
   SCORING
========================= */

function getImpact(code) {
  const map = {
    "FIN-001": 3,
    "DC-001": 4,
    "CYB-001": 6,
    "INF-001": 5
  };
  return map[code] || 2;
}

/* =========================
   UI RENDER HOOK
========================= */

function render() {
  const el = document.getElementById("output");

  el.innerHTML =
    "FIN: " + systemState.FIN + "<br>" +
    "DC: " + systemState.DC + "<br>" +
    "CYB: " + systemState.CYB + "<br>" +
    "INF: " + systemState.INF + "<br><hr>" +
    "TOTAL STRESS: " + total();
}

function total() {
  return systemState.FIN +
         systemState.DC +
         systemState.CYB +
         systemState.INF;
}

/* =========================
   CASCADE GRAPH HOOK
   (USED BY cascade-graph.js IF PRESENT)
========================= */

function updateCascadeView() {
  const el = document.getElementById("cascade");

  el.innerHTML =
    "ACTIVE CASCADE NODES:<br>" +
    Object.entries(systemState)
      .map(([k,v]) => `${k}: ${v}`)
      .join("<br>");
}

/* =========================
   AUDIT SYSTEM
========================= */

function log(type, data) {
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
  systemState = { FIN:0, DC:0, CYB:0, INF:0 };
  eventQueue = [];

  render();
  updateCascadeView();

  document.getElementById("audit").textContent = "CLEARED";
}
