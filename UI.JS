document.addEventListener("DOMContentLoaded", function () {

  initGraph();

  document.getElementById("output").innerHTML =
    "🛰 SPD v10 READY — SELECT SCENARIO";

  audit("BOOT", { status: "READY" });
});
