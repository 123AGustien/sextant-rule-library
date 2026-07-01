
/**
 * SPD v12 CLOSED LOOP ENGINE
 * Sextant Protocol — Live Digital Twin Core
 * Version: 1.0
 */

window.SEXTANT = window.SEXTANT || {};

/* =========================
   SYSTEM STATE
========================= */

window.SEXTANT.state = window.SEXTANT.state || {
  FX: 10,
  INF: 5,
  DC: 5,
  CYB: 5
};

window.SEXTANT.domains = window.SEXTANT.domains || {
  FIN: { risk: 1 },
  INF: { risk: 1 },
  DC:  { risk: 1 },
  CYB: { risk: 1 },
  ENG: { risk: 1 }
};

/* =========================
   UTILITIES
========================= */

function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function decay(v, rate = 0.98) {
  return v * rate;
}

/* =========================
   CLOSED LOOP ENGINE
========================= */

function SPD_TICK() {

  const s = window.SEXTANT.state;
  const d = window.SEXTANT.domains;

  /* -------- DOMAIN COUPLING -------- */

  d.FIN.risk += s.FX * 0.02 + (d.ENG.risk || 0) * 0.03;
  s.INF += d.ENG.risk * 0.12 + d.FIN.risk * 0.05;

  s.DC  += s.INF * 0.04;
  s.CYB += s.DC * 0.03;

  d.FIN.risk += s.CYB * 0.02;

  /* -------- NORMALISATION -------- */

  for (let k in d) {
    d[k].risk = clamp(decay(d[k].risk));
  }

  for (let k in s) {
    s[k] = clamp(decay(s[k]));
  }

  /* -------- STABILITY CHECK -------- */

  const totalStress =
    s.INF + s.DC + s.CYB +
    d.FIN.risk + d.ENG.risk;

  if (totalStress > 250) {
    emergencyBrake();
  }

}

/* =========================
   EMERGENCY BRAKE
========================= */

function emergencyBrake() {

  const s = window.SEXTANT.state;
  const d = window.SEXTANT.domains;

  for (let k in s) {
    s[k] *= 0.85;
  }

  for (let k in d) {
    d[k].risk *= 0.8;
  }

  if (window.SEXTANT_AUDIT?.log) {
    window.SEXTANT_AUDIT.log("[SPD] EMERGENCY BRAKE ACTIVATED");
  }
}

/* =========================
   PUBLIC LOOP EXPORT
========================= */

window.SPD_TICK = SPD_TICK;

/* =========================
   OPTIONAL AUTO RUN
========================= */

setInterval(() => {
  SPD_TICK();
}, 1000);