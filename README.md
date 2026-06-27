
📘 README.md — Sextant Rule Library
# Sextant Rule Library

## Overview

The Sextant Rule Library is the governed decision layer of the Sextant Protocol simulation system.

It defines structured, version-controlled resilience rules used to evaluate real-world scenarios across financial, cyber, infrastructure, and operational domains.

This repository does not predict events.  
It standardises how systems interpret risk signals and translate them into structured resilience responses.

---

## Purpose

The Rule Library exists to:

- Standardise scenario interpretation logic
- Provide consistent risk classification across domains
- Define contingency and recovery actions
- Enable simulation engines to operate on governed rules
- Support auditability and regulatory review
- Allow client-specific rule adaptation (governed customization)

---

## System Architecture

The Sextant Protocol system is structured in four layers:

```text
1. Scenario Layer
   ↓
2. Rule Layer (THIS REPOSITORY)
   ↓
3. Simulation Engine Layer
   ↓
4. Output Layer (Risk + Contingency + Audit Log)
Core Concept
Each scenario is not interpreted directly by code.
Instead, it is interpreted through a rule:
Scenario → Rule → Indicators → Threshold Evaluation → Risk Level → Contingency Actions
Domains Covered
The Rule Library is divided into seven resilience domains:
Financial Resilience (FIN)
FX stress scenarios (e.g. SGD/IDR volatility)
Bond outflows
Liquidity stress
Interest rate shocks
Data Centre Resilience (DC)
Cooling failure
Power instability
Network congestion
Hardware failure
Cyber Resilience (CYB)
Ransomware
DDoS attacks
Credential compromise
Insider threats
Infrastructure Resilience (INF)
Power grid instability
Telecom outages
Transport disruption
Supply Chain Resilience (SC)
Logistics disruption
Port congestion
Supplier failure
Energy Resilience (EN)
Energy price shocks
Grid instability
Fuel supply constraints
Operational Resilience (OPS)
System-wide operational disruption
Multi-domain cascading failures
Rule Structure
Each rule follows a standard format:
Rule ID:
Version:
Domain:

Scenario:
Trigger Conditions:
Indicators:

Threshold Logic:
- Green:
- Yellow:
- Orange:
- Red:

Expected Cascade:

Contingency Actions:

Recovery Actions:

Audit Requirements:

Version History:
Simulation Flow
The simulator operates through a deterministic rule-loading process:
User selects scenario
        ↓
Scenario maps to Rule ID
        ↓
System loads rule file (e.g. FIN-001.md)
        ↓
Extract trigger + indicators
        ↓
Evaluate thresholds against input data
        ↓
Assign risk level (Green / Yellow / Orange / Red)
        ↓
Display:
   - Risk Level
   - Cascade Path
   - Contingency Actions
   - Recovery Actions
        ↓
Log simulation output for audit
Example: FX Stress Scenario
Example rule: FIN-001 (FX Stress SGD/IDR)
Scenario:
Foreign capital outflow causing currency pressure.

Trigger:
Rapid increase in foreign bond selling.

Indicators:
- SGD/IDR movement
- USD strength index
- Bond yields
- Foreign reserves

Expected Cascade:
Capital outflow
→ Currency depreciation
→ Import inflation
→ Interest rate pressure
→ Liquidity tightening

Risk Level:
Orange

Contingency Actions:
- Increase FX exposure monitoring
- Review liquidity buffers
- Notify treasury function
- Run stress simulation models
Governance Model
The Rule Library supports controlled governance and versioning.
Each rule may have:
Internal authoring (Sextant Protocol team)
Client review (institutional stakeholders)
Regulatory review (e.g. financial authorities)
Versioned approval history
Example:
FIN-001 v1.0 → Draft
FIN-001 v1.1 → Client reviewed
FIN-001 v2.0 → Approved baseline
Customisation Model
Institutions may:
Adopt the core rule set
Adjust thresholds to match internal risk appetite
Add organisation-specific contingency actions
Maintain their own version branch of the rules
This enables both:
Standardisation
Institutional flexibility
Integration
This repository is used by:
Sextant Operations Console
Scenario Simulator Engine
Schneider Datacentre Pilot
Financial FX Stress Module
Future institutional deployments
Repository Role in System
Sextant Protocol Index Repository
            ↓
     Rule Library (THIS REPO)
            ↓
     Simulation Engines
            ↓
     Dashboards / Decision Outputs
Version
v1.0 — Initial governed rule framework (in development)

---

