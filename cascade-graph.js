/***********************
 * SPD v10 CASCADE GRAPH
 ***********************/

const nodeState = {
  FIN: { x: 100, y: 150, status: "GREEN" },
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

function initGraph() {
  canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 420;
  document.getElementById("cascade").innerHTML = "";
  document.getElementById("cascade").appendChild(canvas);
  ctx = canvas.getContext("2d");
  draw();
}

function updateGraph(state) {
  for (let k in state) {
    nodeState[k].status = state[k];
  }
  draw();
}

function draw() {
  if (!ctx) return;

  ctx.clearRect(0,0,420,420);

  drawLinks();
  drawNodes();
}

function drawLinks() {
  ctx.strokeStyle = "#1f2a44";
  ctx.lineWidth = 2;

  link("FIN","DC");
  link("FIN","CYB");
  link("DC","INF");
  link("CYB","INF");
}

function link(a,b){
  ctx.beginPath();
  ctx.moveTo(nodeState[a].x,nodeState[a].y);
  ctx.lineTo(nodeState[b].x,nodeState[b].y);
  ctx.stroke();
}

function drawNodes() {
  for (let k in nodeState) {
    const n = nodeState[k];

    ctx.beginPath();
    ctx.arc(n.x,n.y,18,0,Math.PI*2);

    ctx.fillStyle = colorMap[n.status];
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(k,n.x-10,n.y+4);
  }
}
