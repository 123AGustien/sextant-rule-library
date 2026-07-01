/***********************
 * SPD AUTO-SUGGEST ENGINE v12
 * DECISION PRIORITY LAYER
 ***********************/

window.updateAutoSuggest = function () {

  if (!window.state) return;

  const panel = document.getElementById("autoSuggestPanel");
  if (!panel) return;

  const s = window.state;

  // ─────────────────────────────
  // 1. RISK SCORING
  // ─────────────────────────────
  const scores = [
    { key: "FX", value: s.FX },
    { key: "DC", value: s.DC },
    { key: "CYB", value: s.CYB },
    { key: "INF", value: s.INF }
  ];

  scores.sort((a, b) => b.value - a.value);

  const top = scores[0];
  const second = scores[1];

  // ─────────────────────────────
  // 2. ACTION MAP
  // ─────────────────────────────
  const actions = {
    FX: {
      button: "FX SHOCK",
      reason: "Foreign exchange volatility is dominant",
      impact: "May propagate instability to DC and CYB layers"
    },
    DC: {
      button: "DATA CENTER LOAD",
      reason: "Infrastructure load stress is highest",
      impact: "May increase CYB risk due to system strain"
    },
    CYB: {
      button: "CYBER EVENT",
      reason: "Security layer instability detected",
      impact: "May escalate into INF system disruption"
    },
    INF: {
      button: "INFRA FAILURE",
      reason: "Physical infrastructure degradation dominates",
      impact: "May cascade into DC and CYB instability"
    }
  };

  const suggestion = actions[top.key];

  // ─────────────────────────────
  // 3. SYSTEM STABILITY CHECK
  // ─────────────────────────────
  let urgency = "LOW";

  const max = top.value;

  if (max > 8) urgency = "CRITICAL";
  else if (max > 5) urgency = "HIGH";
  else if (max > 2) urgency = "MEDIUM";

  // ─────────────────────────────
  // 4. RENDER PANEL
  // ─────────────────────────────
  panel.innerHTML = `
    <div class="ruleTitle">🧭 AUTO-SUGGEST ENGINE</div>

    <div class="ruleItem">
      <b>Priority Domain:</b> ${top.key} (${top.value.toFixed(2)})
    </div>

    <div class="ruleItem">
      <b>Recommended Action:</b> ${suggestion.button}
    </div>

    <div class="ruleItem">
      <b>Reason:</b> ${suggestion.reason}
    </div>

    <div class="ruleItem">
      <b>System Impact:</b> ${suggestion.impact}
    </div>

    <br>

    <div class="ruleItem">
      <b>Secondary Risk:</b> ${second.key} (${second.value.toFixed(2)})
    </div>

    <div class="ruleItem">
      <b>Urgency Level:</b> ${urgency}
    </div>
  `;
};