// =========================
// SPD CORE STATE
// =========================

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

// =========================
// AUDIT SYSTEM
// =========================

window.audit = function(type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

// =========================
// SCENARIO ENGINE
// =========================

window.runScenario = function(type) {
  if (!window.state[type]) window.state[type] = 0;

  window.state[type] += 2;

  window.audit("SCENARIO", {
    type,
    state: { ...window.state }
  });

  window.updateUI();
  window.updateGraph(window.state);
};

// =========================
// EVENT INJECTION ENGINE
// =========================

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

  window.updateUI();
  window.updateGraph(window.state);
};

// =========================
// UI UPDATE
// =========================

window.updateUI = function() {

  const out = document.getElementById("output");
  if (!out) return;

  out.innerHTML =
    "FX: " + window.state.FX + "<br>" +
    "DC: " + window.state.DC + "<br>" +
    "CYB: " + window.state.CYB + "<br>" +
    "INF: " + window.state.INF;
};

// =========================
// AUDIT VIEW FUNCTIONS
// =========================

window.showAudit = function() {
  const el = document.getElementById("audit");
  if (!el) return;

  el.innerText = JSON.stringify(window.auditLog, null, 2);
};

window.clearAudit = function() {
  window.auditLog = [];
  document.getElementById("audit").innerText = "cleared";
};

// =========================
// GRAPH ENGINE (SAFE STUB)
// =========================

window.updateGraph = function(state) {
  const canvas = document.getElementById("graph");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const data = [state.FX, state.DC, state.CYB, state.INF];
  const labels = ["FX", "DC", "CYB", "INF"];

  const barWidth = 40;
  const gap = 20;

  data.forEach((val, i) => {
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(50 + i * (barWidth + gap), 200 - val * 10, barWidth, val * 10);

    ctx.fillStyle = "#e5e7eb";
    ctx.fillText(labels[i], 50 + i * (barWidth + gap), 210);
  });
};

// =========================
// INIT SAFE BOOT
// =========================

document.addEventListener("DOMContentLoaded", function() {
  window.updateUI();
  window.updateGraph(window.state);
});