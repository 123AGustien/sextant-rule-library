/***********************
 * SEXTANT CASCADE GRAPH v2.0
 * Hybrid Static + Animation Ready Visual Layer
 ***********************/

/* =========================
   GRAPH STATE
========================= */

const nodeState = {
  FIN: { x: 100, y: 150, status: "GREEN" },
  DC:  { x: 300, y: 150, status: "GREEN" },
  CYB: { x: 300, y: 300, status: "GREEN" },
  INF: { x: 100, y: 300, status: "GREEN" }
};

/* =========================
   FLOW LAYER (NEW)
   - reserved for future animation system
========================= */

let flowLayer = [];

/* =========================
   CANVAS CONTEXT
========================= */

let ctx;
let canvasRef;

/* =========================
   INIT GRAPH
========================= */

function initGraph(canvasId) {

  canvasRef = document.getElementById(canvasId);
  ctx = canvasRef.getContext("2d");

  canvasRef.width = 500;
  canvasRef.height = 500;

  drawGraph();

  return ctx;
}

/* =========================
   ENGINE HOOK (v3 INTEGRATION)
========================= */

function updateGraph(systemState) {

  // update node states
  for (const key in systemState) {
    if (nodeState[key]) {
      nodeState[key].status = systemState[key];
    }
  }

  drawGraph();
}

/* =========================
   OPTIONAL FLOW HOOK (FOR NEXT UPGRADE)
========================= */

function updateFlows(flows = []) {
  flowLayer = flows;
}

/* =========================
   MAIN RENDER LOOP (STATIC MODE)
========================= */

function drawGraph() {

  if (!ctx) return;

  clearCanvas();
  drawConnections();
  drawFlows();   // safe even if empty
  drawNodes();
}

/* =========================
   CLEAR
========================= */

function clearCanvas() {
  ctx.clearRect(0, 0, 500, 500);
}

/* =========================
   CONNECTIONS
========================= */

function drawConnections() {

  ctx.strokeStyle = "#2a2f3a";
  ctx.lineWidth = 2;

  connect("FIN", "DC");
  connect("FIN", "CYB");
  connect("DC", "CYB");
  connect("DC", "INF");
  connect("CYB", "INF");
  connect("INF", "FIN");
}

function connect(a, b) {

  ctx.beginPath();
  ctx.moveTo(nodeState[a].x, nodeState[a].y);
  ctx.lineTo(nodeState[b].x, nodeState[b].y);
  ctx.stroke();
}

/* =========================
   NODES
========================= */

function drawNodes() {

  for (const key in nodeState) {

    const node = nodeState[key];

    ctx.beginPath();
    ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);

    ctx.fillStyle = getColor(node.status);
    ctx.fill();

    ctx.strokeStyle = "#0a0f1f";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Arial";
    ctx.fillText(key, node.x - 12, node.y + 4);
  }
}

/* =========================
   FLOW RENDER LAYER (READY FOR v3 FLOW ENGINE)
========================= */

function drawFlows() {

  if (!flowLayer || flowLayer.length === 0) return;

  for (const f of flowLayer) {

    const from = nodeState[f.from];
    const to = nodeState[f.to];

    const x = from.x + (to.x - from.x) * f.progress;
    const y = from.y + (to.y - from.y) * f.progress;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);

    ctx.fillStyle = f.color || "#ffffff";
    ctx.fill();
  }
}

/* =========================
   COLOR SYSTEM
========================= */

function getColor(status) {

  switch (status) {
    case "GREEN": return "#00ff88";
    case "YELLOW": return "#ffd000";
    case "ORANGE": return "#ff8800";
    case "RED": return "#ff3b3b";
    default: return "#ffffff";
  }
}

/* =========================
   INTEGRATION RULE
========================= */

/*
ENGINE v3 MUST CALL:

1. updateGraph(systemState)

OPTIONAL (next upgrade):

2. updateFlows(flowData)

Flow format:
[
  {
    from: "FIN",
    to: "DC",
    progress: 0.0 - 1.0,
    color: "#ff8800"
  }
]
*/
/* =========================
   FLOW ANIMATION ENGINE (NEW CORE)
========================= */

let animationRunning = false;

/* START LOOP */
function startFlowAnimation() {

  if (animationRunning) return;
  animationRunning = true;

  function loop() {

    if (!animationRunning) return;

    updateFlowProgress();
    drawGraph();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* STOP LOOP */
function stopFlowAnimation() {
  animationRunning = false;
}

/* =========================
   FLOW PROGRESSION ENGINE
========================= */

function updateFlowProgress() {

  if (!flowLayer) return;

  for (const f of flowLayer) {

    f.progress += f.speed || 0.015;

    if (f.progress >= 1) {
      f.progress = 0; // loop continuous propagation
    }
  }
}

/* =========================
   ENHANCED FLOW UPDATE (replace your current one OR extend it)
========================= */

function updateFlows(flows = []) {

  flowLayer = flows.map(f => ({
    from: f.from,
    to: f.to,
    progress: f.progress || 0,
    speed: f.speed || 0.015,
    color: f.color || "#ffffff"
  }));
}

/* =========================
   AUTO-INIT HOOK (OPTIONAL BUT IMPORTANT)
========================= */

/*
CALL THIS AFTER initGraph():

startFlowAnimation();
*/