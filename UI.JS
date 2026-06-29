
/***********************
 * SPD BOOT ENGINE (CLEAN)
 ***********************/

document.addEventListener("DOMContentLoaded", function () {

  // =====================
  // 1. INIT GRAPH
  // =====================
  if (typeof initGraph === "function") {
    initGraph();
  }

  // =====================
  // 2. READY SCREEN
  // =====================
  const out = document.getElementById("output");

  if (out) {
    out.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  // =====================
  // 3. SAFE AUDIT BOOT EVENT
  // =====================
  if (typeof audit === "function") {
    audit("BOOT", {
      status: "READY",
      timestamp: new Date().toISOString()
    });
  }

});