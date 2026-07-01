/**
 * SPD v12 ENERGY DOMAIN ENGINE
 * Sextant Protocol — Governed Simulation Module
 * Version: v3.0
 */

window.SEXTANT = window.SEXTANT || {};

/* =========================
   DOMAIN REGISTRY
========================= */

window.SEXTANT.domains = window.SEXTANT.domains || {
  FIN: { risk: 0, mode: "NORMAL" },
  INF: { risk: 0, mode: "NORMAL" },
  DC:  { risk: 0, mode: "NORMAL" },
  CYB: { risk: 0, mode: "NORMAL" },
  ENG: { risk: 0, mode: "NORMAL" }
};

/* =========================
   ENERGY DOMAIN ENGINE
========================= */

export const EnergyDomainEngine = {

  version: "v3.0",

  evaluate(state) {

    let risk = 0;

    /* -------------------------
       BASE ENERGY SIGNALS
    --------------------------*/
    if (state.oilPrice < 75) risk += 1;
    if (state.cpoPrice > 1100) risk += 1;
    if (state.fiscalPressure > 0.6) risk += 2;
    if (state.reserveLevel < 0.4) risk += 1;

    /* -------------------------
       CROSS DOMAIN COUPLING
    --------------------------*/
    const d = window.SEXTANT.domains;

    risk += (d.FIN?.risk || 0) * 0.4;
    risk += (d.INF?.risk || 0) * 0.3;
    risk += (d.DC?.risk  || 0) * 0.2;
    risk += (d.CYB?.risk || 0) * 0.3;

    /* -------------------------
       MODE SWITCHING ENGINE
    --------------------------*/
    const mode =
      risk < 2 ? "NORMAL" :
      risk < 4 ? "TRANSITION" :
      risk < 6 ? "STRESS" :
      "ENERGY_CRISIS";

    /* -------------------------
       STABILISATION ACTIONS
    --------------------------*/
    const actions = this.getActions(mode);

    /* -------------------------
       WRITE TO SYSTEM STATE
    --------------------------*/
    window.SEXTANT.domains.ENG = {
      risk,
      mode,
      actions,
      version: this.version
    };

    /* -------------------------
       CASCADE IMPACT FEED
    --------------------------*/
    if (window.SEXTANT.state) {
      window.SEXTANT.state.INF += risk * 0.15;
      window.SEXTANT.state.DC  += risk * 0.10;
    }

    /* -------------------------
       AUDIT STREAM
    --------------------------*/
    if (window.SEXTANT_AUDIT?.log) {
      window.SEXTANT_AUDIT.log(
        `[ENG v${this.version}] mode=${mode} risk=${risk.toFixed(2)}`
      );
    }

    return { risk, mode, actions };
  },

  /* =========================
     AUTO STABILISATION ENGINE
  ========================= */

  getActions(mode) {

    if (mode === "ENERGY_CRISIS") {
      return [
        "Activate strategic reserves",
        "Force demand reduction",
        "Emergency fuel reallocation",
        "Isolate non-critical load centers"
      ];
    }

    if (mode === "STRESS") {
      return [
        "Increase biodiesel blend",
        "Reduce industrial load",
        "Stabilise import dependency"
      ];
    }

    if (mode === "TRANSITION") {
      return [
        "Gradual fuel mix adjustment",
        "Monitor subsidy exposure",
        "Balance grid demand"
      ];
    }

    return [
      "Optimize efficiency baseline",
      "Maintain stable energy distribution"
    ];
  }
};

/* =========================
   SCENARIO CONTROLLER
========================= */

window.SEXTANT.setScenario = function(mode) {

  this.scenario = mode;

  if (!this.state) this.state = {};

  if (mode === "ENERGY_CRISIS") {
    this.state.oilPrice = 60;
    this.state.cpoPrice = 1300;
    this.state.fiscalPressure = 0.8;
    this.state.reserveLevel = 0.25;
  }

  if (mode === "STRESS_TEST") {
    this.state.oilPrice = 70;
    this.state.cpoPrice = 1150;
    this.state.fiscalPressure = 0.7;
    this.state.reserveLevel = 0.4;
  }
};

/* =========================
   SYSTEM TICK (OPTIONAL LOOP)
========================= */

window.SEXTANT_TICK = function () {
  // placeholder for integration with runtime engine
};