/*
=====================================================
SEXTANT PROTOCOL
ENGINE REGISTRY
Version: 1.1

Purpose:
Central module loader for Sextant simulation engines.

Connected Modules:
- Energy Resilience Engine
- BIO-001 Biodiesel Supply Stress
- BIO-002 Biodiesel Shortage Scenario
- Golden Rule Governance
=====================================================
*/


const ENERGY_ENGINE = require("../energy-engine");



const ENGINE_REGISTRY = {


    ENERGY_ENGINE: ENERGY_ENGINE,


    modules:[

        {

            id:"EN",

            name:"Energy Resilience",

            engine:"ENERGY_ENGINE",

            rules:[

                "BIO-001",

                "BIO-002"

            ],

            status:"ACTIVE"

        }

    ]



};





/*
=====================================================
EXPORT
=====================================================
*/


module.exports = ENGINE_REGISTRY;
