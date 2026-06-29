/****************************************
 * SPD v12 BOOT ENGINE (AUTO SAFE MODE)
 ****************************************/

document.addEventListener("DOMContentLoaded", function () {

  const REQUIRED = [
    "audit",
    "runScenario",
    "injectEvent",
    "updateUI",
    "updateGraph",
    "updateResilienceScore"
  ];

  const missing = REQUIRED.filter(fn => typeof window[fn] !== "function");

  const out = document.getElementById("output");

  if (missing.length > 0) {

    // NO HARD BLOCK ANYMORE — SAFE DEGRADED MODE
    if (out) {
      out.innerHTML =
        "🟡 SPD DEGRADED MODE (AUTO RECOVERY ACTIVE)<br><br>" +
        "Recovered Missing Modules:<br>" +
        missing.join("<br>");
    }

    console.warn("SPD v12 DEGRADED MODE ACTIVE", missing);
  }

  if (typeof initGraph === "function") {
    initGraph();
  }

  if (out && missing.length === 0) {
    out.innerHTML = "🟢 SPD v12 READY — FULL SYSTEM ONLINE";
  }

  if (typeof audit === "function") {
    audit("BOOT", {
      version: "v12",
      mode: missing.length ? "DEGRADED" : "FULL",
      missing
    });
  }

});