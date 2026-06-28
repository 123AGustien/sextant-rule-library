document.addEventListener("DOMContentLoaded", function () {

  if (typeof initGraph === "function") {
    initGraph();
  }

  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = "🛰 SPD v10 READY — SELECT SCENARIO";
  }

  if (typeof audit === "function") {
    audit("BOOT", { status: "READY" });
  }

});