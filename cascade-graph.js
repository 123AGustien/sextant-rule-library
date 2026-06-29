/****************************************
 * SPD v11 CASCADE GRAPH ENGINE (FIXED)
 ****************************************/

let ctx;
let canvas;

const nodeState = {

  FX:  { x:100, y:100 },
  DC:  { x:300, y:100 },
  CYB: { x:300, y:300 },
  INF: { x:100, y:300 }

};

const links = [

  ["FX","DC"],
  ["DC","CYB"],
  ["CYB","INF"],
  ["INF","FX"],

  ["FX","CYB"],
  ["DC","INF"]

];

/***********************
 * INIT GRAPH
 ***********************/

function initGraph() {

  canvas = document.getElementById("graph");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  // FIX: proper pixel scaling
  const dpr = window.devicePixelRatio || 1;

  canvas.width = 400 * dpr;
  canvas.height = 400 * dpr;

  ctx.scale(dpr, dpr);

  draw(window.state || {});

}

/***********************
 * UPDATE
 ***********************/

function updateGraph(state) {
  draw(state);
}

/***********************
 * DRAW ENGINE
 ***********************/

function draw(state = {}) {

  if (!ctx) return;

  ctx.clearRect(0, 0, 400, 400);

  // background
  ctx.fillStyle = "#08111f";
  ctx.fillRect(0, 0, 400, 400);

  // links first
  links.forEach(([a, b]) => {
    drawLink(a, b, state);
  });

  // nodes
  Object.keys(nodeState).forEach(name => {
    drawNode(name, state[name] || 0);
  });

}

/***********************
 * NODE RENDER
 ***********************/

function drawNode(name, value) {

  const n = nodeState[name];

  let colour = "#2bd4ff";

  if (value >= 8) colour = "#ef4444";
  else if (value >= 5) colour = "#f59e0b";
  else if (value >= 2) colour = "#fde047";

  ctx.beginPath();
  ctx.arc(n.x, n.y, 26, 0, Math.PI * 2);

  ctx.fillStyle = colour;
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px Arial";
  ctx.fillText(name, n.x - 16, n.y + 5);

  ctx.font = "12px Arial";
  ctx.fillText(value, n.x - 4, n.y + 42);

}

/***********************
 * LINK RENDER
 ***********************/

function drawLink(a, b, state) {

  const na = nodeState[a];
  const nb = nodeState[b];

  const risk = Math.max(
    state[a] || 0,
    state[b] || 0
  );

  let colour = "#334155";
  let width = 2;

  if (risk >= 8) {
    colour = "#ef4444";
    width = 4;
  } else if (risk >= 5) {
    colour = "#f59e0b";
    width = 3;
  } else if (risk >= 2) {
    colour = "#fde047";
    width = 2.5;
  }

  ctx.beginPath();
  ctx.moveTo(na.x, na.y);
  ctx.lineTo(nb.x, nb.y);

  ctx.lineWidth = width;
  ctx.strokeStyle = colour;
  ctx.stroke();

}

/***********************
 * EXPORT
 ***********************/

window.initGraph = initGraph;
window.updateGraph = updateGraph;