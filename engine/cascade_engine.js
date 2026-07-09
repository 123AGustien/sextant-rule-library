/*
 SEXTANT PROTOCOL
 SPD v13 CASCADE ENGINE
 Systemic Risk Propagation Layer
*/


const CascadeEngine = {


analyse(event){

let result = {

event:event,

path:[],

severity:0

};



switch(event){


case "FX":


result.path = [

"FX VOLATILITY",

"LIQUIDITY PRESSURE",

"BANKING EXPOSURE",

"DC OPERATIONAL LOAD",

"CONFIDENCE IMPACT"

];


result.severity = 35;


break;




case "INF":


result.path=[

"INFRASTRUCTURE FAILURE",

"POWER AVAILABILITY",

"DATA CENTRE LOAD",

"SERVICE INTERRUPTION",

"RECOVERY MODE"

];


result.severity=60;


break;




case "CYB":


result.path=[

"CYBER EVENT",

"SYSTEM ISOLATION",

"SECURITY RESPONSE",

"SERVICE PROTECTION",

"RESTORATION"

];


result.severity=50;


break;



default:


result.path=[

"NORMAL OPERATION"

];


result.severity=0;


}



return result;


}


};