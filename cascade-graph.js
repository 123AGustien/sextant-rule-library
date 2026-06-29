/****************************************
 * SPD v11 CASCADE GRAPH ENGINE
 ****************************************/

let ctx;
let canvas;

const nodeState = {

  FX:  { x:100, y:120 },

  DC:  { x:300, y:120 },

  CYB: { x:300, y:300 },

  INF: { x:100, y:300 }

};

const links = [

  ["FX","DC"],
  ["DC","CYB"],
  ["CYB","INF"],
  ["INF","FX"],

  // Cross dependencies
  ["FX","CYB"],
  ["DC","INF"]

];

function initGraph(){

    canvas=document.getElementById("graph");

    if(!canvas) return;

    canvas.width=400;
    canvas.height=400;

    ctx=canvas.getContext("2d");

    draw(window.state);

}

function updateGraph(state){

    draw(state);

}

function draw(state={}){

    if(!ctx) return;

    ctx.clearRect(0,0,400,400);

    // Background

    ctx.fillStyle="#08111f";
    ctx.fillRect(0,0,400,400);

    // Draw links

    links.forEach(pair=>{

        drawLink(
            pair[0],
            pair[1],
            state
        );

    });

    // Draw nodes

    Object.keys(nodeState).forEach(name=>{

        drawNode(
            name,
            state[name]||0
        );

    });

}

function drawNode(name,value){

    const n=nodeState[name];

    let colour="#2bd4ff";

    if(value>=8)
        colour="#ef4444";

    else if(value>=5)
        colour="#f59e0b";

    else if(value>=2)
        colour="#fde047";

    ctx.beginPath();

    ctx.arc(
        n.x,
        n.y,
        24,
        0,
        Math.PI*2
    );

    ctx.fillStyle=colour;
    ctx.fill();

    ctx.lineWidth=2;
    ctx.strokeStyle="#ffffff";
    ctx.stroke();

    ctx.fillStyle="#ffffff";
    ctx.font="bold 14px Arial";
    ctx.fillText(name,n.x-14,n.y+5);

    ctx.font="12px Arial";
    ctx.fillText(
        value,
        n.x-4,
        n.y+40
    );

}

function drawLink(a,b,state){

    const na=nodeState[a];
    const nb=nodeState[b];

    const risk=Math.max(
        state[a]||0,
        state[b]||0
    );

    let colour="#334155";
    let width=2;

    if(risk>=8){

        colour="#ef4444";
        width=4;

    }

    else if(risk>=5){

        colour="#f59e0b";
        width=3;

    }

    else if(risk>=2){

        colour="#fde047";
        width=2.5;

    }

    ctx.beginPath();

    ctx.moveTo(
        na.x,
        na.y
    );

    ctx.lineTo(
        nb.x,
        nb.y
    );

    ctx.lineWidth=width;
    ctx.strokeStyle=colour;
    ctx.stroke();

}

window.initGraph=initGraph;
window.updateGraph=updateGraph;