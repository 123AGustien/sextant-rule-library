function calculateRisk(score){

if(score < 30){
return "LOW";
}

if(score < 60){
return "MEDIUM";
}

if(score < 80){
return "HIGH";
}

return "CRITICAL";

}