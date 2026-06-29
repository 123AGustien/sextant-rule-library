/***********************
 * SPD BOOT ENGINE v12
 ***********************/

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

    console.warn("SPD v12 DEGRADED MODE", missing);

    if (out) {
      out.innerHTML =
        "🟡 SPD DEGRADED MODE<br><br>" +
        missing.join("<br>");
    }

  } else {

    if (out) {
      out.innerHTML = "🟢 SPD v12 READY — SYSTEM ONLINE";
    }
  }

  window.initGraph?.();

  window.audit?.("BOOT", {
    version: "v12",
    mode: missing.length ? "DEGRADED" : "FULL",
    missing
  });

  console.log("SPD v12 BOOT COMPLETE");
});