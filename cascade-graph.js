/***********************
 * SEXTANT CASCADE GRAPH v1.0
 * Visual Propagation Layer for engine.js v3
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
   INITIALIZE CANVAS
========================= */

function initGraph(canvasId) {

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 500;

  drawGraph(ctx);

  return ctx;
}

/* =========================
   UPDATE FROM ENGINE STATE
========================= */

function updateGraph(systemState) {

  for (const key in systemState) {
    nodeState[key].status = systemState[key];
  }

  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  drawGraph(ctx);
}

/* =========================
   DRAW FULL GRAPH
========================= */

function drawGraph(ctx) {

  ctx.clearRect(0, 0, 500, 500);

  drawConnections(ctx);

  for (const key in nodeState) {
    drawNode(ctx, key, nodeState[key]);
  }
}

/* =========================
   CONNECTION LINES
========================= */

function drawConnections(ctx) {

  ctx.strokeStyle = "#2a2f3a";
  ctx.lineWidth = 2;

  connect(ctx, "FIN", "DC");
  connect(ctx, "FIN", "CYB");
  connect(ctx, "DC", "CYB");
  connect(ctx, "DC", "INF");
  connect(ctx, "CYB", "INF");
  connect(ctx, "INF", "FIN");
}

function connect(ctx, a, b) {
  ctx.beginPath();
  ctx.moveTo(nodeState[a].x, nodeState[a].y);
  ctx.lineTo(nodeState[b].x, nodeState[b].y);
  ctx.stroke();
}

/* =========================
   NODE RENDERING
========================= */

function drawNode(ctx, key, node) {

  ctx.beginPath();
  ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);

  ctx.fillStyle = getColor(node.status);
  ctx.fill();

  ctx.strokeStyle = "#111827";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "12px Arial";
  ctx.fillText(key, node.x - 12, node.y + 4);
}

/* =========================
   STATUS COLORS
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
   INTEGRATION HOOK
========================= */

/*
  CALL THIS FROM engine.js v3:

  updateGraph(systemState);

  AFTER each renderOutput()
*/