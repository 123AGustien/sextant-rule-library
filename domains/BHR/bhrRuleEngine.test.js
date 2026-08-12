/**
 * SPD v13.1 — BHR Rule Engine Validation
 *
 * File:
 * domains/BHR/bhrRuleEngine.test.js
 *
 * Tests BHR-001 through BHR-006.
 *
 * Purpose:
 * Verify:
 * - BHR domain registration
 * - Rule registration
 * - Scenario mapping
 * - Unknown scenario rejection
 * - Deterministic evaluation
 * - Risk classification
 * - Resilience calculation
 * - Cascade generation
 * - Contingency actions
 * - Human authorization
 * - Autonomous execution disabled
 * - Audit output
 * - Repeatability
 */

const BHRRuleEngine =
  require("./bhrRuleEngine");

let passed = 0;
let failed = 0;


/* =========================================================
   ASSERTION
========================================================= */

function assert(
  condition,
  message
) {

  if (condition) {

    console.log(
      "PASS:",
      message
    );

    passed++;

  } else {

    console.error(
      "FAIL:",
      message
    );

    failed++;

  }

}


/* =========================================================
   TEST 1 — DOMAIN REGISTRATION
========================================================= */

console.log(
  "\nTEST 1 — BHR DOMAIN STATUS"
);

const status =
  BHRRuleEngine.getStatus();

assert(
  status.id === "BHR",
  "BHR domain registered"
);

assert(
  status.status === "ACTIVE",
  "BHR domain ACTIVE"
);

assert(
  status.engineRegistered === true,
  "BHR engine registered"
);

assert(
  status.ruleCount === 6,
  "Six BHR rules registered"
);

assert(
  status.humanAuthorizationRequired === true,
  "Human authorization required"
);

assert(
  status.autonomousExecution === false,
  "Autonomous execution disabled"
);


/* =========================================================
   TEST 2 — RULE MAPPING
========================================================= */

console.log(
  "\nTEST 2 — RULE MAPPING"
);

const expectedMappings = {

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

Object.entries(
  expectedMappings
).forEach(
  ([scenario, expectedRule]) => {

    const result =
      BHRRuleEngine.resolveRule(
        scenario
      );

    assert(
      result.success === true,
      `${scenario} resolves successfully`
    );

    assert(
      result.ruleId === expectedRule,
      `${scenario} maps to ${expectedRule}`
    );

  }
);


/* =========================================================
   TEST 3 — UNKNOWN SCENARIO
========================================================= */

console.log(
  "\nTEST 3 — UNKNOWN SCENARIO"
);

const unknown =
  BHRRuleEngine.resolveRule(
    "UNKNOWN_BHR_SCENARIO"
  );

assert(
  unknown.success === false,
  "Unknown BHR scenario rejected"
);

assert(
  unknown.error ===
    "BHR_SCENARIO_NOT_REGISTERED",
  "Correct rejection code returned"
);


/* =========================================================
   TEST 4 — BHR-001 GENERAL BHR STRESS
========================================================= */

console.log(
  "\nTEST 4 — BHR-001 BHR STRESS"
);

const bhrResult =
  BHRRuleEngine.evaluate(
    "BHR_STRESS",
    {

      labour: 70,

      humanRights: 65,

      supplyChain: 60,

      community: 55,

      governance: 50,

      environment: 45,

      intensity: 80

    }
  );

assert(
  bhrResult.success === true,
  "BHR-001 evaluation successful"
);

assert(
  bhrResult.rule.id ===
    "BHR-001",
  "BHR-001 selected"
);

assert(
  bhrResult.domain === "BHR",
  "BHR domain confirmed"
);

assert(
  typeof
    bhrResult.assessment.stress ===
    "number",
  "BHR stress generated"
);

assert(
  typeof
    bhrResult.assessment.resilienceScore ===
    "number",
  "BHR resilience score generated"
);

assert(
  Array.isArray(
    bhrResult.cascade.cascade
  ),
  "BHR cascade generated"
);

assert(
  Array.isArray(
    bhrResult.contingencyActions
  ),
  "BHR contingency actions generated"
);


/* =========================================================
   TEST 5 — BHR-002 LABOUR RIGHTS
========================================================= */

console.log(
  "\nTEST 5 — BHR-002 LABOUR RIGHTS"
);

const labourResult =
  BHRRuleEngine.evaluate(
    "LABOUR_RIGHTS",
    {

      labourViolation: 80,

      workerSafety: 85,

      wageRisk: 70,

      workingConditions: 75,

      collectiveRights: 65,

      discriminationRisk: 60,

      intensity: 90

    }
  );

assert(
  labourResult.success === true,
  "BHR-002 evaluation successful"
);

assert(
  labourResult.rule.id ===
    "BHR-002",
  "BHR-002 selected"
);

assert(
  labourResult.scenario ===
    "LABOUR_RIGHTS",
  "Labour Rights scenario confirmed"
);

assert(
  labourResult.decision.executionAuthority ===
    "HUMAN_OPERATOR",
  "Labour Rights execution authority is human"
);


/* =========================================================
   TEST 6 — BHR-003 HUMAN RIGHTS EVENT
========================================================= */

console.log(
  "\nTEST 6 — BHR-003 HUMAN RIGHTS EVENT"
);

const humanRightsResult =
  BHRRuleEngine.evaluate(
    "HUMAN_RIGHTS_EVENT",
    {

      rightsViolation: 90,

      affectedPeople: 85,

      severity: 90,

      remedyFailure: 75,

      legalExposure: 80,

      reputationalImpact: 70,

      intensity: 95

    }
  );

assert(
  humanRightsResult.success === true,
  "BHR-003 evaluation successful"
);

assert(
  humanRightsResult.rule.id ===
    "BHR-003",
  "BHR-003 selected"
);

assert(
  humanRightsResult.governance
    .humanAuthorizationRequired === true,
  "Human Rights action requires authorization"
);


/* =========================================================
   TEST 7 — BHR-004 SUPPLY CHAIN
========================================================= */

console.log(
  "\nTEST 7 — BHR-004 SUPPLY CHAIN HUMAN RIGHTS"
);

const supplyChainResult =
  BHRRuleEngine.evaluate(
    "SUPPLY_CHAIN_HUMAN_RIGHTS",
    {

      supplierRisk: 80,

      labourRisk: 75,

      forcedLabourRisk: 85,

      childLabourRisk: 70,

      supplyChainVisibility: 65,

      remediationFailure: 80,

      intensity: 90

    }
  );

assert(
  supplyChainResult.success === true,
  "BHR-004 evaluation successful"
);

assert(
  supplyChainResult.rule.id ===
    "BHR-004",
  "BHR-004 selected"
);

assert(
  supplyChainResult.audit.ruleId ===
    "BHR-004",
  "Supply chain rule recorded in audit"
);


/* =========================================================
   TEST 8 — BHR-005 COMMUNITY IMPACT
========================================================= */

console.log(
  "\nTEST 8 — BHR-005 COMMUNITY IMPACT"
);

const communityResult =
  BHRRuleEngine.evaluate(
    "COMMUNITY_IMPACT",
    {

      communityDisplacement: 75,

      environmentalImpact: 80,

      healthImpact: 70,

      consultationFailure: 65,

      grievanceRisk: 60,

      socialConflict: 70,

      intensity: 85

    }
  );

assert(
  communityResult.success === true,
  "BHR-005 evaluation successful"
);

assert(
  communityResult.rule.id ===
    "BHR-005",
  "BHR-005 selected"
);

assert(
  Array.isArray(
    communityResult.contingencyActions
  ),
  "Community contingency actions generated"
);


/* =========================================================
   TEST 9 — BHR-006 GOVERNANCE RISK
========================================================= */

console.log(
  "\nTEST 9 — BHR-006 GOVERNANCE RISK"
);

const governanceResult =
  BHRRuleEngine.evaluate(
    "GOVERNANCE_RISK",
    {

      policyFailure: 85,

      oversightFailure: 80,

      complianceFailure: 90,

      transparencyRisk: 75,

      accountabilityFailure: 80,

      escalationFailure: 70,

      intensity: 95

    }
  );

assert(
  governanceResult.success === true,
  "BHR-006 evaluation successful"
);

assert(
  governanceResult.rule.id ===
    "BHR-006",
  "BHR-006 selected"
);

assert(
  governanceResult.audit.ruleId ===
    "BHR-006",
  "Governance rule recorded in audit"
);


/* =========================================================
   TEST 10 — RISK CLASSIFICATION
========================================================= */

console.log(
  "\nTEST 10 — RISK CLASSIFICATION"
);

const green =
  BHRRuleEngine.evaluate(
    "BHR_STRESS",
    {

      labour: 0,

      humanRights: 0,

      supplyChain: 0,

      community: 0,

      governance: 0,

      environment: 0,

      intensity: 0

    }
  );

assert(
  green.assessment.risk ===
    "GREEN",
  "Low stress produces GREEN"
);


const red =
  BHRRuleEngine.evaluate(
    "HUMAN_RIGHTS_EVENT",
    {

      rightsViolation: 100,

      affectedPeople: 100,

      severity: 100,

      remedyFailure: 100,

      legalExposure: 100,

      reputationalImpact: 100,

      intensity: 100

    }
  );

assert(
  red.assessment.risk ===
    "RED",
  "Extreme stress produces RED"
);


/* =========================================================
   TEST 11 — RESILIENCE CALCULATION
========================================================= */

console.log(
  "\nTEST 11 — RESILIENCE CALCULATION"
);

const resilience =
  BHRRuleEngine.calculateResilience(
    50
  );

assert(
  typeof resilience ===
    "number",
  "Resilience calculation returns number"
);

assert(
  resilience >= 0 &&
  resilience <= 100,
  "Resilience score remains within 0–100"
);


/* =========================================================
   TEST 12 — HUMAN EXECUTION GATE
========================================================= */

console.log(
  "\nTEST 12 — HUMAN EXECUTION GATE"
);

const gate =
  BHRRuleEngine.evaluate(
    "GOVERNANCE_RISK",
    {

      policyFailure: 90,

      oversightFailure: 90,

      complianceFailure: 90,

      transparencyRisk: 90,

      accountabilityFailure: 90,

      escalationFailure: 90,

      intensity: 100

    }
  );

assert(
  gate.decision.executionAuthority ===
    "HUMAN_OPERATOR",
  "Execution authority remains HUMAN_OPERATOR"
);

assert(
  gate.decision.executionStatus ===
    "HUMAN_AUTHORIZATION_REQUIRED",
  "Human authorization required before execution"
);

assert(
  gate.governance.autonomousExecution ===
    false,
  "Autonomous execution disabled"
);

assert(
  gate.governance.humanAuthorizationRequired ===
    true,
  "Human authorization requirement confirmed"
);


/* =========================================================
   TEST 13 — AUDIT OUTPUT
========================================================= */

console.log(
  "\nTEST 13 — AUDIT OUTPUT"
);

assert(
  gate.audit.engine ===
    "BHRRuleEngine",
  "Audit identifies BHRRuleEngine"
);

assert(
  gate.audit.domain ===
    "BHR",
  "Audit identifies BHR domain"
);

assert(
  typeof gate.audit.timestamp ===
    "string",
  "Audit timestamp generated"
);

assert(
  gate.audit.ruleId ===
    "BHR-006",
  "Audit records BHR-006"
);

assert(
  typeof gate.audit.stress ===
    "number",
  "Audit records stress"
);

assert(
  typeof gate.audit.resilienceScore ===
    "number",
  "Audit records resilience score"
);


/* =========================================================
   TEST 14 — CASCADE VALIDATION
========================================================= */

console.log(
  "\nTEST 14 — CASCADE VALIDATION"
);

assert(
  Array.isArray(
    gate.cascade.cascade
  ),
  "Cascade is an array"
);

assert(
  gate.cascade.severity ===
    gate.assessment.risk,
  "Cascade severity matches risk"
);

assert(
  Array.isArray(
    gate.cascade.crossDomainImpact
  ),
  "Cross-domain impact generated"
);


/* =========================================================
   TEST 15 — CONTINGENCY ACTION VALIDATION
========================================================= */

console.log(
  "\nTEST 15 — CONTINGENCY ACTIONS"
);

assert(
  Array.isArray(
    gate.contingencyActions
  ),
  "Contingency actions returned"
);

assert(
  gate.contingencyActions.length > 0,
  "Contingency actions available"
);

assert(
  typeof
    gate.decision.recommendedAction ===
    "string",
  "Recommended action generated"
);


/* =========================================================
   TEST 16 — DETERMINISTIC REPEATABILITY
========================================================= */

console.log(
  "\nTEST 16 — DETERMINISTIC REPEATABILITY"
);

const testInput = {

  labour: 65,

  humanRights: 45,

  supplyChain: 55,

  community: 35,

  governance: 40,

  environment: 30,

  intensity: 70

};

const runA =
  BHRRuleEngine.evaluate(
    "BHR_STRESS",
    testInput
  );

const runB =
  BHRRuleEngine.evaluate(
    "BHR_STRESS",
    testInput
  );

assert(
  runA.assessment.stress ===
    runB.assessment.stress,
  "Repeated stress calculation is deterministic"
);

assert(
  runA.assessment.goldenScore ===
    runB.assessment.goldenScore,
  "Repeated Golden Score calculation is deterministic"
);

assert(
  runA.assessment.resilienceScore ===
    runB.assessment.resilienceScore,
  "Repeated resilience calculation is deterministic"
);

assert(
  runA.assessment.risk ===
    runB.assessment.risk,
  "Repeated risk classification is deterministic"
);


/* =========================================================
   TEST 17 — ALL RULES EVALUATE
========================================================= */

console.log(
  "\nTEST 17 — ALL BHR RULES EVALUATION"
);

Object.keys(
  expectedMappings
).forEach(
  scenario => {

    const result =
      BHRRuleEngine.evaluate(
        scenario,
        {
          labour: 50,
          humanRights: 50,
          supplyChain: 50,
          community: 50,
          governance: 50,
          environment: 50,

          labourViolation: 50,
          workerSafety: 50,
          wageRisk: 50,
          workingConditions: 50,
          collectiveRights: 50,
          discriminationRisk: 50,

          rightsViolation: 50,
          affectedPeople: 50,
          severity: 50,
          remedyFailure: 50,
          legalExposure: 50,
          reputationalImpact: 50,

          supplierRisk: 50,
          labourRisk: 50,
          forcedLabourRisk: 50,
          childLabourRisk: 50,
          supplyChainVisibility: 50,
          remediationFailure: 50,

          communityDisplacement: 50,
          environmentalImpact: 50,
          healthImpact: 50,
          consultationFailure: 50,
          grievanceRisk: 50,
          socialConflict: 50,

          policyFailure: 50,
          oversightFailure: 50,
          complianceFailure: 50,
          transparencyRisk: 50,
          accountabilityFailure: 50,
          escalationFailure: 50,

          intensity: 50
        }
      );

    assert(
      result.success === true,
      `${scenario} evaluates successfully`
    );

  }
);


/* =========================================================
   FINAL RESULT
========================================================= */

console.log(
  "\n======================================"
);

console.log(
  "SPD v13.1 BHR RULE ENGINE VALIDATION"
);

console.log(
  "======================================"
);

console.log(
  "TOTAL PASSED:",
  passed
);

console.log(
  "TOTAL FAILED:",
  failed
);


if (
  failed === 0
) {

  console.log(
    "VALIDATION STATUS: PASS"
  );

  console.log(
    "BHR-001 → BHR-006 READY FOR DOMAIN INTEGRATION"
  );

} else {

  console.error(
    "VALIDATION STATUS: FAIL"
  );

  console.error(
    "DOMAIN INTEGRATION MUST NOT PROCEED"
  );

  process.exitCode = 1;

}