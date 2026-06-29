/****************************************
 * SPD v11 AUDIT ENGINE
 ****************************************/

window.auditLog = window.auditLog || [];

/* ==========================
   AUDIT RECORDER
========================== */

window.audit = function(type, data) {

    const entry = {

        id: window.auditLog.length + 1,

        time: new Date().toISOString(),

        severity: getSeverity(type),

        type: type,

        data: data

    };

    window.auditLog.push(entry);

    updateAuditSummary();

};

/* ==========================
   SEVERITY
========================== */

function getSeverity(type){

    switch(type){

        case "SYSTEM_BOOT":
            return "INFO";

        case "SCENARIO":
            return "MEDIUM";

        case "EVENT":
            return "HIGH";

        case "DEPENDENCY_BOOT":
            return "INFO";

        default:
            return "LOW";

    }

}

/* ==========================
   SHOW LOG
========================== */

window.showAudit=function(){

    const audit=document.getElementById("audit");

    if(!audit) return;

    if(window.auditLog.length===0){

        audit.textContent="No audit records.";

        return;

    }

    audit.textContent=
        JSON.stringify(
            window.auditLog,
            null,
            2
        );

};

/* ==========================
   CLEAR LOG
========================== */

window.clearAudit=function(){

    window.auditLog=[];

    const audit=document.getElementById("audit");

    if(audit)
        audit.textContent="Audit log cleared.";

    updateAuditSummary();

};

/* ==========================
   SUMMARY
========================== */

function updateAuditSummary(){

    const diag=document.getElementById("diag");

    if(!diag) return;

    const total=window.auditLog.length;

    const events=
        window.auditLog.filter(
            x=>x.type==="EVENT"
        ).length;

    const scenarios=
        window.auditLog.filter(
            x=>x.type==="SCENARIO"
        ).length;

    diag.innerHTML=
`System Diagnostics

Audit Entries : ${total}

Scenario Runs : ${scenarios}

Injected Events : ${events}

Status : ACTIVE`;

}

/* ==========================
   EXPORT
========================== */

window.exportAudit=function(){

    const blob=new Blob(

        [
            JSON.stringify(
                window.auditLog,
                null,
                2
            )
        ],

        {
            type:"application/json"
        }

    );

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="spd-audit-log.json";

    link.click();

};

/* ==========================
   INITIALISE
========================== */

document.addEventListener("DOMContentLoaded",function(){

    updateAuditSummary();

});