document.addEventListener("DOMContentLoaded", function () {

  // INIT GRAPH FIRST (safe)
  if (typeof initGraph === "function") {
    initGraph("graph");
  }

  // ENGINE READY STATE
  const out = document.getElementById("output");
  if (out) {
    out.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  // AUDIT BOOT EVENT
  if (typeof auditLog !== "undefined") {
    audit("SYSTEM_BOOT", { status: "READY" });
  }
});
