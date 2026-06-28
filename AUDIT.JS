
let auditLog = [];

function audit(type, data) {
  auditLog.push({
    time: new Date().toISOString(),
    type,
    data
  });
}function audit(type, data) {
  auditLog.push({
    time: new Date().toISOString(),
    type,
    data
  });
}

function showAudit() {
  document.getElementById("audit").textContent =
    JSON.stringify(auditLog, null, 2);
}

function clearAudit() {
  auditLog = [];
  document.getElementById("audit").textContent = "CLEARED";
}
