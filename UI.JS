/***********************
 * SPD v10 UI CONTROLLER
 * SAFE BOOT STRAP ONLY
 ***********************/

document.addEventListener("DOMContentLoaded", function () {

  // 1. GRAPH INITIALIZATION (SAFE GUARD)
  try {
    if (typeof initGraph === "function") {
      initGraph();
    }
  } catch (e) {
    console.error("Graph init failed:", e);
  }

  // 2. OUTPUT BOOT STATE
  const out = document.getElementById("output");

  if (out) {
    out.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  // 3. AUDIT BOOT EVENT (SAFE GUARD)
  try {
    if (typeof audit === "function") {
      audit("BOOT", {
        status: "READY",
        timestamp: new Date().toISOString()
      });
    }
  } catch (e) {
    console.error("Audit boot failed:", e);
  }

  // 4. OPTIONAL UI HEALTH CHECK (NO FAIL MODE)
  console.log("SPD v10 UI initialized successfully");
});


/***********************
 * OPTIONAL UI HELPERS
 * (SAFE WRAPPERS ONLY)
 ***********************/

// Manual refresh hook (if needed later)
window.refreshUI = function () {
  const out = document.getElementById("output");

  if (out && window.state) {
    out.innerHTML =
      "FX: " + (state.FX || 0) + "<br>" +
      "DC: " + (state.DC || 0) + "<br>" +
      "CYB: " + (state.CYB || 0) + "<br>" +
      "INF: " + (state.INF || 0);
  }
};

// Safe trigger helpers (no logic duplication)
window.triggerFX = function () {
  if (typeof injectEvent === "function") {
    injectEvent("FX");
  }
};

window.triggerBond = function () {
  if (typeof injectEvent === "function") {
    injectEvent("BOND");
  }
};

window.triggerCyber = function () {
  if (typeof injectEvent === "function") {
    injectEvent("CYBER");
  }
};

window.triggerInfra = function () {
  if (typeof injectEvent === "function") {
    injectEvent("INFRA");
  }
};
