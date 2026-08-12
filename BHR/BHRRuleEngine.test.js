/**
 * SPD v13.1 — BHR Rule Engine Validation
 *
 * Tests:
 * - BHR domain evaluation
 * - Input normalization
 * - Stress calculation
 * - Risk classification
 * - Resilience calculation
 * - Human-rights principle detection
 * - Decision support
 * - Human authorization gate
 * - Deterministic repeatability
 * - Self-check
 *
 * Governance:
 * AI provides decision support.
 * HUMAN_OPERATOR retains execution authority.
 * No autonomous recovery execution is permitted.
 */

const BHRRuleEngine = require("./BHRRuleEngine");

let passed = 0;
let failed = 0;


/* =========================================================
   ASSERTION HELPER
========================================================= */

function assert(condition, message) {

  if (condition) {

    console.log("PASS:", message);

    passed++;

  } else {

    console.error("FAIL:", message);

    failed++;

  }

}


/* =========================================================
   TEST 1 — DOMAIN BASIC EVALUATION
========================================================= */

console.log("\nTEST 1 — BHR DOMAIN EVALUATION");

const baseline =
  BHRRuleEngine.evaluate(
    {
      labour: 0,
      humanRights: 0,
      supplyChain: 0,
      community: 0,
      governance: 0,
      environment: 0,
      intensity: 0
    },
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  baseline.success === true,
  "BHR evaluation successful"
);

assert(
  baseline.domain === "BHR",
  "BHR domain confirmed"
);

assert(
  baseline.domainName ===
    "Business & Human Rights Resilience",
  "BHR domain name confirmed"
);

assert(
  baseline.status ===
    "BHR_EVALUATION_COMPLETE",
  "BHR evaluation completed"
);


/* =========================================================
   TEST 2 — LOW RISK
========================================================= */

console.log("\nTEST 2 — LOW RISK");

const low =
  BHRRuleEngine.evaluate(
    {
      labour: 0,
      humanRights: 0,
      supplyChain: 0,
      community: 0,
      governance: 0,
      environment: 0,
      intensity: 0
    },
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  low.assessment.risk === "LOW",
  "Zero BHR stress produces LOW risk"
);

assert(
  low.assessment.stress === 0,
  "Zero BHR stress calculated correctly"
);

assert(
  low.assessment.resilienceScore === 100,
  "Zero stress produces resilience score 100"
);


/* =========================================================
   TEST 3 — MEDIUM RISK
========================================================= */

console.log("\nTEST 3 — MEDIUM RISK");

const medium =
  BHRRuleEngine.evaluate(
    {
      labour: 50,
      humanRights: 50,
      supplyChain: 50,
      community: 50,
      governance: 50,
      environment: 50,
      intensity: 0
    },
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  medium.success === true,
  "Medium BHR evaluation successful"
);

assert(
  medium.assessment.risk === "MEDIUM",
  "Medium BHR stress produces MEDIUM risk"
);

assert(
  medium.decision.action ===
    "INITIATE_BHR_MITIGATION_REVIEW",
  "Medium risk produces BHR mitigation recommendation"
);

assert(
  medium.executionStatus ===
    "HUMAN_AUTHORIZATION_REQUIRED",
  "Medium-risk execution requires human authorization"
);


/* =========================================================
   TEST 4 — HIGH RISK
========================================================= */

console.log("\nTEST 4 — HIGH RISK");

const high =
  BHRRuleEngine.evaluate(
    {
      labour: 100,
      humanRights: 100,
      supplyChain: 100,
      community: 100,
      governance: 100,
      environment: 100,
      intensity: 100
    },
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  high.success === true,
  "High BHR evaluation successful"
);

assert(
  high.assessment.risk === "HIGH",
  "Extreme BHR stress produces HIGH risk"
);

assert(
  high.assessment.stress === 100,
  "Extreme BHR stress is clamped to 100"
);

assert(
  high.assessment.resilienceScore === 0,
  "Extreme stress produces resilience score 0"
);

assert(
  high.decision.priority === "CRITICAL",
  "High BHR risk receives CRITICAL priority"
);


/* =========================================================
   TEST 5 — HUMAN RIGHTS PRINCIPLE DETECTION
========================================================= */

console.log(
  "\nTEST 5 — HUMAN RIGHTS PRINCIPLE DETECTION"
);

const principles =
  BHRRuleEngine.evaluate(
    {
      labour: 60,
      humanRights: 80,
      supplyChain: 70,
      community: 50,
      governance: 40,
      environment: 30,
      intensity: 0
    },
    {
      scenario: "HUMAN_RIGHTS_EVENT"
    }
  );

assert(
  principles.humanRightsPrinciples
    .concerns.includes("LABOUR_RISK"),
  "Labour risk detected"
);

assert(
  principles.humanRightsPrinciples
    .concerns.includes("HUMAN_RIGHTS_RISK"),
  "Human rights risk detected"
);

assert(
  principles.humanRightsPrinciples
    .concerns.includes("SUPPLY_CHAIN_RISK"),
  "Supply-chain risk detected"
);

assert(
  principles.humanRightsPrinciples
    .concerns.includes("COMMUNITY_IMPACT_RISK"),
  "Community impact risk detected"
);

assert(
  principles.humanRightsPrinciples
    .concerns.includes("GOVERNANCE_RISK"),
  "Governance risk detected"
);

assert(
  principles.humanRightsPrinciples
    .status ===
      "BHR_CONCERNS_IDENTIFIED",
  "BHR concerns correctly identified"
);


/* =========================================================
   TEST 6 — ENVIRONMENTAL RISK
========================================================= */

console.log(
  "\nTEST 6 — ENVIRONMENTAL RISK"
);

const environmental =
  BHRRuleEngine.evaluate(
    {
      labour: 0,
      humanRights: 0,
      supplyChain: 0,
      community: 0,
      governance: 0,
      environment: 80,
      intensity: 0
    },
    {
      scenario: "COMMUNITY_IMPACT"
    }
  );

assert(
  environmental.humanRightsPrinciples
    .concerns.includes(
      "ENVIRONMENTAL_RISK"
    ),
  "Environmental risk detected"
);


/* =========================================================
   TEST 7 — INPUT NORMALIZATION
========================================================= */

console.log(
  "\nTEST 7 — INPUT NORMALIZATION"
);

const normalized =
  BHRRuleEngine.normalizeInput(
    {
      labor: 55,
      human_rights: 65,
      supply_chain: 75,
      community: 45,
      governance: 35,
      environment: 25,
      intensity: 80
    }
  );

assert(
  normalized.labour === 55,
  "US spelling labor normalized to labour"
);

assert(
  normalized.humanRights === 65,
  "human_rights normalized"
);

assert(
  normalized.supplyChain === 75,
  "supply_chain normalized"
);

assert(
  normalized.intensity === 80,
  "Intensity normalized"
);


/* =========================================================
   TEST 8 — VALUE CLAMPING
========================================================= */

console.log(
  "\nTEST 8 — VALUE CLAMPING"
);

const clamped =
  BHRRuleEngine.normalizeInput(
    {
      labour: 150,
      humanRights: -20,
      supplyChain: "invalid",
      community: 200,
      governance: -50,
      environment: 50,
      intensity: 120
    }
  );

assert(
  clamped.labour === 100,
  "Values above 100 are clamped"
);

assert(
  clamped.humanRights === 0,
  "Values below 0 are clamped"
);

assert(
  clamped.supplyChain === 0,
  "Invalid numeric values safely default to 0"
);

assert(
  clamped.community === 100,
  "Community value clamped to 100"
);

assert(
  clamped.intensity === 100,
  "Intensity clamped to 100"
);


/* =========================================================
   TEST 9 — INTENSITY MODIFIER
========================================================= */

console.log(
  "\nTEST 9 — INTENSITY MODIFIER"
);

const intensityTest =
  BHRRuleEngine.evaluate(
    {
      labour: 50,
      humanRights: 50,
      supplyChain: 50,
      community: 50,
      governance: 50,
      environment: 50,
      intensity: 50
    },
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  intensityTest.assessment.baseStress === 50,
  "Base stress calculated correctly"
);

assert(
  intensityTest.assessment.intensityFactor ===
    1.5,
  "Intensity factor calculated correctly"
);

assert(
  intensityTest.assessment.stress === 75,
  "Intensity modifier produces deterministic stress"
);

assert(
  intensityTest.assessment.risk === "HIGH",
  "Adjusted stress produces HIGH risk"
);


/* =========================================================
   TEST 10 — HUMAN EXECUTION GATE
========================================================= */

console.log(
  "\nTEST 10 — HUMAN EXECUTION GATE"
);

const gate =
  BHRRuleEngine.evaluate(
    {
      labour: 80,
      humanRights: 90,
      supplyChain: 80,
      community: 70,
      governance: 75,
      environment: 60,
      intensity: 90
    },
    {
      scenario: "GOVERNANCE_RISK"
    }
  );

assert(
  gate.executionAuthority ===
    "HUMAN_OPERATOR",
  "Execution authority remains HUMAN_OPERATOR"
);

assert(
  gate.executionStatus ===
    "HUMAN_AUTHORIZATION_REQUIRED",
  "Human authorization required"
);

assert(
  gate.decision.humanAuthorization ===
    "REQUIRED_BEFORE_EXECUTION",
  "Decision explicitly requires human authorization"
);


/* =========================================================
   TEST 11 — AUTONOMOUS EXECUTION DISABLED
========================================================= */

console.log(
  "\nTEST 11 — AUTONOMOUS EXECUTION GOVERNANCE"
);

assert(
  gate.executionAuthority ===
    "HUMAN_OPERATOR",
  "Human operator retains execution authority"
);

assert(
  gate.executionStatus ===
    "HUMAN_AUTHORIZATION_REQUIRED",
  "Execution remains gated"
);


/* =========================================================
   TEST 12 — LOW-RISK MONITORING MODE
========================================================= */

console.log(
  "\nTEST 12 — LOW-RISK MONITORING MODE"
);

assert(
  low.decision.action ===
    "MAINTAIN_MONITORING",
  "LOW risk maintains monitoring"
);

assert(
  low.executionStatus ===
    "MONITORING_ONLY",
  "LOW risk remains monitoring-only"
);

assert(
  low.decision.humanAuthorization ===
    "NOT_REQUIRED_FOR_MONITORING",
  "No execution authorization required for monitoring"
);


/* =========================================================
   TEST 13 — SELF CHECK
========================================================= */

console.log(
  "\nTEST 13 — BHR ENGINE SELF-CHECK"
);

const selfCheck =
  BHRRuleEngine.verifyBHREngine();

assert(
  selfCheck.domain === "BHR",
  "Self-check identifies BHR domain"
);

assert(
  selfCheck.status === "READY",
  "BHR engine self-check READY"
);

assert(
  selfCheck.testRisk === "LOW",
  "Self-check baseline produces LOW risk"
);

assert(
  selfCheck.testResilienceScore === 100,
  "Self-check baseline resilience score is 100"
);


/* =========================================================
   TEST 14 — DETERMINISTIC REPEATABILITY
========================================================= */

console.log(
  "\nTEST 14 — DETERMINISTIC REPEATABILITY"
);

const testInput = {

  labour: 65,

  humanRights: 70,

  supplyChain: 45,

  community: 55,

  governance: 40,

  environment: 30,

  intensity: 60

};

const runA =
  BHRRuleEngine.evaluate(
    testInput,
    {
      scenario: "BHR_STRESS"
    }
  );

const runB =
  BHRRuleEngine.evaluate(
    testInput,
    {
      scenario: "BHR_STRESS"
    }
  );

assert(
  runA.assessment.baseStress ===
    runB.assessment.baseStress,
  "Repeated base stress calculation is deterministic"
);

assert(
  runA.assessment.intensityFactor ===
    runB.assessment.intensityFactor,
  "Repeated intensity calculation is deterministic"
);

assert(
  runA.assessment.stress ===
    runB.assessment.stress,
  "Repeated stress calculation is deterministic"
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

assert(
  JSON.stringify(
    runA.humanRightsPrinciples
  ) ===
  JSON.stringify(
    runB.humanRightsPrinciples
  ),
  "Repeated BHR principle assessment is deterministic"
);


/* =========================================================
   TEST 15 — REQUIRED API FUNCTIONS
========================================================= */

console.log(
  "\nTEST 15 — PUBLIC API"
);

assert(
  typeof BHRRuleEngine.evaluate ===
    "function",
  "evaluate() exported"
);

assert(
  typeof BHRRuleEngine.normalizeInput ===
    "function",
  "normalizeInput() exported"
);

assert(
  typeof BHRRuleEngine.calculateBHRStress ===
    "function",
  "calculateBHRStress() exported"
);

assert(
  typeof BHRRuleEngine.classifyRisk ===
    "function",
  "classifyRisk() exported"
);

assert(
  typeof BHRRuleEngine.calculateResilience ===
    "function",
  "calculateResilience() exported"
);

assert(
  typeof BHRRuleEngine.verifyBHREngine ===
    "function",
  "verifyBHREngine() exported"
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

if (failed === 0) {

  console.log(
    "VALIDATION STATUS: PASS"
  );

  console.log(
    "BHR RULE ENGINE READY FOR DOMAIN INTEGRATION"
  );

} else {

  console.error(
    "VALIDATION STATUS: FAIL"
  );

  console.error(
    "BHR DOMAIN INTEGRATION MUST NOT PROCEED"
  );

  process.exitCode = 1;

}