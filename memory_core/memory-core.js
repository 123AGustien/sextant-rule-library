/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 RESILIENCE COCKPIT PRO

 Purpose:
 - Store scenario history
 - Connect with audit records
 - Preserve operational events
*/

const SextantMemoryCore = {

    version: "SMC-v1.0",

    storageKey: "spd_v13_memory",


    saveEvent(event) {

        let history = this.loadEvents();

        const record = {

            id: history.length + 1,

            timestamp: new Date().toISOString(),

            system: "SPD v13",

            event: event

        };


        history.push(record);


        localStorage.setItem(
            this.storageKey,
            JSON.stringify(history)
        );


        return record;

    },


    loadEvents() {

        const data = localStorage.getItem(
            this.storageKey
        );


        return data
            ? JSON.parse(data)
            : [];

    },


    latest() {

        const history = this.loadEvents();


        if (history.length === 0) {
            return null;
        }


        return history[
            history.length - 1
        ];

    },


    exportMemory() {

        return JSON.stringify(
            this.loadEvents(),
            null,
            2
        );

    },


    clearMemory() {

        localStorage.removeItem(
            this.storageKey
        );

    }

};


if (typeof module !== "undefined") {
    module.exports = SextantMemoryCore;
}