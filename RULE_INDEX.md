# RULE INDEX — Sextant Rule Library v1.0

## Overview

This document is the master index of all rules within the Sextant Protocol Rule Library.

It acts as the central routing layer between:
- Scenario selection
- Rule execution

- Simulation engine processing

- Risk and contingency output

---

## System Flow

```text
Scenario Selection
        ↓
RULE_INDEX.md (routing layer)
EN — Energy Resilience

BIO-001 Biodiesel Supply Stress
BIO-002 Biodiesel Shortage Scenario
        ↓
Rule File (e.g. FIN-001.md)
        ↓
Evaluation Engine
        ↓
Risk Output + Contingency Actions
