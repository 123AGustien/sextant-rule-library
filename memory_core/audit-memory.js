/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 AUDIT MEMORY MODULE

 Purpose:
 - Maintain SPD v13 audit records
 - Preserve scenario traceability
 - Support explainable review
*/


const AuditMemory = {

    version: "AUDIT-MEMORY-v1.0",

    records: [],


    createRecord(event, decision, action) {

        const record = {

            auditId:
                this.records.length + 1,

            system:
                "SPD v13",

            event:
                event,

            decision:
                decision,

            action:
                action,

            status:
                "RECORDED",

            timestamp:
                new Date().toISOString()

        };


        return record;

    },


    save(event, decision, action) {

        const record =
            this.createRecord(
                event,
                decision,
                action
            );


        this.records.push(record);


        return record;

    },


    getRecords() {

        return this.records;

    },


    latest() {

        if (this.records.length === 0) {

            return null;

        }


        return this.records[
            this.records.length - 1
        ];

    },


    exportAudit() {

        return JSON.stringify(
            this.records,
            null,
            2
        );

    },


    clear() {

        this.records = [];

    }

};


if (typeof module !== "undefined") {
    module.exports = AuditMemory;
}