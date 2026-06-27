async function runScenario(ruleId) {

  const filePath = getRulePath(ruleId);
  const ruleText = await fetch(filePath).then(r => r.text());

  const parsed = parseRule(ruleText);
  const result = evaluateRule(parsed);

  renderOutput(ruleId, result);
}

// Map rule ID → file
function getRulePath(ruleId) {
  if (ruleId.startsWith("FIN")) return "FIN/" + ruleId + ".md";
  if (ruleId.startsWith("DC")) return "DC/" + ruleId + ".md";
  if (ruleId.startsWith("CYB")) return "CYB/" + ruleId + ".md";
  if (ruleId.startsWith("INF")) return "INF/" + ruleId + ".md";
}

// Extract structured meaning from rule text
function parseRule(text) {

  return {
    raw: text,
    hasRed: text.includes("RED"),
    hasOrange: text.includes("ORANGE"),
    hasYellow: text.includes("YELLOW")
  };
}

// Simple evaluation engine
function evaluateRule(rule) {

  if (rule.hasRed) {
    return {
      risk: "RED",
      cascade: "High system impact",
      action: "Immediate response required"
    };
  }

  if (rule.hasOrange) {
    return {
      risk: "ORANGE",
      cascade: "Active stress propagation",
      action: "Mitigation required"
    };
  }

  if (rule.hasYellow) {
    return {
      risk: "YELLOW",
      cascade: "Early warning signals",
      action: "Monitor closely"
    };
  }

  return {
    risk: "GREEN",
    cascade: "Stable conditions",
    action: "No action required"
  };
}

// Render output
function renderOutput(ruleId, result) {

  document.getElementById("output").innerHTML = `
    <h3>${ruleId}</h3>
    <p><b>Risk Level:</b> ${result.risk}</p>
    <p><b>Cascade:</b> ${result.cascade}</p>
    <p><b>Action:</b> ${result.action}</p>
  `;
}
