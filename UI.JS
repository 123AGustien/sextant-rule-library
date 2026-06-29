
/***********************
 * SPD v11 BOOT ENGINE
 * DEPENDENCY LOCK SYSTEM
 ***********************/

document.addEventListener("DOMContentLoaded", function () {

  /***********************
   * 1. REQUIRED MODULES
   ***********************/
  const REQUIRED = [
    "initGraph",
    "audit",
    "runScenario",
    "injectEvent",
    "updateUI",
    "updateGraph",
    "updateResilienceScore"
  ];

  const missing = [];

  REQUIRED.forEach(fn => {
    if (typeof window[fn] !== "function") {
      missing.push(fn);
    }
  });

  /***********************
   * 2. DEPENDENCY CHECK RESULT
   ***********************/
  const out = document.getElementById("output");

  if (missing.length > 0) {

    // HARD STOP STATE
    if (out) {
      out.innerHTML =
        "🟥 SPD BOOT FAILED<br><br>" +
        "Missing Modules:<br>" +
        missing.join("<br>") +
        "<br><br>System Locked Safely.";
    }

    console.error("SPD v11 BOOT LOCK FAILED", missing);
    return;
  }

  /***********************
   * 3. SAFE INIT GRAPH
   ***********************/
  if (typeof initGraph === "function") {
    initGraph();
  }

  /***********************
   * 4. READY SCREEN
   ***********************/
  if (out) {
    out.innerHTML = "🛰 SPD v11 READY — SYSTEM STABLE";
  }

  /***********************
   * 5. BOOT AUDIT EVENT
   ***********************/
  if (typeof audit === "function") {
    audit("BOOT", {
      status: "READY",
      version: "v11",
      timestamp: new Date().toISOString()
    });
  }

  console.log("SPD v11 BOOT SUCCESS — ALL MODULES OK");

});