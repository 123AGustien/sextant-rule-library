document.addEventListener("DOMContentLoaded", function () {

  initGraph();

  const out = document.getElementById("output");
  if (out) {
    out.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  audit("BOOT", { status: "READY" });

});