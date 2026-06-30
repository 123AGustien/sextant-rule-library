 /***********************
  * SPD BOOT ENGINE v12
  * SYSTEM INTEGRITY LAYER
  ***********************/

document.addEventListener("DOMContentLoaded", function () {

  // ─────────────────────────────
  // CORE MODULE CHECK (REAL SYSTEM ONLY)
  // ─────────────────────────────
  const REQUIRED = [
    "audit",
    "runScenario",
    "resetSystem",
    "exportLog",
    "renderUI",
    "drawGraph",
    "updateFXModel"
  ];

  const missing = REQUIRED.filter(fn => typeof window[fn] !== "function");

  // UI target fallback (your system uses log panel, not "output")
  const out =
    document.getElementById("log") ||
    document.getElementById("stateBox") ||
    document.body;

  // ─────────────────────────────
  // SYSTEM STATE REPORT
  // ─────────────────────────────
  const mode = missing.length ? "DEGRADED" : "FULL";

  if (missing.length > 0) {

    console.warn("🟡 SPD v12 DEGRADED MODE", missing);

    if (out) {
      out.innerHTML =
        "🟡 SPD BOOT STATUS: DEGRADED MODE<br><br>" +
        "<b>Missing Modules:</b><br>" +
        missing.map(m => "• " + m).join("<br>");
    }

  } else {

    console.log("🟢 SPD v12 SYSTEM READY");

    if (out) {
      out.innerHTML = "🟢 SPD v12 READY — SYSTEM ONLINE";
    }
  }

  // ─────────────────────────────
  // SAFE OPTIONAL HOOKS (NON-BREAKING)
  // ─────────────────────────────
  if (typeof window.initGraph === "function") {
    window.initGraph();
  }

  // ─────────────────────────────
  // BOOT AUDIT EVENT (SAFE CALL)
  // ─────────────────────────────
  if (typeof window.audit === "function") {
    window.audit("BOOT", {
      version: "v12",
      mode,
      missing,
      timestamp: new Date().toISOString()
    });
  }

  // ─────────────────────────────
  // INITIAL UI RENDER
  // ─────────────────────────────
  if (typeof window.renderUI === "function") {
    window.renderUI();
  }

  // ─────────────────────────────
  // FINAL LOG
  // ─────────────────────────────
  console.log("SPD v12 BOOT COMPLETE");
});