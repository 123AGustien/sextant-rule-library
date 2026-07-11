/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 MEMORY BRIDGE

 Purpose:
 - Connect SPD v13 cockpit events
 - Send scenario data to Memory Core
 - Create audit trail entries
*/


const SPD13MemoryBridge = {

    version: "SPD13-BRIDGE-v1.0",


    captureScenario(
        scenario,
        domains,
        risk,
        action
    ) {

        const event = {

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

            timestamp:
                new Date().toISOString()

        };


        // Store in Memory Core
        if (
            typeof SextantMemoryCore !== "undefined"
        ) {

            SextantMemoryCore.saveEvent(
                event
            );

        }


        // Store audit record
        if (
            typeof AuditMemory !== "undefined"
        ) {

            AuditMemory.save(
                scenario,
                risk,
                action
            );

        }


        return event;

    },


    resetSystem() {

        return this.captureScenario(

            "RESET",

            {
                fx: 0,
                dc: 0,
                cyb: 0,
                inf: 0,
                en: 0
            },

            "LOW",

            "Normal operations continue"

        );

    }

};


if (typeof module !== "undefined") {

    module.exports = SPD13MemoryBridge;

}