/*
 SPD v13 SCENARIO MEMORY CONNECTOR

 Connects:
 SPD_SCENARIOS
        |
        v
 Memory Core
        |
        v
 Audit Record
*/


function executeSPD13Scenario(
    scenarioKey
) {

    const scenario =
        SPD_SCENARIOS[scenarioKey];


    if (!scenario) {

        console.error(
            "Scenario not found:",
            scenarioKey
        );

        return null;

    }


    const impact =
        scenario.impact;


    const risk =
        calculateSPD13Risk(
            impact
        );


    const action =
        scenario.solution.join(
            " | "
        );


    const record = {

        scenario:
            scenario.name,

        domains: {

            fx: impact.FX / 100,
            dc: impact.DC / 100,
            cyb: impact.CYB / 100,
            inf: impact.INF / 100,
            en: impact.EN / 100

        },

        risk:
            risk,

        action:
            action

    };


    if (
        typeof SPD13MemoryBridge !== "undefined"
    ) {

        SPD13MemoryBridge.captureScenario(

            record.scenario,

            record.domains,

            record.risk,

            record.action

        );

    }


    return record;

}



function calculateSPD13Risk(
    impact
) {

    const total =
        impact.FX +
        impact.DC +
        impact.CYB +
        impact.INF +
        impact.EN;


    const average =
        total / 5;


    if (average >= 70) {

        return "CRITICAL";

    }


    if (average >= 40) {

        return "WARNING";

    }


    return "LOW";

}