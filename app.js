/*
=====================================================
🛰 SPD v13 // SEXTANT RESILIENCE COCKPIT PRO
Application Controller
With Scenario Intensity Engine
=====================================================
*/


function runScenario(type){

    let scenario = SPD_SCENARIOS[type];

    if(!scenario){
        console.log("Scenario not found:", type);
        return;
    }


    // Apply intensity scaling

    let FX  = applyIntensity(scenario.impact.FX);
    let DC  = applyIntensity(scenario.impact.DC);
    let CYB = applyIntensity(scenario.impact.CYB);
    let INF = applyIntensity(scenario.impact.INF);
    let EN  = applyIntensity(scenario.impact.EN);



    // Calculate total impact score

    let total =
        FX +
        DC +
        CYB +
        INF +
        EN;


    let averageRisk = total / 5;


    // Risk classification

    let risk = calculateRisk(averageRisk);



    // Risk Panel

    document.getElementById("risk").innerHTML =
    `
    Risk: ${risk}
    <br>
    SPD Risk Index: ${averageRisk.toFixed(1)}
    `;



    // Scenario Panel

    document.getElementById("scenario").innerHTML =
    `
    Scenario:
    <br>
    ${scenario.name}
    <br>
    Intensity:
    ${(scenarioIntensity * 100).toFixed(0)}%
    `;



    // Solution Options

    document.getElementById("solution").innerHTML =
    scenario.solution
    .map((s,i)=>`${i+1}. ${s}`)
    .join("<br>");



    // Action Sequence

    let action = document.getElementById("action");

    if(action){

        action.innerHTML =
        scenario.solution
        .map((step,index)=>
        `${index+1}. ${step}`)
        .join("<br>");

    }



    // Audit Record

    document.getElementById("audit").innerHTML =
    `
    SPD v13 AUDIT RECORD

    <br><br>

    SCENARIO:
    ${scenario.name}

    <br><br>

    INTENSITY:
    ${(scenarioIntensity * 100).toFixed(0)}%

    <br><br>

    SYSTEM IMPACT:

    <br>
    FX: ${FX.toFixed(1)}

    <br>
    DC: ${DC.toFixed(1)}

    <br>
    CYB: ${CYB.toFixed(1)}

    <br>
    INF: ${INF.toFixed(1)}

    <br>
    EN: ${EN.toFixed(1)}

    <br><br>

    RISK:
    ${risk}

    <br><br>

    STATUS:
    Simulation Complete
    `;



    // Pipeline Log

    let log = document.getElementById("pipeline");

    if(log){

        log.innerHTML +=
        `
        <br>
        [SPD v13] Scenario Loaded:
        ${scenario.name}

        <br>
        [SPD v13] Intensity:
        ${(scenarioIntensity * 100).toFixed(0)}%

        <br>
        [SPD v13] Risk Calculation Complete

        <br>
        [SPD v13] Decision Support Generated
        `;

    }

}



/*
=====================================================
RESET FUNCTION
=====================================================
*/

function resetSystem(){

    document.getElementById("risk").innerHTML =
    "Risk: LOW";


    document.getElementById("scenario").innerHTML =
    "Idle";


    document.getElementById("solution").innerHTML =
    "-";


    document.getElementById("action").innerHTML =
    "Awaiting scenario selection...";


    document.getElementById("audit").innerHTML =
    "Waiting...";


    let log = document.getElementById("pipeline");

    if(log){

        log.innerHTML =
        "PIPELINE LOG ACTIVE";

    }

}