/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 DISPLAY PANEL

 Purpose:
 - Show memory status on cockpit
 - Display stored events
 - Show latest audit state
*/


const MemoryPanel = {


    version: "MEMORY-PANEL-v1.0",


    render() {


        let events = [];


        if (
            typeof SextantMemoryCore !== "undefined"
        ) {

            events =
                SextantMemoryCore.loadEvents();

        }


        const latest =
            events.length > 0
            ? events[events.length - 1]
            : null;


        const panel = {

            title:
                "🧠 MEMORY CORE",

            eventsStored:
                events.length,

            lastScenario:
                latest
                ? latest.event.scenario
                : "NONE",

            lastRisk:
                latest
                ? latest.event.risk
                : "LOW",

            auditStatus:
                latest
                ? "ACTIVE"
                : "WAITING"

        };


        return panel;

    }

};


if (typeof module !== "undefined") {

    module.exports = MemoryPanel;

}