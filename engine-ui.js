 /***********************
  * SPD UI ENGINE v12
  ***********************/

window.updateUI = function () {

  const out = document.getElementById("output");
  const diag = document.getElementById("diag");

  if (out) {
    out.innerHTML =
      "FX : " + window.state.FX + "<br>" +
      "DC : " + window.state.DC + "<br>" +
      "CYB : " + window.state.CYB + "<br>" +
      "INF : " + window.state.INF;
  }

  if (diag) {
    diag.innerText =
      "SYSTEM DIAGNOSTICS\n\n" +
      JSON.stringify(window.state, null, 2);
  }
};

window.updateResilienceScore = function () {

  let score = 100;

  score -= window.state.FX * 5;
  score -= window.state.DC * 5;
  score -= window.state.CYB * 5;
  score -= window.state.INF * 5;

  if (score < 0) score = 0;

  const el = document.getElementById("output");

  if (el) {
    el.innerHTML += "<br><br>Resilience: " + score + "%";
  }
};

window.showAudit = function () {
  const el = document.getElementById("audit");
  if (!el) return;

  el.textContent = JSON.stringify(window.auditLog, null, 2);
};

window.clearAudit = function () {
  window.auditLog = [];
  const el = document.getElementById("audit");
  if (el) el.textContent = "CLEARED";
};