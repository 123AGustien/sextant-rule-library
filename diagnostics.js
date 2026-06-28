/***********************
 * SPD v10 LIVE DIAGNOSTICS
 ***********************/

function runDiagnostics() {

  const report = {
    engine: typeof runScenario === "function",
    inject: typeof injectEvent === "function",
    graph: typeof initGraph === "function",
    updateGraph: typeof updateGraph === "function",
    audit: typeof audit === "function",
    ui: typeof updateUI === "function",
    dom_output: !!document.getElementById("output"),
    dom_graph: !!document.getElementById("graph"),
    dom_audit: !!document.getElementById("audit")
  };

  const lines = [];

  for (let key in report) {
    const status = report[key] ? "OK" : "MISSING";
    lines.push(key + ": " + status);
  }

  const el = document.getElementById("diag");
  if (el) {
    el.textContent = lines.join("\n");
  }

  return report;
}