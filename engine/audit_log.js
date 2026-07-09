/*
 SEXTANT PROTOCOL
 SPD v13 AUDIT LOG ENGINE
 Simulation Recording Layer
*/


const AuditLog = {


records:[],



add(entry){


const record = {


time:new Date().toLocaleTimeString(),

scenario:entry.scenario,

cascade:entry.cascade,

risk:entry.risk,

containment:entry.containment,

actions:entry.actions


};



this.records.push(record);


return record;


},




latest(){


if(this.records.length===0){

return null;

}


return this.records[
this.records.length-1
];


},




display(){


let html="";


this.records.forEach((r)=>{


html += `

<div class="output">

<b>TIME:</b> ${r.time}<br>

<b>SCENARIO:</b> ${r.scenario}<br>

<b>CASCADE:</b><br>

${r.cascade.join(" → ")}<br><br>


<b>RISK:</b> ${r.risk}<br>

<b>CONTAINMENT:</b> ${r.containment}<br><br>


<b>ACTIONS:</b><br>

${r.actions.join("<br>")}

</div>

`;


});


return html;


}


};