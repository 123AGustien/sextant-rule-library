
/***********************
 * SPD v10 UI + BOOT
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
  // 3. AUDIT BOOT EVENT
  // =====================
  if (typeof audit === "function") {
    audit("BOOT", { status: "READY" });
  }

  // =====================
  // 4. RUN INITIAL DIAGNOSTICS
  // =====================
  if (typeof runDiagnostics === "function") {
    runDiagnostics();
  }

  // =====================
  // 5. LIVE DIAGNOSTICS LOOP
  // =====================
  setInterval(function () {
    if (typeof runDiagnostics === "function") {
      runDiagnostics();
    }
  }, 1000);

});