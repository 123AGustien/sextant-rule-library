/***********************
 * SEXTANT CASCADE GRAPH v2.1
 * FULL PRODUCTION BUILD (FIXED)
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

let flowLayer = [];
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
}

/* =========================
   ENGINE INTEGRATION
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
   FLOW UPDATE
========================= */

function updateFlows(flows = []) {

  flowLayer = flows.map(f => ({
    from: f.from,
    to: f.to,
    progress: f.progress || 0,
    speed: f.speed || 0.02,
    color: f.color || "#2bd4ff"
  }));
}

/* =========================
   MAIN RENDER LOOP
========================= */

function drawGraph() {
  if (!ctx) return;

  clearCanvas();
  drawConnections();
  drawNodes();
  drawFlows();
}

/* =========================
   CANVAS UTIL
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
   NODE RENDER
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
   FLOW RENDER
========================= */

function drawFlows() {

  if (!flowLayer.length) return;

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

  if (!flowLayer.length) return;

  for (let f of flowLayer) {

    f.progress += f.speed;

    if (f.progress > 1) {
      f.progress = 0;
    }
  }
}

/* =========================
   COLOR ENGINE
========================= */

function getColor(status) {

  const map = {
    GREEN: "#22c55e",
    YELLOW: "#eab308",
    ORANGE: "#f97316",
    RED: "#ef4444"
  };

  return map[status] || "#2bd4ff";
}

/* =========================
   AUTO BOOT
========================= */

window.onload = function () {
  initGraph("cascadeCanvas");
  startFlowAnimation();
};