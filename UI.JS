document.addEventListener("DOMContentLoaded", function () {

  // 1. INIT GRAPH (safe check)
  if (typeof initGraph === "function") {
    initGraph();
  }

  // 2. READY STATE
  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  // 3. BOOT AUDIT (safe check)
  if (typeof audit === "function") {
    audit("BOOT", { status: "READY" });
  }

});