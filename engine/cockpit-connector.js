/*
=====================================================
SEXTANT PROTOCOL
SPD v13 COCKPIT CONNECTOR
Version: 1.0

Purpose:
Connect UI cockpit with engine registry.

Modules:
- Energy Resilience
- Risk Model
- Golden Rule

Governance:
Sextant Golden Rule
=====================================================
*/


const ENGINE_REGISTRY =
require("./index");



const COCKPIT = {



    runEnergyScenario(event){


        const energy =
        ENGINE_REGISTRY.getEngine("ENERGY");



        if(!energy){


            return {

                status:"ERROR",

                message:
                "ENERGY ENGINE NOT AVAILABLE"

            };

        }



        let result =
        energy.inject(event);



        const risk =
        ENGINE_REGISTRY
        .getEngine("RISK")
        .calculate({

            EN:result.riskScore

        });



        return {


            energy:result,


            risk:risk,


            goldenRule:
            risk.goldenRule,


            audit:

            ENGINE_REGISTRY
            .getEngine("RISK")
            .audit({

                EN:result.riskScore

            })


        };


    }



};





module.exports = COCKPIT;
