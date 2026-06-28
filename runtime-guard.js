/***********************
 * SPD v10 RUNTIME GUARD
 ***********************/

(function () {

  const REQUIRED = [
    "runScenario",
    "injectEvent",
    "initGraph",
    "updateGraph",
    "audit",
    "showAudit",
    "clearAudit"
  ];

  function checkMissing() {
    const missing = [];

    for (let fn of REQUIRED) {
      if (typeof window[fn] !== "function") {
        missing.push(fn);
      }
    }

    if (missing.length > 0) {
      renderError("Missing Functions", missing);
      return false;
    }

    return true;
  }

  function renderError(title, list) {
    const out = document.getElementById("output");
    if (!out) return;

    out.innerHTML =
      "🟥 SPD RUNTIME ERROR<br><br>" +
      "<b>" + title + "</b><br>" +
      list.join("<br>") +
      "<br><br>System halted safely.";
  }

  function bootSafe() {

    const ok = checkMissing();

    if (!ok) return;

    try {
      if (typeof initGraph === "function") {
        initGraph();
      }

      const out = document.getElementById("output");
      if (out) {
        out.innerHTML = "🛰 SPD v10 READY — SYSTEM STABLE";
      }

      if (typeof audit === "function") {
        audit("BOOT", { status: "SAFE_MODE" });
      }

    } catch (e) {
      renderError("Runtime Exception", [e.message]);
    }
  }

  window.addEventListener("error", function (e) {
    renderError("JS Crash", [e.message]);
  });

  window.addEventListener("DOMContentLoaded", bootSafe);

})();