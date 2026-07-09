/*
 SEXTANT PROTOCOL
 SPD v13 COCKPIT INTEGRATION
 Engine Connection Layer
*/


function executeScenario(type){


let scenarioName="";


if(type==="FX"){

scenarioName="Financial Stress Injection";

}


if(type==="INF"){

scenarioName="Infrastructure Failure";

}


if(type==="CYB"){

scenarioName="Cyber Event";

}




// 1. Cascade Analysis

const cascade =
CascadeEngine.analyse(type);




// 2. Decision Evaluation

const decision =
DecisionEngine.evaluate(cascade);




// 3. Audit Recording

AuditLog.add({

scenario:scenarioName,

cascade:cascade.path,

risk:decision.risk,

containment:decision.containment,

actions:decision.actions

});




// 4. Update Cockpit Risk Panel


document.getElementById("riskOutput").innerHTML =

`

<b>SCENARIO PANEL</b><br>

${scenarioName}

<br><br>


<b>CASCADE ANALYSIS</b><br>

${cascade.path.join("<br>↓<br>")}


<br><br>


<b>RISK PANEL</b><br>

Risk: ${decision.risk}


<br><br>


<b>CONTAINMENT</b><br>

${decision.containment}


<br><br>


<b>SOLUTION OPTIONS</b><br>

${decision.actions.join("<br>")}


<br><br>


<b>AUDIT STATUS</b><br>

Simulation recorded successfully


`;




// Update audit section if available

let auditBox =
document.getElementById("auditLog");


if(auditBox){

auditBox.innerHTML =
AuditLog.display();

}


}