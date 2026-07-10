/*
=====================================================
SEXTANT PROTOCOL
ENGINE REGISTRY
Version: 1.3

Purpose:
Central module loader for Sextant simulation engines.

Connected Modules:
- Financial Resilience Engine
- Data Centre Resilience Engine
- Cyber Resilience Engine
- Infrastructure Resilience Engine
- Energy Resilience Engine
- Risk Classification Engine
- Golden Rule Governance

Governance:
Sextant Golden Rule
=====================================================
*/


/*
=====================================================
CORE MODULES
=====================================================
*/


const ENERGY_ENGINE =
require("./energy-engine");


const RISK_MODEL =
require("../risk-model");


const GOLDEN_RULE =
require("../GOLDEN_RULE");



/*
=====================================================
FUTURE MODULE CONNECTIONS
=====================================================
*/


/*

const FIN_ENGINE =
require("./fin-engine");


const DC_ENGINE =
require("./dc-engine");


const CYB_ENGINE =
require("./cyb-engine");


const INF_ENGINE =
require("./inf-engine");

*/



/*
=====================================================
ENGINE REGISTRY
=====================================================
*/


const ENGINE_REGISTRY = {


    engines:{


        ENERGY:

        ENERGY_ENGINE,


        RISK:

        RISK_MODEL,


        GOVERNANCE:

        GOLDEN_RULE


        // FIN: FIN_ENGINE,
        // DC: DC_ENGINE,
        // CYB: CYB_ENGINE,
        // INF: INF_ENGINE


    },





    modules:[


        {

            id:"EN",

            name:"Energy Resilience",

            engine:"ENERGY",

            rules:[

                "BIO-001",

                "BIO-002"

            ],

            status:"ACTIVE"

        },




        {

            id:"RISK",

            name:"Multi Domain Risk Classification",

            engine:"RISK",

            rules:[

                "FX",

                "DC",

                "CYB",

                "INF",

                "EN"

            ],

            status:"ACTIVE"

        },




        {

            id:"GOV",

            name:"Sextant Golden Rule Governance",

            engine:"GOVERNANCE",

            rules:[

                "CONTAINMENT",

                "STABILITY",

                "AUDIT"

            ],

            status:"ACTIVE"

        }



    ],





    getEngine(id){


        return this.engines[id];


    }





};






/*
=====================================================
EXPORT
=====================================================
*/


module.exports = ENGINE_REGISTRY;
