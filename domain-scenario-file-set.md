Sextant Protocol™ — Domain Scenario File Set
Purpose
This document defines the standard file set required to implement a new domain scenario within the Sextant Protocol™ resilience-processing architecture.
Examples include:
Biodiesel
AIMfg Manufacturing
Energy resilience
Infrastructure resilience
Other client-specific domains
Each domain must retain its own data, indicators, rules, failure modes, dependencies, assessment logic, recovery options, and validation scenarios.
The reusable SRPC foundation remains protected and must not be rewritten.
1. Protected SRPC Foundation
These files provide the reusable processing foundation:
research/srpc/
├── srpcKernel.js
├── srpcRules.js
├── srpcCompute.js
└── srpcTest.html
Core architecture:
DATA → ALGORITHMS → COMPUTE
Golden Rule:
OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
The SRPC foundation is domain-independent. Domain-specific meaning belongs in the new domain files.
2. Domain Scenario Data
File
research/srpc/<domain>ScenarioData.js
Responsibility
Defines the domain scenario catalogue and governed input data.
Typical contents:
Domain identity
Scenario identifiers
Scenario catalogue
Domain system states
Required input fields
Indicators
Failure conditions
Dependency information
Redundancy information
Recovery context
Examples:
biodieselScenarioData.js
aimfgManufacturingScenarioData.js
3. Domain Input-Validation Rules
File
research/srpc/<domain>Rules.js
Responsibility
Validates the foundational inputs required by the domain.
Typical checks:
Domain system is present
Scenario is present and recognised
Required data is available
Input values are valid
Dependency data is present
Redundancy data is present
Capability data is valid
Recovery options are available
Human authority is required
Physical execution is disabled
Backend and external connections are disabled where applicable
Examples:
biodieselRules.js
aimfgManufacturingRules.js
4. Domain Scenario-Rule Catalogue
File
research/srpc/<domain>ScenarioRules.js
Responsibility
Stores the domain’s governed scenario rules as data.
Typical contents:
Rule ID
Rule version
Domain
Scenario
Trigger conditions
Indicators
Threshold logic
Expected cascade
Contingency actions
Recovery actions
Audit requirements
Version history
Research and safety metadata
The scenario-rule catalogue must remain a data layer. Governed rule definitions and threshold logic must not be silently duplicated as hidden executable rules.
This file is particularly useful when the domain contains multiple scenarios.
5. Domain Rule Engine
File
research/srpc/<domain>RuleEngine.js
Responsibility
Implements the algorithmic evaluation of the domain’s foundational rules.
Typical functions:
Load domain rules
Validate rule availability
Evaluate required inputs
Produce rule results
Report pass/fail status
Return structured verification output
Report safety-boundary conditions
Support deterministic evaluation
The Rule Engine consumes the authoritative rule data. It must not replace the rule catalogue.
6. Domain Scenario Module
File
research/srpc/<domain>Scenario.js
Responsibility
Implements the domain scenario itself.
Typical public functions:
create()
validate()
assess()
getRecoveryOptions()
run()
testDeterminism()
The Scenario Module defines the domain-specific interpretation of:
Observed state
Verified inputs
Dependencies
Cascading effects
Remaining capability
Resilience condition
Recovery options
Simulated action
Updated state
7. Domain Scenario-Rule Engine
File
research/srpc/<domain>ScenarioRuleEngine.js
Responsibility
Processes the scenario-rule catalogue for domains with multiple governed scenarios.
Typical functions:
Confirm scenario catalogue availability
Validate scenario identity
Retrieve applicable scenario rules
Validate rule structure
Check indicator availability
Evaluate scenario-rule coverage
Produce a compact assessment
Test deterministic results
Report research and safety status
This engine consumes the scenario-rule data layer.
8. Domain Scenario Engine
File
research/srpc/<domain>ScenarioEngine.js
Responsibility
Coordinates the domain’s complete processing flow.
Required logical flow:
OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
DECIDE
   ↓
ACT — simulated only
   ↓
UPDATE
The Scenario Engine coordinates:
Rule Engine verification
Scenario processing
Assessment
Decision generation
Recovery recommendations
Human-authority gate
Simulated action handling
Audit output
Safety-boundary enforcement
9. Domain Integration Layer
File
research/srpc/<domain>DomainIntegration.js
Responsibility
Provides the controlled integration entry point for the domain.
Typical functions:
Register the domain
Discover required modules and engines
Verify dependencies
Verify Rule Engine visibility
Verify Scenario Engine availability
Route scenario requests
Run integration tests
Test determinism
Confirm safety boundaries
Expose a stable public interface
Reset the domain integration state
The Integration Layer should route requests to the domain engines. It must not duplicate domain rules or scenario logic.
10. Domain Module
File
research/srpc/<domain>Module.js
Responsibility
Provides the domain-level façade for the Cockpit and other approved callers.
Typical functions:
Report domain status
Verify dependencies
Run the primary domain scenario
Run a named scenario
Run integration tests
Run determinism tests
Reset the domain module
The Module must preserve the separation between:
DATA → ALGORITHMS → COMPUTE
11. Standalone Domain Test Page
File
research/srpc/<domain>Test.html
Responsibility
Provides an isolated validation environment before Cockpit integration.
The test page should validate:
Domain input data
Foundational rule evaluation
Scenario-rule availability, where applicable
Scenario processing
Assessment
Recovery decision
Determinism
Audit output
Human decision authority
Simulated action only
No physical execution
No backend connection
No unauthorised external connection
Safety-boundary compliance
Golden Rule sequence
Examples:
biodieselTest.html
aimfgManufacturingTest.html
12. Additive Cockpit/UI Integration
File
index.html
Responsibility
Adds the new domain to the Cockpit without rewriting the protected platform.
Requirements:
Add a separate domain panel or section
Load files in the correct dependency order
Call the Domain Integration or Module interface
Keep domain rules out of the UI
Preserve existing Edge and other domain panels
Avoid replacing working files
Avoid changing unrelated wiring
Keep physical execution disabled
Keep human authorization visible and mandatory
Display validation and audit results clearly
Cockpit integration should occur only after the standalone domain test passes.
Standard New-Domain File Package
For a complete new domain, the expected package is:
research/srpc/
├── <domain>ScenarioData.js
├── <domain>Rules.js
├── <domain>ScenarioRules.js
├── <domain>RuleEngine.js
├── <domain>Scenario.js
├── <domain>ScenarioRuleEngine.js
├── <domain>ScenarioEngine.js
├── <domain>DomainIntegration.js
├── <domain>Module.js
└── <domain>Test.html
The following files are reusable and normally remain protected:
research/srpc/
├── srpcKernel.js
├── srpcRules.js
├── srpcCompute.js
└── srpcTest.html
Recommended Development Order
1.  ScenarioData.js
2.  Rules.js
3.  ScenarioRules.js
4.  RuleEngine.js
5.  Scenario.js
6.  ScenarioRuleEngine.js
7.  ScenarioEngine.js
8.  DomainIntegration.js
9.  Module.js
10. Standalone Test.html
11. Cockpit/UI integration
12. Integration validation
13. Determinism validation
14. Safety-boundary validation
15. Protected milestone tag
Validation Requirements Before Tagging
A new domain should not be treated as a validated research baseline until the following are confirmed:
Domain data is present and valid
Foundational rules pass
Scenario rules are available and structurally valid
Scenario processing completes
Assessment is generated
Recovery options are generated
Decision logic is deterministic
Integration routing succeeds
Rule Engine visibility is confirmed
Scenario Engine visibility is confirmed
Audit output is generated
Human decision authority remains mandatory
Physical execution is disabled
Backend connection is disabled unless separately approved
External connection is disabled unless separately approved
Autonomous actuation is disabled
Repeated runs produce the same result
The Golden Rule sequence is preserved
No protected baseline has been rewritten or damaged
Architecture and Governance Rules
Backend/source logic is authoritative.
Rules remain in Data.
Domain logic must remain domain-specific.
Common structure does not mean common code.
The SRPC foundation is reusable but protected.
New domain work must be additive.
Existing validated demonstrators must not be rewritten.
The UI must call the domain interface, not duplicate domain logic.
ACT means simulated action only unless separately authorised.
Human Decision Authority remains final.
No production, autonomous-control, hardware, semiconductor, or physical-execution claim may be made from a simulator-only result.
Each domain must have its own
 scenario data, rules, indicators,
 dependencies, failure modes, and recovery actions.
Document Status
Document: Sextant Protocol™ — Domain Scenario File Set
Purpose: Standard new-domain implementation and validation checklist
Status: Research architecture guidance
Scope: Domain-specific SRPC scenario implementations
Authority: Backend/source logic and validated domain files
Change policy: Additive only; preserve protected baselines
Sextant Protocol™ — Domain Scenario File Set

Purpose

This document defines the standard file set required to implement a new domain scenario within the Sextant Protocol™ resilience-processing architecture.

Examples include:

- Biodiesel
- AIMfg Manufacturing
- Energy resilience
- Infrastructure resilience
- Other client-specific domains

Each domain must retain its own data, indicators, rules, failure modes, dependencies, assessment logic, recovery options, and validation scenarios.

The reusable SRPC foundation remains protected and must not be rewritten.

---

1. Protected SRPC Foundation

These files provide the reusable processing foundation:

research/srpc/
├── srpcKernel.js
├── srpcRules.js
├── srpcCompute.js
└── srpcTest.html

Core architecture:

DATA → ALGORITHMS → COMPUTE

Golden Rule:

OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

The SRPC foundation is domain-independent. Domain-specific meaning belongs in the new domain files.

---

2. Domain Scenario Data

File

research/srpc/<domain>ScenarioData.js

Responsibility

Defines the domain scenario catalogue and governed input data.

Typical contents:

- Domain identity
- Scenario identifiers
- Scenario catalogue
- Domain system states
- Required input fields
- Indicators
- Failure conditions
- Dependency information
- Redundancy information
- Recovery context

Examples:

biodieselScenarioData.js
aimfgManufacturingScenarioData.js

---

3. Domain Input-Validation Rules

File

research/srpc/<domain>Rules.js

Responsibility

Validates the foundational inputs required by the domain.

Typical checks:

- Domain system is present
- Scenario is present and recognised
- Required data is available
- Input values are valid
- Dependency data is present
- Redundancy data is present
- Capability data is valid
- Recovery options are available
- Human authority is required
- Physical execution is disabled
- Backend and external connections are disabled where applicable

Examples:

biodieselRules.js
aimfgManufacturingRules.js

---

4. Domain Scenario-Rule Catalogue

File

research/srpc/<domain>ScenarioRules.js

Responsibility

Stores the domain's governed scenario rules as data.

Typical contents:

- Rule ID
- Rule version
- Domain
- Scenario
- Trigger conditions
- Indicators
- Threshold logic
- Expected cascade
- Contingency actions
- Recovery actions
- Audit requirements
- Version history
- Research and safety metadata

The scenario-rule catalogue must remain a data layer. Governed rule definitions and threshold logic must not be silently duplicated as hidden executable rules.

This file is particularly useful when the domain contains multiple scenarios.

---

5. Domain Rule Engine

File

research/srpc/<domain>RuleEngine.js

Responsibility

Implements the algorithmic evaluation of the domain's foundational rules.

Typical functions:

- Load domain rules
- Validate rule availability
- Evaluate required inputs
- Produce rule results
- Report pass/fail status
- Return structured verification output
- Report safety-boundary conditions
- Support deterministic evaluation

The Rule Engine consumes the authoritative rule data. It must not replace the rule catalogue.

---

6. Domain Scenario Module

File

research/srpc/<domain>Scenario.js

Responsibility

Implements the domain scenario itself.

Typical public functions:

create()
validate()
assess()
getRecoveryOptions()
run()
testDeterminism()

The Scenario Module defines the domain-specific interpretation of:

- Observed state
- Verified inputs
- Dependencies
- Cascading effects
- Remaining capability
- Resilience condition
- Recovery options
- Simulated action
- Updated state

---

7. Domain Scenario-Rule Engine

File

research/srpc/<domain>ScenarioRuleEngine.js

Responsibility

Processes the scenario-rule catalogue for domains with multiple governed scenarios.

Typical functions:

- Confirm scenario catalogue availability
- Validate scenario identity
- Retrieve applicable scenario rules
- Validate rule structure
- Check indicator availability
- Evaluate scenario-rule coverage
- Produce a compact assessment
- Test deterministic results
- Report research and safety status

This engine consumes the scenario-rule data layer.

---

8. Domain Scenario Engine

File

research/srpc/<domain>ScenarioEngine.js

Responsibility

Coordinates the domain's complete processing flow.

Required logical flow:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
DECIDE
   ↓
ACT — simulated only
   ↓
UPDATE

The Scenario Engine coordinates:

- Rule Engine verification
- Scenario processing
- Assessment
- Decision generation
- Recovery recommendations
- Human-authority gate
- Simulated action handling
- Audit output
- Safety-boundary enforcement

---

9. Domain Integration Layer

File

research/srpc/<domain>DomainIntegration.js

Responsibility

Provides the controlled integration entry point for the domain.

Typical functions:

- Register the domain
- Discover required modules and engines
- Verify dependencies
- Verify Rule Engine visibility
- Verify Scenario Engine availability
- Route scenario requests
- Run integration tests
- Test determinism
- Confirm safety boundaries
- Expose a stable public interface
- Reset the domain integration state

The Integration Layer should route requests to the domain engines. It must not duplicate domain rules or scenario logic.

---

10. Domain Module

File

research/srpc/<domain>Module.js

Responsibility

Provides the domain-level façade for the Cockpit and other approved callers.

Typical functions:

- Report domain status
- Verify dependencies
- Run the primary domain scenario
- Run a named scenario
- Run integration tests
- Run determinism tests
- Reset the domain module

The Module must preserve the separation between:

DATA → ALGORITHMS → COMPUTE

---

11. Standalone Domain Test Page

File

research/srpc/<domain>Test.html

Responsibility

Provides an isolated validation environment before Cockpit integration.

The test page should validate:

- Domain input data
- Foundational rule evaluation
- Scenario-rule availability, where applicable
- Scenario processing
- Assessment
- Recovery decision
- Determinism
- Audit output
- Human decision authority
- Simulated action only
- No physical execution
- No backend connection
- No unauthorised external connection
- Safety-boundary compliance
- Golden Rule sequence

Examples:

biodieselTest.html
aimfgManufacturingTest.html

---

12. Additive Cockpit/UI Integration

File

index.html

Responsibility

Adds the new domain to the Cockpit without rewriting the protected platform.

Requirements:

- Add a separate domain panel or section
- Load files in the correct dependency order
- Call the Domain Integration or Module interface
- Keep domain rules out of the UI
- Preserve existing Edge and other domain panels
- Avoid replacing working files
- Avoid changing unrelated wiring
- Keep physical execution disabled
- Keep human authorization visible and mandatory
- Display validation and audit results clearly

Cockpit integration should occur only after the standalone domain test passes.

---

Standard New-Domain File Package

For a complete new domain, the expected package is:

research/srpc/
├── <domain>ScenarioData.js
├── <domain>Rules.js
├── <domain>ScenarioRules.js
├── <domain>RuleEngine.js
├── <domain>Scenario.js
├── <domain>ScenarioRuleEngine.js
├── <domain>ScenarioEngine.js
├── <domain>DomainIntegration.js
├── <domain>Module.js
└── <domain>Test.html

The following files are reusable and normally remain protected:

research/srpc/
├── srpcKernel.js
├── srpcRules.js
├── srpcCompute.js
└── srpcTest.html

---

Recommended Development Order

1.  ScenarioData.js
2.  Rules.js
3.  ScenarioRules.js
4.  RuleEngine.js
5.  Scenario.js
6.  ScenarioRuleEngine.js
7.  ScenarioEngine.js
8.  DomainIntegration.js
9.  Module.js
10. Standalone Test.html
11. Cockpit/UI integration
12. Integration validation
13. Determinism validation
14. Safety-boundary validation
15. Protected milestone tag

---

Validation Requirements Before Tagging

A new domain should not be treated as a validated research baseline until the following are confirmed:

- Domain data is present and valid
- Foundational rules pass
- Scenario rules are available and structurally valid
- Scenario processing completes
- Assessment is generated
- Recovery options are generated
- Decision logic is deterministic
- Integration routing succeeds
- Rule Engine visibility is confirmed
- Scenario Engine visibility is confirmed
- Audit output is generated
- Human decision authority remains mandatory
- Physical execution is disabled
- Backend connection is disabled unless separately approved
- External connection is disabled unless separately approved
- Autonomous actuation is disabled
- Repeated runs produce the same result
- The Golden Rule sequence is preserved
- No protected baseline has been rewritten or damaged

---

Architecture and Governance Rules

1. Backend/source logic is authoritative.
2. Rules remain in Data.
3. Domain logic must remain domain-specific.
4. Common structure does not mean common code.
5. The SRPC foundation is reusable but protected.
6. New domain work must be additive.
7. Existing validated demonstrators must not be rewritten.
8. The UI must call the domain interface, not duplicate domain logic.
9. ACT means simulated action only unless separately authorised.
10. Human Decision Authority remains final.
11. No production, autonomous-control, hardware, semiconductor, or physical-execution claim may be made from a simulator-only result.
12. Each domain must have its own scenario data, rules, indicators, dependencies, failure modes, and recovery actions.

---

Document Status

Document: Sextant Protocol™ — Domain Scenario File Set
Purpose: Standard new-domain implementation and validation checklist
Status: Research architecture guidance
Scope: Domain-specific SRPC scenario implementations
Authority: Backend/source logic and validated domain files
Change policy: Additive only; preserve protected baselines