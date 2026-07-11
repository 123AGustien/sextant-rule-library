/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 SCENARIO MEMORY MODULE

 Purpose:
 - Track scenario lifecycle
 - Store scenario progression
 - Support replay and review
*/


const ScenarioMemory = {

    version: "SCENARIO-MEMORY-v1.0",

    scenarios: [],


    startScenario(name) {

        const scenario = {

            id: this.scenarios.length + 1,

            name: name,

            status: "STARTED",

            timeline: [],

            startTime: new Date().toISOString()

        };


        this.scenarios.push(scenario);

        return scenario;

    },


    addStep(id, stage, data) {

        const scenario =
            this.scenarios.find(
                item => item.id === id
            );


        if (!scenario) {

            return null;

        }


        scenario.timeline.push({

            stage: stage,

            data: data,

            timestamp:
                new Date().toISOString()

        });


        return scenario;

    },


    completeScenario(id, result) {

        const scenario =
            this.scenarios.find(
                item => item.id === id
            );


        if (!scenario) {

            return null;

        }


        scenario.status = "COMPLETED";

        scenario.result = result;

        scenario.endTime =
            new Date().toISOString();


        return scenario;

    },


    getHistory() {

        return this.scenarios;

    },


    clear() {

        this.scenarios = [];

    }

};


if (typeof module !== "undefined") {
    module.exports = ScenarioMemory;
}