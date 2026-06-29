
/****************************************
 * SPD REGULATORY SANDBOX REPORT ENGINE
 ****************************************/

window.generateSandboxReport = function () {

    const state = window.state;
    const logs = window.auditLog || [];

    const score = window.calculateScore
        ? window.calculateScore()
        : "N/A";

    const report = {
        meta: {
            system: "SPD Sandbox Simulation Engine",
            version: "v12-report-layer",
            timestamp: new Date().toISOString()
        },

        summary: {
            resilience_score: score,
            fx_exposure: state.FX,
            infrastructure_risk: state.INF,
            cyber_risk: state.CYB,
            datacentre_risk: state.DC
        },

        risk_assessment: {
            level: getRiskLevel(score),
            interpretation: interpret(score)
        },

        event_history: logs,

        cascade_notes: generateCascadeNotes(state),

        conclusion: generateConclusion(score)
    };

    return report;
};