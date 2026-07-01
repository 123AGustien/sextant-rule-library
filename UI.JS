 /***********************
  * SPD BOOT ENGINE v12
  * SYSTEM INTEGRITY LAYER (SAFE)
  ***********************/

document.addEventListener("DOMContentLoaded", function () {

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

  const mode = missing.length ? "DEGRADED" : "FULL";

  // ─────────────────────────────
  // SAFE BOOT OUTPUT (DEDICATED)
  // ─────────────────────────────
  let bootPanel = document.getElementById("bootStatus");

  if (!bootPanel) {
    bootPanel = document.createElement("div");
    bootPanel.id = "bootStatus";
    bootPanel.style.padding = "10px";
    bootPanel.style.fontSize = "12px";
    bootPanel.style.border = "1px solid #223447";
    bootPanel.style.background = "#05070b";
    bootPanel.style.color = "#cfe8ff";

    document.body.prepend(bootPanel);
  }

  // ─────────────────────────────
  // STATUS DISPLAY
  // ─────────────────────────────
  if (missing.length > 0) {

    console.warn("🟡 SPD v12 DEGRADED MODE", missing);

    bootPanel.innerHTML =
      "🟡 SPD BOOT STATUS: DEGRADED MODE<br><br>" +
      "<b>Missing Modules:</b><br>" +
      missing.map(m => "• " + m).join("<br>");

  } else {

    console.log("🟢 SPD v12 SYSTEM READY");

    bootPanel.innerHTML =
      "🟢 SPD v12 READY — SYSTEM ONLINE";
  }

  // ─────────────────────────────
  // SAFE OPTIONAL HOOKS
  // ─────────────────────────────
  window.initGraph?.();

  window.audit?.("BOOT", {
    version: "v12",
    mode,
    missing,
    timestamp: new Date().toISOString()
  });

  window.renderUI?.();

  console.log("SPD v12 BOOT COMPLETE");
});