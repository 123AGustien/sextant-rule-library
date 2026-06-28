/***********************
 * SPD v10 CASCADE GRAPH
 ***********************/

const nodeState = {
  FX:  { x: 100, y: 150, status: "GREEN" },
  DC:  { x: 300, y: 150, status: "GREEN" },
  CYB: { x: 300, y: 300, status: "GREEN" },
  INF: { x: 100, y: 300, status: "GREEN" }
};

let ctx;
let canvas;

const colorMap = {
  GREEN: "#2bd4ff",
  YELLOW: "#facc15",
  ORANGE: "#f97316",
  RED: "#ef4444"
};

/* =========================
   INIT GRAPH
========================= */
function initGraph() {
  const container = document.getElementById("cascade");
  if (!container) return;

  canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 420;

  container.innerHTML = "";
  container.appendChild(canvas);

  ctx = canvas.getContext("2d");

  draw();
}

/* =========================
   UPDATE GRAPH STATE
========================= */
function updateGraph(state) {
  if (!state) return;

  for (let k in state) {
    if (nodeState[k]) {
      nodeState[k].status = mapStatus(state[k]);
    }
  }

  draw();
}

/* =========================
   STATUS MAPPING (SAFE)
========================= */
function mapStatus(value) {
  if (typeof value === "number") {
    if (value > 6) return "RED";
    if (value > 4) return "ORANGE";
    if (value > 2) return "YELLOW";
    return "GREEN";
  }

  return value || "GREEN";
}

/* =========================
   DRAW ENGINE
========================= */
function draw() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLinks();
  drawNodes();
}

/* =========================
   LINKS (CASCADE EDGES)
========================= */
function drawLinks() {
  connect("FX", "DC");
  connect("DC", "CYB");
  connect("CYB", "INF");
  connect("INF", "FX");
}

/* =========================
   CONNECTIONS
========================= */
function connect(a, b) {
  ctx.beginPath();
  ctx.moveTo(nodeState[a].x, nodeState[a].y);
  ctx.lineTo(nodeState[b].x, nodeState[b].y);
  ctx.strokeStyle = "#2a2f3a";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* =========================
   NODE RENDERING
========================= */
function drawNodes() {

  for (let k in nodeState) {

    const node = nodeState[k];

    ctx.beginPath();
    ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);

    ctx.fillStyle = colorMap[node.status] || "#2bd4ff";
    ctx.fill();

    ctx.strokeStyle = "#0a0f1f";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Arial";
    ctx.fillText(k, node.x - 10, node.y + 4);
  }
}