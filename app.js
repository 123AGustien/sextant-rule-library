/*
=====================================================
🛰 SPD v13 // SEXTANT RESILIENCE COCKPIT PRO
Application Controller
Full Simulation Engine
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



    // Update System Domain Monitor

    document.getElementById("fx").innerHTML = FX.toFixed(1);

    document.getElementById("dc").innerHTML = DC.toFixed(1);

    document.getElementById("cyb").innerHTML = CYB.toFixed(1);

    document.getElementById("inf").innerHTML = INF.toFixed(1);

    document.getElementById("en").innerHTML = EN.toFixed(1);



    // Calculate Risk Index

    let total =
        FX +
        DC +
        CYB +
        INF +
        EN;


    let averageRisk = total / 5;



    // Risk Classification

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

    <br><br>

    Intensity:
    ${(scenarioIntensity * 100).toFixed(0)}%
    `;



    // Solution Options

    document.getElementById("solution").innerHTML =
    scenario.solution
    .map((s,i)=>`${i+1}. ${s}`)
    .join("<br>");



    // Action Sequence Prompt

    let action = document.getElementById("action");

    if(action){

        action.innerHTML =
        scenario.solution
        .map((step,index)=>
        `${index+1}. ${step}`)
        .join("<br>");

    }

// Golden Rule Engine

let golden = document.getElementById("golden");

if(golden){

    golden.innerHTML =
    `
    OBSERVE ✅
    <br>
    VERIFY ✅
    <br>
    ASSESS ✅
    <br>
    DECIDE ✅
    <br>
    ACT ⏳
    <br>
    UPDATE ✅
    `;

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
        [SPD v13] Domain Impact Updated

        <br>
        [SPD v13] Risk Calculation Complete

        <br>
        [SPD v13] Decision Support Generated
        `;

    }



    // 🧠 MEMORY CORE BRIDGE

    if(typeof SPD13MemoryBridge !== "undefined"){

        SPD13MemoryBridge.captureScenario(

            scenario.name,

            {
                fx: FX,
                dc: DC,
                cyb: CYB,
                inf: INF,
                en: EN
            },

            risk,

            scenario.solution

        );


        if(log){

            log.innerHTML +=
            `
            <br>
            [SPD v13] Memory Core Event Stored
            `;

        }

    }




    }

}   // closes runScenario()


/*
=====================================================
RESET FUNCTION
=====================================================
*/



function resetSystem(){


    document.getElementById("fx").innerHTML = "0";

    document.getElementById("dc").innerHTML = "0";

    document.getElementById("cyb").innerHTML = "0";

    document.getElementById("inf").innerHTML = "0";

    document.getElementById("en").innerHTML = "0";



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