/*
=====================================================
🛰 SPD v13 // SEXTANT RESILIENCE COCKPIT PRO
Scenario Intensity Control Engine
Range: 0.0 - 1.0
=====================================================
*/

let scenarioIntensity = 1.0;


/*
-----------------------------------------------------
SET INTENSITY
-----------------------------------------------------
*/

function setIntensity(value){

    scenarioIntensity = parseFloat(value);

    if(scenarioIntensity < 0){
        scenarioIntensity = 0;
    }

    if(scenarioIntensity > 1){
        scenarioIntensity = 1;
    }


    let display = document.getElementById("intensityValue");

    if(display){

        display.innerHTML =
        "Intensity: " +
        (scenarioIntensity * 100).toFixed(0) +
        "%";

    }

}


/*
-----------------------------------------------------
APPLY INTENSITY TO IMPACT
-----------------------------------------------------
*/

function applyIntensity(value){

    return value * scenarioIntensity;

}