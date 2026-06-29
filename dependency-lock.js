/**************************************
 * SPD v11 DEPENDENCY LOCK
 * Safe Boot & System Validation
 **************************************/

(function () {

  "use strict";

  const REQUIRED = [
    "audit",
    "runScenario",
    "injectEvent",
    "updateGraph",
    "updateUI",
    "updateResilienceScore",
    "showAudit",
    "clearAudit"
  ];

  function checkDependencies() {

    const missing = [];

    REQUIRED.forEach(fn => {
      if (typeof window[fn] !== "function") {
        missing.push(fn);
      }
    });

    return {
      ok: missing.length === 0,
      missing: missing
    };
  }

  function renderOutput(status) {

    const output = document.getElementById("output");

    if (!output) return;

    if (status.ok) {

      output.innerHTML =
        "🟢 SPD DEPENDENCY OK — SYSTEM READY";

    } else {

      output.innerHTML =
        "🔴 SPD DEPENDENCY ERROR<br><br>" +
        "<strong>Missing Functions</strong><br>" +
        status.missing.join("<br>") +
        "<br><br>System boot blocked.";

    }

  }

  function renderDiagnostics(status) {

    const diag = document.getElementById("diag");

    if (!diag) return;

    if (status.ok) {

      diag.innerHTML =
`System Diagnostics

Dependency Check : PASS
Simulation Engine : READY
Audit Engine      : READY
Graph Engine      : READY
UI Engine         : READY
Resilience Engine : READY

System Integrity : 100%
Boot Status      : SUCCESS`;

    } else {

      diag.innerHTML =
`System Diagnostics

Dependency Check : FAILED

Missing:

${status.missing.join("\n")}

Boot Status : BLOCKED`;

    }

  }

  function boot() {

    const status = checkDependencies();

    renderOutput(status);
    renderDiagnostics(status);

    if (!status.ok) {
      console.error("SPD Dependency Check Failed");
      return;
    }

    if (typeof window.audit === "function") {

      window.audit("SYSTEM_BOOT", {
        version: "SPD v11",
        status: "READY",
        timestamp: new Date().toISOString()
      });

    }

    if (typeof window.updateUI === "function")
      window.updateUI();

    if (typeof window.updateGraph === "function")
      window.updateGraph(window.state);

    if (typeof window.updateResilienceScore === "function")
      window.updateResilienceScore();

    console.log("SPD v11 Dependency Lock Active");

  }

  window.addEventListener("load", boot);

})();