/*
=====================================================
 SEXTANT PROTOCOL
 RESILIENCE RISK MODEL
 Version: 1.0
 Purpose:
 Multi-domain risk classification engine

 Domains:
 FX  Financial
 DC  Data Centre
 CYB Cyber
 INF Infrastructure
 EN  Energy

 Governance:
 Sextant Golden Rule
=====================================================
*/


const RISK_MODEL = {


    weights:{

        FX:0.20,

        DC:0.20,

        CYB:0.20,

        INF:0.20,

        EN:0.20

    },



    calculate(state){


        let score = 0;


        for(let domain in this.weights){


            score +=

            (state[domain] || 0)

            *

            this.weights[domain];


        }


        return {

            score:Number(score.toFixed(2)),

            level:this.classify(score)

        };


    },





    classify(score){


        if(score >= 75){

            return "CRITICAL";

        }


        if(score >= 50){

            return "HIGH";

        }


        if(score >= 30){

            return "MEDIUM";

        }


        return "LOW";


    },





    goldenRule(score){


        if(score >= 50){


            return {

                action:
                "CONTAINMENT PRIORITY",

                principle:
                "Protect system stability before optimization."

            };


        }


        return {


            action:
            "NORMAL OPERATION",


            principle:
            "System operating within resilience boundary."


        };


    }

};





if(typeof module !== "undefined"){

module.exports = RISK_MODEL;

}
