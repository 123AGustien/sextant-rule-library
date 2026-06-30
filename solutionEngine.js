window.updateSolutionPanel = function () {

  if (!window.state || !window.SOLUTIONS) return;

  const s = window.state;
  const data = window.SOLUTIONS;

  const panel = document.getElementById("solutionPanel");
  if (!panel) return;

  // ─────────────────────────────
  // SAFE RANGE PARSER
  // ─────────────────────────────
  function parseRange(range) {
    if (!range) return { min: 0, max: 0 };

    range = String(range).replace(/\s/g, "");

    if (range.includes("+")) {
      return {
        min: parseFloat(range.replace("+", "")),
        max: Infinity
      };
    }

    const [min, max] = range.split("-").map(Number);
    return { min, max };
  }

  // ─────────────────────────────
  // SAFE TIER SELECTOR
  // ─────────────────────────────
  function getTier(value, tiers = []) {

    if (!Array.isArray(tiers) || tiers.length === 0) {
      return {
        level: "UNKNOWN",
        summary: "No tier data available",
        actions: []
      };
    }

    for (let t of tiers) {
      const r = parseRange(t.range);
      if (value >= r.min && value <= r.max) return t;
    }

    // fallback = highest severity (last tier)
    return tiers[tiers.length - 1];
  }

  // ─────────────────────────────
  // RESOLVE TIERS
  // ─────────────────────────────
  const FX = getTier(s.FX, data.FX?.tiers);
  const DC = getTier(s.DC, data.DC?.tiers);
  const CYB = getTier(s.CYB, data.CYB?.tiers);
  const INF = getTier(s.INF, data.INF?.tiers);

  // ─────────────────────────────
  // RENDER PANEL
  // ─────────────────────────────
  let html = "";

  function renderBlock(title, tier) {

    html += `
      <div class="ruleTitle">${title} → ${tier.level}</div>
      <div class="ruleItem">${tier.summary || "No summary available"}</div>
    `;

    (tier.actions || []).forEach(a => {
      html += `<div class="ruleItem">✔ ${a}</div>`;
    });

    html += "<br>";
  }

  renderBlock("FX", FX);
  renderBlock("DC", DC);
  renderBlock("CYB", CYB);
  renderBlock("INF", INF);

  panel.innerHTML = html;
};