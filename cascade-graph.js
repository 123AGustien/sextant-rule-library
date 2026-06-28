/***********************
 * SEXTANT CASCADE GRAPH v2.1
 * Static + Flow Animation Engine (Stable Build)
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
   FLOW LAYER
========================= */

let flowLayer = [];

/* =========================
   CANVAS
========================= */

let ctx;
let canvasRef;

/* =========================
   INIT
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
   ENGINE HOOK
========================= */

function updateGraph(systemState) {

  for (const key in systemState) {
    if (nodeState[key]) {
      nodeState[key].status = systemState[key];
    }
  }

  drawGraph();
}

/* =========================
   FLOW UPDATE HOOK
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
   RENDER LOOP (STATIC + FLOW LAYER)
========================= */

function drawGraph() {

  if (!ctx) return;

  clearCanvas();
  drawConnections();
  drawNodes();
  drawFlows();
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
   FLOWS (ANIMATION LAYER)
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

    ctx.fillStyle = f.color;
    ctx.fill();
  }
}

/* =========================
   FLOW ANIMATION ENGINE
========================= */

let animationRunning = false;

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

function stopFlowAnimation() {
  animationRunning = false;
}

/* =========================
   FLOW PROGRESSION
========================= */

function updateFlowProgress() {

  if (!flowLayer || flowLayer.length === 0) return;