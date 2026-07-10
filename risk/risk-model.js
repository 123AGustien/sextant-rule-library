/*
=====================================================
SEXTANT PROTOCOL

RESILIENCE RISK MODEL

File:
risk/risk-model.js

Version:
1.2

Purpose:
Multi-domain deterministic risk classification engine

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

export function riskModel(state = {}) {

  const fx  = Number(state.fx || 0);
  const dc  = Number(state.dc || 0);
  const cyb = Number(state.cyb || 0);
  const inf = Number(state.inf || 0);
  const en  = Number(state.en || 0);

  const score = fx + dc + cyb + inf + en;

  let level = "LOW";

  if (score >= 200) {
    level = "CRITICAL";
  } else if (score >= 120) {
    level = "HIGH";
  } else if (score >= 60) {
    level = "MEDIUM";
  }

  return {
    riskScore: score,
    riskLevel: level,
    domains: {
      FX: fx,
      DC: dc,
      CYB: cyb,
      INF: inf,
      EN: en
    },
    timestamp: new Date().toISOString()
  };
}