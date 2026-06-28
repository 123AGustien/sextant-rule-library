function renderInitial(id, rule) {
  document.getElementById("output").innerHTML =
    `<h3>${id}</h3><p>${rule.name}</p><p>STATUS: INITIALIZED</p>`;
}

function renderLive(id, metrics) {
  document.getElementById("output").innerHTML =
    `<h3>${id} (LIVE)</h3>
     <p>FIN: ${systemState.FIN}</p>
     <p>DC: ${systemState.DC}</p>
     <p>CYB: ${systemState.CYB}</p>
     <p>INF: ${systemState.INF}</p>
     <hr>
     <p>Stress: ${metrics.total}</p>
     <p>Resilience: ${metrics.resilience}</p>`;

  document.getElementById("cascade").innerText =
    JSON.stringify(systemState, null, 2);
}

function renderError(msg) {
  document.getElementById("output").innerHTML =
    `<span style="color:red">${msg}</span>`;
}