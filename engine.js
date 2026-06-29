// =========================
// SPD CORE STATE
// =========================

window.state = {
  FX: 0,
  DC: 0,
  CYB: 0,
  INF: 0
};

window.auditLog = [];

// =========================
// AUDIT SYSTEM
// =========================

window.audit = function(type, payload) {
  window.auditLog.push({
    time: new Date().toISOString(),
    type,
    payload
  });
};

// =========================
// RESILIENCE SCORE ENGINE
// =========================

window.updateResilienceScore = function() {

  let score = 100;

  score -= window.state.FX * 5;
  score -= window.state.DC * 5;
  score -= window.state.CYB * 5;
  score -= window.state.INF * 5;

  if (score < 0) score = 0;

  const scoreText = document.getElementById("resilienceScore");
  const scoreBar = document.getElementById("scoreBar");
  const health = document.getElementById("systemHealth");

  if (!scoreText || !scoreBar || !health) return;

  scoreText.innerHTML = score + "%";
  scoreBar.value = score;

  if (score >= 80) {
    health.innerHTML = "🟢 HEALTHY";
    health.style.color = "#34d399";
  }
  else if (score >= 50) {
    health.innerHTML = "🟡 DEGRADED";
    health.style.color = "#fbbf24";
  }
  else {
    health.innerHTML = "🔴 CRITICAL";
    health.style.color = "#ef4444";
  }
};

// =========================
// SCENARIO ENGINE
// =========================

window.runScenario = function(type) {

  if (!window.state[type])
      window.state[type] = 0;

  window.state[type] += 2;

  window.audit("SCENARIO",{
    type,
    state:{...window.state}
  });

  window.updateUI();
  window.updateGraph(window.state);
  window.updateResilienceScore();

};

// =========================
// EVENT ENGINE
// =========================

window.injectEvent = function(event){

  const map={
    FX_SPIKE:"FX",
    BOND_STRESS:"DC",
    CYBER_ATTACK:"CYB",
    INFRA_FAILURE:"INF"
  };

  const target=map[event];

  if(!target) return;

  window.state[target]+=3;

  window.audit("EVENT",{
    event,
    target,
    state:{...window.state}
  });

  window.updateUI();
  window.updateGraph(window.state);
  window.updateResilienceScore();

};

// =========================
// UI
// =========================

window.updateUI=function(){

  const out=document.getElementById("output");
  const diag=document.getElementById("diag");

  if(!out) return;

  out.innerHTML=
      "FX : "+window.state.FX+"<br>"+
      "DC : "+window.state.DC+"<br>"+
      "CYB : "+window.state.CYB+"<br>"+
      "INF : "+window.state.INF;

  if(diag){

      diag.innerHTML=
      "System Diagnostics\n\n"+
      "FX Module : "+window.state.FX+"\n"+
      "Datacentre : "+window.state.DC+"\n"+
      "Cyber : "+window.state.CYB+"\n"+
      "Infrastructure : "+window.state.INF+"\n\n"+
      "Simulation Active";
  }

};

// =========================
// AUDIT
// =========================

window.showAudit=function(){

  const el=document.getElementById("audit");

  if(!el) return;

  el.innerText=JSON.stringify(window.auditLog,null,2);

};

window.clearAudit=function(){

  window.auditLog=[];

  const el=document.getElementById("audit");

  if(el)
      el.innerText="Audit log cleared.";

};

// =========================
// GRAPH
// =========================

window.updateGraph=function(state){

  const canvas=document.getElementById("graph");

  if(!canvas) return;

  canvas.width=400;
  canvas.height=220;

  const ctx=canvas.getContext("2d");

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const labels=["FX","DC","CYB","INF"];
  const values=[state.FX,state.DC,state.CYB,state.INF];

  const width=50;
  const gap=30;

  values.forEach((v,i)=>{

      ctx.fillStyle="#60a5fa";

      ctx.fillRect(
          40+i*(width+gap),
          190-v*10,
          width,
          v*10
      );

      ctx.fillStyle="#ffffff";

      ctx.fillText(
          labels[i],
          50+i*(width+gap),
          205
      );

      ctx.fillText(
          v,
          58+i*(width+gap),
          180-v*10
      );

  });

};

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded",function(){

    window.updateUI();
    window.updateGraph(window.state);
    window.updateResilienceScore();

});