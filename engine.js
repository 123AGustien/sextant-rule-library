    /***********************
 * SPD v10 ENGINE CORE
 ***********************/

const state = {
  FIN: "GREEN",
  DC: "GREEN",
  CYB: "GREEN",
  INF: "GREEN"
};

const rank = { GREEN:0, YELLOW:1, ORANGE:2, RED:3 };
const rev = ["GREEN","YELLOW","ORANGE","RED"];

let tick = 0;
let running = false;

/* RULES */
const rules = {
  "FIN-001": { domain: "FIN", impact: 2 },
  "DC-001":  { domain: "DC", impact: 3 },
  "CYB-001": { domain: "CYB", impact: 5 },
  "INF-001": { domain: "INF", impact: 4 }
};

function runScenario(id) {
  reset();
  running = true;
  tick = 0;

  apply(id);
  propagate(id);

  audit("SCENARIO_START", { id, state: {...state} });

  loop(id);
}

function injectEvent(type) {
  const map = {
    FX: "FIN-001",
    BOND: "DC-001",
    CYBER: "CYB-001",
    INFRA: "INF-001"
  };
  runScenario(map[type]);
}

function apply(id) {
  const r = rules[id];
  escalate(r.domain, 2);
}

function propagate(id) {
  const map = {
    "FIN-001": { DC:1, CYB:2 },
    "DC-001": { INF:2, CYB:1 },
    "CYB-001": { FIN:2, DC:2 },
    "INF-001": { DC:3, CYB:1 }
  };

  for (let k in map[id]) {
    escalate(k, map[id][k]);
  }
}

function escalate(domain, level) {
  const current = rank[state[domain]];
  const next = Math.min(3, current + level);
  state[domain] = rev[next];
}

function decay() {
  for (let k in state) {
    const r = rank[state[k]];
    state[k] = rev[Math.max(0, r - 1)];
  }
}

function risk() {
  return Object.values(state).map(v => rank[v]).reduce((a,b)=>a+b,0);
}

function loop(id) {
  if (!running) return;

  tick++;

  decay();
  propagate(id);

  const r = risk();

  updateUI(tick, r);
  updateGraph(state);

  audit("TICK", { tick, state:{...state}, risk:r });

  if (r >= 10) {
    running = false;
    audit("CRITICAL_STOP", state);
  }

  setTimeout(()=>loop(id), 1000);
}

function reset() {
  state.FIN="GREEN";
  state.DC="GREEN";
  state.CYB="GREEN";
  state.INF="GREEN";
}

/* UI HOOK */
function updateUI(tick, risk) {
  document.getElementById("output").innerHTML =
    "TICK: " + tick + "<br>" +
    "FIN:" + state.FIN + " DC:" + state.DC + " CYB:" + state.CYB + " INF:" + state.INF + "<br>" +
    "RISK: " + risk;
}
