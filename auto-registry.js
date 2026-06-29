/****************************************
 * SPD v12 AUTO REGISTRY ENGINE
 * Self-healing global wiring system
 ****************************************/

(function () {

  "use strict";

  const REGISTRY = [
    "audit",
    "runScenario",
    "injectEvent",
    "updateUI",
    "updateGraph",
    "updateResilienceScore",
    "showAudit",
    "clearAudit",
    "initGraph"
  ];

  function register(name, fallback) {

    if (typeof window[name] === "function") {
      return;
    }

    // Try to find local function (if accidentally not exported)
    if (typeof globalThis[name] === "function") {
      window[name] = globalThis[name];
      return;
    }

    // Safe fallback stub (prevents boot failure)
    window[name] = fallback;

    console.warn(`SPD AUTO-REGISTRY: fallback created for ${name}`);
  }

  function bootRegistry() {

    // Core safe fallbacks
    register("audit", function () {
      window.auditLog = window.auditLog || [];
      window.auditLog.push({
        time: new Date().toISOString(),
        type: "FALLBACK_AUDIT",
        payload: arguments
      });
    });

    register("runScenario", function () {
      console.warn("runScenario fallback active");
    });

    register("injectEvent", function () {
      console.warn("injectEvent fallback active");
    });

    register("updateUI", function () {});
    register("updateGraph", function () {});
    register("updateResilienceScore", function () {});
    register("showAudit", function () {});
    register("clearAudit", function () {});
    register("initGraph", function () {});

    console.log("SPD v12 AUTO-REGISTRY ACTIVE");
  }

  window.addEventListener("DOMContentLoaded", bootRegistry);

})();