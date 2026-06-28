let ctx;
let canvas;

const nodeState = {
  FX: { x: 100, y: 150 },
  DC: { x: 300, y: 150 },
  CYB: { x: 300, y: 300 },
  INF: { x: 100, y: 300 }
};

function initGraph() {
  canvas = document.getElementById("graph");
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  draw();
}

function updateGraph(state) {
  draw(state);
}

function draw(state = {}) {

  if (!ctx) return;

  ctx.clearRect(0, 0, 400, 400);

  link("FX", "DC");
  link("DC", "CYB");
  link("CYB", "INF");
  link("INF", "FX");

  for (let k in nodeState) {

    let v = state[k] || 0;

    ctx.beginPath();
    ctx.arc(nodeState[k].x, nodeState[k].y, 18, 0, Math.PI * 2);

    ctx.fillStyle =
      v > 6 ? "red" :
      v > 3 ? "orange" :
      v > 0 ? "yellow" : "#2bd4ff";

    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(k, nodeState[k].x - 10, nodeState[k].y + 4);
  }
}

function link(a, b) {
  ctx.beginPath();
  ctx.moveTo(nodeState[a].x, nodeState[a].y);
  ctx.lineTo(nodeState[b].x, nodeState[b].y);
  ctx.strokeStyle = "#2a2f3a";
  ctx.stroke();
}