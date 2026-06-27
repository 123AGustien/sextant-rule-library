# SIMULATION ENGINE — Sextant Protocol v1.0

## Overview

The Simulation Engine defines how scenarios are executed within the Sextant Rule Library system.

It connects:
- Scenario selection
- Rule execution
- Cascade propagation
- Risk output generation

---

## Execution Principle

The system does not predict outcomes.

It evaluates conditions based on structured rules.

---

## Execution Pipeline

### Step 1 — Scenario Selection
User selects a scenario (e.g. FX Stress, Cooling Failure)

↓

### Step 2 — Scenario Mapping
Scenario is mapped via SCENARIO_MAP.md to a Rule ID

↓

### Step 3 — Rule Loading
RULE_INDEX routes system to correct rule file

↓

### Step 4 — Rule Evaluation
System evaluates:
- Indicators
- Threshold logic
- Risk level assignment

↓

### Step 5 — Primary Output
System generates:
- Risk Level (Green / Yellow / Orange / Red)
- Contingency Actions
- Recovery Actions

↓

### Step 6 — Cascade Execution (Step 3 integration)
CASCADE_MODEL evaluates cross-domain effects

↓

### Step 7 — System Output
Final simulation result is produced

---

## Risk Engine Logic

Rules determine risk using threshold-based evaluation:

- GREEN → Stable conditions
- YELLOW → Early warning signals
- ORANGE → Active stress conditions
- RED → System-critical conditions

---

## Output Structure

Each simulation produces:

- Scenario Name
- Active Rule ID
- Risk Level
- Primary Impact
- Cascade Effects
- Contingency Actions
- Recovery Actions

---

## System Behaviour Model

The system is:

- Deterministic in structure
- Probabilistic in cascade effects
- Rule-driven in evaluation
- Non-predictive in nature

---

## Integration Layers

- RULE_INDEX → routing brain
- SCENARIO_MAP → scenario translation layer
- RULE FILES → decision logic
- CASCADE_MODEL → cross-domain impact
- SIMULATION ENGINE → execution layer

---

## Purpose

To simulate resilience behaviour across:
- Financial systems
- Data centres
- Cyber systems
- Infrastructure systems
