/*
 SEXTANT MEMORY CORE v1.0
 SPD v13 LEARNING ENGINE

 Purpose:
 - Compare previous scenarios
 - Identify repeated patterns
 - Provide explainable insights
 - Does not modify SPD rules
*/


const LearningEngine = {

    version: "LEARNING-ENGINE-v1.0",


    compare(current, history) {

        const result = {

            scenario:
                current.scenario,

            previousMatches: [],

            insight:
                "NO_PREVIOUS_PATTERN",

            timestamp:
                new Date().toISOString()

        };


        if (!history || history.length === 0) {

            return result;

        }


        history.forEach(record => {

            if (
                record.event &&
                record.event.scenario ===
                current.scenario
            ) {

                result.previousMatches.push(
                    record
                );

            }

        });


        if (
            result.previousMatches.length > 0
        ) {

            result.insight =
                "HISTORICAL_SCENARIO_FOUND";

        }


        return result;

    },


    calculateRiskTrend(events) {

        if (!events || events.length === 0) {

            return {

                trend:
                    "NO_DATA"

            };

        }


        let riskCount = 0;


        events.forEach(event => {

            if (
                event.event &&
                event.event.risk === "CRITICAL"
            ) {

                riskCount++;

            }

        });


        return {

            totalEvents:
                events.length,

            criticalEvents:
                riskCount,

            trend:
                riskCount > 0
                ? "ELEVATED"
                : "STABLE"

        };

    },


    generateInsight(data) {

        return {

            type:
                "EXPLAINABLE_ANALYSIS",

            source:
                data,

            message:
                "Scenario history analysed",

            timestamp:
                new Date().toISOString()

        };

    }

};


if (typeof module !== "undefined") {
    module.exports = Learning