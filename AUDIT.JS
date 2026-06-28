let auditLog = [];

function audit(type, data) {
  auditLog.push({
    time: new Date().toISOString(),
    type,
    data
  });
}

function showAudit() {
  const el = document.getElementById("audit");
  if (!el) return;

  el.textContent = JSON.stringify(auditLog, null, 2);
}

function clearAudit() {
  auditLog = [];

  const el = document.getElementById("audit");
  if (el) el.textContent = "CLEARED";
}