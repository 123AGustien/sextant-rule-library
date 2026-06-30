window.updateSolutionPanel = function () {

  if (!window.state || !window.SOLUTIONS) return;

  const s = window.state;

  const data = window.SOLUTIONS;

  function getTier(value, tiers) {

    for (let t of tiers) {

      if (t.range.includes("+")) {
        const min = parseFloat(t.range.replace("+", ""));
        if (value >= min) return t;
      }

      const [min, max] = t.range.split("-").map(Number);

      if (value >= min && value <= max) return t;
    }

    return tiers[0];
  }

  const FX = getTier(s.FX, data.FX.tiers);
  const DC = getTier(s.DC, data.DC.tiers);
  const CYB = getTier(s.CYB, data.CYB.tiers);
  const INF = getTier(s.INF, data.INF.tiers);

  const panel = document.getElementById("solutionPanel");

  if (!panel) return;

  let html = "";

  function renderBlock(title, tier) {
    html += `
      <div class="ruleTitle">${title} → ${tier.level}</div>
      <div class="ruleItem">${tier.summary}</div>
    `;

    tier.actions.forEach(a => {
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