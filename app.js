/*
=====================================================
🛰 SPD v13 // SEXTANT RESILIENCE COCKPIT PRO
Application Controller
=====================================================
*/

function runScenario(type){

    let scenario = SPD_SCENARIOS[type];

    if(!scenario){
        console.log("Scenario not found:", type);
        return;
    }


    // Calculate total impact score

    let total =
        scenario.impact.FX +
        scenario.impact.DC +
        scenario.impact.CYB +
        scenario.impact.INF +
        scenario.impact.EN;


    let averageRisk = total / 5;


    // Calculate risk classification

    let risk = calculateRisk(averageRisk);



    // Update Risk Panel

    document.getElementById("risk").innerHTML =
    `
    Risk: ${risk}
    <br>
    SPD Risk Index: ${averageRisk.toFixed(1)}
    `;



    // Update Scenario Panel

    document.getElementById("scenario").innerHTML =
    `
    Scenario:
    <br>
    ${scenario.name}
    `;



    // Update Solution Options

    document.getElementById("solution").innerHTML =
    `
    ${scenario.solution.join("<br>")}
    `;


let action = document.getElementById("action");

if(action){

    action.innerHTML = scenario.solution
        .map((step, index) => `${index + 1}. ${step}`)
        .join("<br>");

}
    // Update Audit Record

    document.getElementById("audit").innerHTML =
    `
    SPD v13 AUDIT RECORD
    <br><br>

    SCENARIO:
    ${scenario.name}

    <br><br>

    SYSTEM IMPACT:
    <br>
    FX: ${scenario.impact.FX}
    <br>
    DC: ${scenario.impact.DC}
    <br>
    CYB: ${scenario.impact.CYB}
    <br>
    INF: ${scenario.impact.INF}
    <br>
    EN: ${scenario.impact.EN}

    <br><br>

    RISK:
    ${risk}

    <br><br>

    ACTION SEQUENCE:
    <br>
    ${scenario.solution.join("<br>")}

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


    document.getElementById("audit").innerHTML =
    "Waiting...";


    let log = document.getElementById("pipeline");

    if(log){
        log.innerHTML =
        "PIPELINE LOG ACTIVE";
    }

}