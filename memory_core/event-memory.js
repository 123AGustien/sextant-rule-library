/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 EVENT MEMORY MODULE

 Purpose:
 - Capture SPD v13 scenario events
 - Store domain status
 - Link scenario actions to memory
*/


const EventMemory = {

    version: "EVENT-MEMORY-v1.0",


    createEvent(scenario, domains, risk, action) {

        return {

            type: "SPD13_SCENARIO_EVENT",

            scenario: scenario,

            domains: {

                FX: domains.fx || 0,

                DC: domains.dc || 0,

                CYB: domains.cyb || 0,

                INF: domains.inf || 0,

                EN: domains.en || 0

            },

            risk: risk,

            action: action,

            timestamp: new Date().toISOString()

        };

    },


    record(scenario, domains, risk, action) {

        const event = this.createEvent(
            scenario,
            domains,
            risk,
            action
        );


        if (typeof SextantMemoryCore !== "undefined") {

            return SextantMemoryCore.saveEvent(
                event
            );

        }


        return event;

    },


    classifyRisk(domains) {

        const total =
            (domains.fx || 0) +
            (domains.dc || 0) +
            (domains.cyb || 0) +
            (domains.inf || 0) +
            (domains.en || 0);


        if (total >= 4) {

            return "CRITICAL";

        }


        if (total >= 2) {

            return "WARNING";

        }


        return "LOW";

    }

};


if (typeof module !== "undefined") {
    module.exports = EventMemory;
}