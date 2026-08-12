/**
 * SPD v13.1 — BHR Rule Engine
 *
 * Business & Human Rights Resilience Domain
 *
 * Rules:
 * BHR-001 Business & Human Rights Stress
 * BHR-002 Labour Rights Event
 * BHR-003 Human Rights Event
 * BHR-004 Supply Chain Human Rights Event
 * BHR-005 Community Impact
 * BHR-006 Governance Risk
 *
 * Purpose:
 * Deterministic business and human rights resilience
 * simulation and assessment.
 *
 * Governance:
 * - AI provides decision support
 * - HUMAN_OPERATOR retains execution authority
 * - No autonomous execution is permitted
 * - Evaluation is deterministic
 * - All recommendations require human authorization
 */


/* =========================================================
   DOMAIN CONSTANTS
========================================================= */

const DOMAIN = "BHR";
const STATUS = "ACTIVE";
const VERSION = "1.0";
const PHI = 1.61803398875;


/* =========================================================
   RULE REGISTRY
========================================================= */

const RULES = {

  "BHR-001": {
    id: "BHR-001",
    scenario: "BHR_STRESS",
    name: "Business & Human Rights Stress",
    category: "BHR_GENERAL"
  },

  "BHR-002": {
    id: "BHR-002",
    scenario: "LABOUR_RIGHTS",
    name: "Labour Rights Event",
    category: "LABOUR_RIGHTS"
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
    name: "Supply Chain Human Rights Event",
    category: "SUPPLY_CHAIN"
  },

  "BHR-005": {
    id: "BHR-005",
    scenario: "COMMUNITY_IMPACT",
    name: "Community Impact",
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
   SAFE NUMBER
========================================================= */

function safeNumber(
  value,
  fallback = 0
) {

  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return fallback;

  }

  return Math.max(
    0,
    Math.min(
      100,
      number
    )
  );

}


/* =========================================================
   RULE RESOLUTION
========================================================= */

function resolveRule(
  scenario
) {

  const ruleId =
    SCENARIO_MAP[
      scenario
    ];

  if (!ruleId) {

    return {

      success: false,

      error:
        "BHR_SCENARIO_NOT_REGISTERED",

      scenario

    };

  }

  return {

    success: true,

    ruleId,

    rule:
      RULES[ruleId]

  };

}


/* =========================================================
   DOMAIN STATUS
========================================================= */

function getStatus() {

  return {

    id:
      DOMAIN,

    name:
      "Business & Human Rights Resilience",

    status:
      STATUS,

    version:
      VERSION,

    engineRegistered:
      true,

    ruleCount:
      Object.keys(RULES).length,

    rules:
      Object.keys(RULES),

    scenarios:
      Object.keys(SCENARIO_MAP),

    executionAuthority:
      "HUMAN_OPERATOR",

    humanAuthorizationRequired:
      true,

    autonomousExecution:
      false

  };

}


/* =========================================================
   STRESS CALCULATION
========================================================= */

function calculateStress(
  scenario,
  input = {}
) {

  const intensity =
    safeNumber(
      input.intensity,
      0
    );

  let values = [];


  switch (scenario) {

    /* -----------------------------------------------------
       BHR-001
    ----------------------------------------------------- */

    case "BHR_STRESS":

      values = [

        input.labour,
        input.humanRights,
        input.supplyChain,
        input.community,
        input.governance,
        input.environment,
        intensity

      ];

      break;


    /* -----------------------------------------------------
       BHR-002
    ----------------------------------------------------- */

    case "LABOUR_RIGHTS":

      values = [

        input.labourViolation,
        input.workerSafety,
        input.wageRisk,
        input.workingConditions,
        input.collectiveRights,
        input.discriminationRisk,
        intensity

      ];

      break;


    /* -----------------------------------------------------
       BHR-003
    ----------------------------------------------------- */

    case "HUMAN_RIGHTS_EVENT":

      values = [

        input.rightsViolation,
        input.affectedPeople,
        input.severity,
        input.remedyFailure,
        input.legalExposure,
        input.reputationalImpact,
        intensity

      ];

      break;


    /* -----------------------------------------------------
       BHR-004
    ----------------------------------------------------- */

    case "SUPPLY_CHAIN_HUMAN_RIGHTS":

      values = [

        input.supplierRisk,
        input.labourRisk,
        input.forcedLabourRisk,
        input.childLabourRisk,
        input.supplyChainVisibility,
        input.remediationFailure,
        intensity

      ];

      break;


    /* -----------------------------------------------------
       BHR-005
    ----------------------------------------------------- */

    case "COMMUNITY_IMPACT":

      values = [

        input.communityDisplacement,
        input.environmentalImpact,
        input.healthImpact,
        input.consultationFailure,
        input.grievanceRisk,
        input.socialConflict,
        intensity

      ];

      break;


    /* -----------------------------------------------------
       BHR-006
    ----------------------------------------------------- */

    case "GOVERNANCE_RISK":

      values = [

        input.policyFailure,
        input.oversightFailure,
        input.complianceFailure,
        input.transparencyRisk,
        input.accountabilityFailure,
        input.escalationFailure,
        intensity

      ];

      break;


    default:

      values = [
        intensity
      ];

  }


  const validValues =
    values.map(
      value =>
        safeNumber(value)
    );


  if (
    validValues.length === 0
  ) {

    return 0;

  }


  const total =
    validValues.reduce(
      (
        sum,
        value
      ) =>
        sum + value,
      0
    );


  return Number(
    (
      total /
      validValues.length
    ).toFixed(3)
  );

}


/* =========================================================
   RISK CLASSIFICATION
========================================================= */

function classifyRisk(
  stress
) {

  if (
    stress < 30
  ) {

    return "GREEN";

  }

  if (
    stress < 50
  ) {

    return "YELLOW";

  }

  if (
    stress < 70
  ) {

    return "ORANGE";

  }

  return "RED";

}


/* =========================================================
   RESILIENCE CALCULATION
========================================================= */

function calculateResilience(
  stress
) {

  const goldenScore =
    stress *
    (
      1 /
      PHI
    );

  const resilienceScore =
    100 -
    goldenScore;

  return Number(
    Math.max(
      0,
      Math.min(
        100,
        resilienceScore
      )
    ).toFixed(3)
  );

}


/* =========================================================
   CASCADE GENERATION
========================================================= */

function generateCascade(
  ruleId,
  risk
) {

  const cascades = {

    "BHR-001": [

      "BHR Stress Detected",
      "Stakeholder Impact",
      "Operational Risk",
      "Reputational Exposure",
      "Cross-Domain Resilience Risk"

    ],

    "BHR-002": [

      "Labour Rights Concern",
      "Worker Impact",
      "Industrial Relations Stress",
      "Operational Disruption",
      "Reputational / Legal Exposure"

    ],

    "BHR-003": [

      "Human Rights Event",
      "Affected Stakeholder Impact",
      "Remedy Requirement",
      "Legal / Regulatory Exposure",
      "Reputational Risk"

    ],

    "BHR-004": [

      "Supply Chain Human Rights Risk",
      "Supplier Exposure",
      "Production / Service Disruption",
      "Reputational Exposure",
      "Cross-Domain Systemic Risk"

    ],

    "BHR-005": [

      "Community Impact",
      "Stakeholder Conflict",
      "Operational Disruption",
      "Environmental / Social Exposure",
      "Cross-Domain Systemic Risk"

    ],

    "BHR-006": [

      "Governance Weakness",
      "Oversight Failure",
      "Compliance Exposure",
      "Stakeholder Trust Degradation",
      "Systemic Governance Risk"

    ]

  };


  return {

    severity:
      risk,

    cascade:
      risk === "GREEN"
        ? []
        : (
          cascades[ruleId] ||
          []
        ),

    crossDomainImpact: [

      "BHR",
      "FIN",
      "INF",
      "CYB"

    ]

  };

}


/* =========================================================
   CONTINGENCY ACTIONS
========================================================= */

function getContingencyActions(
  ruleId,
  risk
) {

  if (
    risk === "GREEN"
  ) {

    return [

      "Continue normal monitoring",
      "Maintain stakeholder monitoring",
      "Review resilience indicators"

    ];

  }


  const actions = {

    "BHR-001": [

      "Initiate BHR assessment",
      "Identify affected stakeholders",
      "Review applicable policies and controls",
      "Assess remediation requirements",
      "Escalate according to governance procedures"

    ],

    "BHR-002": [

      "Assess worker safety and labour conditions",
      "Engage appropriate labour stakeholders",
      "Review employment and labour-rights controls",
      "Implement corrective and remediation measures",
      "Escalate according to governance procedures"

    ],

    "BHR-003": [

      "Protect affected persons",
      "Initiate human rights impact assessment",
      "Preserve relevant evidence and records",
      "Establish appropriate remediation pathway",
      "Escalate to competent governance authority"

    ],

    "BHR-004": [

      "Assess affected suppliers",
      "Review supply-chain human rights controls",
      "Verify supplier remediation measures",
      "Consider controlled supplier suspension where appropriate",
      "Escalate material findings through governance channels"

    ],

    "BHR-005": [

      "Assess affected communities",
      "Engage appropriate community stakeholders",
      "Review environmental and social impacts",
      "Establish appropriate grievance and remediation processes",
      "Escalate material community impacts"

    ],

    "BHR-006": [

      "Review governance controls",
      "Assess oversight and accountability gaps",
      "Verify compliance obligations",
      "Strengthen monitoring and reporting",
      "Escalate material governance failures"

    ]

  };


  return (
    actions[ruleId] ||
    [

      "Increase monitoring",
      "Assess BHR resilience",
      "Escalate according to governance procedures"

    ]
  );

}


/* =========================================================
   MAIN EVALUATION
========================================================= */

function evaluate(
  scenario,
  input = {}
) {

  const resolution =
    resolveRule(
      scenario
    );


  if (
    !resolution.success
  ) {

    return resolution;

  }


  const stress =
    calculateStress(
      scenario,
      input
    );


  const goldenScore =
    Number(
      (
        stress *
        (
          1 /
          PHI
        )
      ).toFixed(3)
    );


  const resilienceScore =
    calculateResilience(
      stress
    );


  const risk =
    classifyRisk(
      stress
    );


  const cascade =
    generateCascade(
      resolution.ruleId,
      risk
    );


  const contingencyActions =
    getContingencyActions(
      resolution.ruleId,
      risk
    );


  const timestamp =
    new Date().toISOString();


  return {

    success:
      true,

    domain:
      DOMAIN,

    scenario,

    rule:
      resolution.rule,

    assessment: {

      stress,

      goldenScore,

      resilienceScore,

      risk

    },

    cascade,

    contingencyActions,

    decision: {

      recommendation:
        risk === "GREEN"
          ? "MAINTAIN_NORMAL_OPERATION"
          : "INITIATE_BHR_RESILIENCE_RESPONSE",

      recommendedAction:
        contingencyActions[0],

      executionAuthority:
        "HUMAN_OPERATOR",

      executionStatus:
        "HUMAN_AUTHORIZATION_REQUIRED"

    },

    governance: {

      humanAuthorizationRequired:
        true,

      autonomousExecution:
        false,

      executionAuthority:
        "HUMAN_OPERATOR"

    },

    audit: {

      engine:
        "BHRRuleEngine",

      domain:
        DOMAIN,

      ruleId:
        resolution.ruleId,

      scenario,

      risk,

      stress,

      goldenScore,

      resilienceScore,

      timestamp

    }

  };

}


/* =========================================================
   PUBLIC API
========================================================= */

module.exports = {

  DOMAIN,

  STATUS,

  VERSION,

  PHI,

  RULES,

  SCENARIO_MAP,

  getStatus,

  resolveRule,

  evaluate,

  classifyRisk,

  calculateStress,

  calculateResilience,

  generateCascade,

  getContingencyActions

};