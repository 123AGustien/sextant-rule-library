/**
 * SPD v13.1 — BHR RULE ENGINE
 *
 * Business & Human Rights Resilience Domain
 *
 * Rule Engine Flow:
 *
 * Domain Integration
 *      ↓
 * BHR Rule Engine
 *      ↓
 * Deterministic Assessment
 *      ↓
 * Risk / Resilience
 *      ↓
 * Decision Support
 *      ↓
 * Human Authorization Gate
 *      ↓
 * Audit
 *
 * Governance:
 * - AI provides decision support
 * - HUMAN_OPERATOR retains execution authority
 * - No autonomous recovery execution is permitted
 * - Evaluation is deterministic
 */


/* =========================================================
   BHR CONSTANTS
========================================================= */

const BHR_CONSTANTS = {

  DOMAIN: "BHR",

  DOMAIN_NAME:
    "Business & Human Rights Resilience",

  STATUS: "ACTIVE",

  VERSION: "1.0",

  MEDIUM_THRESHOLD: 40,

  HIGH_THRESHOLD: 70,

  MAX_SCORE: 100,

  MIN_SCORE: 0

};


/* =========================================================
   BHR RULE REGISTRY
========================================================= */

const RULES = {

  "BHR-001": {
    id: "BHR-001",
    scenario: "BHR_STRESS",
    name: "Business & Human Rights Stress",
    category: "GENERAL_BHR"
  },

  "BHR-002": {
    id: "BHR-002",
    scenario: "LABOUR_RIGHTS",
    name: "Labour Rights Risk",
    category: "LABOUR"
  },

  "BHR-003": {
    id: "BHR-003",
    scenario: "HUMAN_RIGHTS_EVENT",
    name: "Human Rights Event",
    category: "HUMAN_RIGHTS"
  },

  "BHR-004": {
    id: "BHR-004",
    scenario: "SUPPLY_CHAIN_HUMAN_RIGHTS",
    name: "Supply Chain Human Rights Risk",
    category: "SUPPLY_CHAIN"
  },

  "BHR-005": {
    id: "BHR-005",
    scenario: "COMMUNITY_IMPACT",
    name: "Community Impact Risk",
    category: "COMMUNITY"
  },

  "BHR-006": {
    id: "BHR-006",
    scenario: "GOVERNANCE_RISK",
    name: "Governance Risk",
    category: "GOVERNANCE"
  }

};


/* =========================================================
   SCENARIO MAP
========================================================= */

const SCENARIO_MAP = {

  BHR_STRESS:
    "BHR-001",

  LABOUR_RIGHTS:
    "BHR-002",

  HUMAN_RIGHTS_EVENT:
    "BHR-003",

  SUPPLY_CHAIN_HUMAN_RIGHTS:
    "BHR-004",

  COMMUNITY_IMPACT:
    "BHR-005",

  GOVERNANCE_RISK:
    "BHR-006"

};


/* =========================================================
   CLAMP VALUE
========================================================= */

function clamp(
  value,
  min = BHR_CONSTANTS.MIN_SCORE,
  max = BHR_CONSTANTS.MAX_SCORE
) {

  const numeric =
    Number(value);

  if (
    !Number.isFinite(numeric)
  ) {

    return min;

  }

  return Math.min(
    max,
    Math.max(
      min,
      numeric
    )
  );

}


/*
