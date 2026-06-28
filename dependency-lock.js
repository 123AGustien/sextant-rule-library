/***********************
 * SPD v10 DEPENDENCY LOCK
 ***********************/

(function () {

  const REQUIRED = [
    "audit",
    "runScenario",
    "injectEvent",
    "initGraph",
    "updateGraph",
    "showAudit",
    "clearAudit"
  ];

  function checkDependencies() {

    const missing = [];

    for (let fn of REQUIRED) {
      if (typeof window[fn] !== "function") {
        missing.push(fn);
      }
    }

    const status = {
      ok: missing.length === 0,
      missing: missing
    };

    render(status);
    return status.ok;
  }

  function render(status) {

    const out = document.getElementById("output");

    if (!out) return;

    if (!status.ok) {

      out.innerHTML =
        "🟥 SPD DEPENDENCY ERROR<br><br>" +
        "Missing:<br>" +
        status.missing.join("<br>") +
        "<br><br>System blocked safely.";

    } else {
      out.innerHTML =
        "🟢 SPD DEPENDENCY OK — SYSTEM READY";
    }
  }

  function boot() {

    const ok = checkDependencies();

    if (!ok) return;

    // safe boot signal
    if (typeof audit === "function") {
      audit("DEPENDENCY_BOOT", { status: "OK" });
    }

    // start graph safely AFTER validation
    if (typeof initGraph === "function") {
      initGraph();
    }

    console.log("SPD v10 DEPENDENCY LOCK ACTIVE");
  }

  window.addEventListener("load", boot);

})();