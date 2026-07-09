/*
=====================================================
SEXTANT PROTOCOL
ENGINE REGISTRY
Version: 1.2

Purpose:
Central module loader for Sextant simulation engines.

Connected Modules:
- Financial Resilience Engine
- Data Centre Resilience Engine
- Cyber Resilience Engine
- Infrastructure Resilience Engine
- Energy Resilience Engine

Governance:
Sextant Golden Rule
=====================================================
*/


/* ENERGY MODULE */

const ENERGY_ENGINE = require("./energy-engine");



/* FUTURE MODULE CONNECTIONS */

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



const ENGINE_REGISTRY = {


    engines:{


        ENERGY:

        ENERGY_ENGINE


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
