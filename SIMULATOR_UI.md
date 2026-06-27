# SIMULATOR UI — Sextant Protocol v1.0

## Overview

This document defines the user interface structure for the Sextant Rule Library Simulation System.

It describes how users interact with:
- Scenario selection
- Simulation execution
- Risk visualization
- Cascade effects display

---

## UI DESIGN PRINCIPLE

The interface is:

- Minimal
- Scenario-driven
- Risk-focused
- Transparency-first (rule traceable)

---

## MAIN DASHBOARD STRUCTURE

### 1. Scenario Selection Panel

Users can select:

- FIN — Financial Scenarios
- DC — Data Centre Scenarios
- CYB — Cyber Scenarios
- INF — Infrastructure Scenarios

Each category expands into specific scenarios.

---

### 2. Scenario Execution Button

Each scenario has:

→ “Run Simulation”

This triggers:

SCENARIO_MAP → RULE_INDEX → RULE FILE → ENGINE

---

### 3. Risk Output Panel

Displays:

- Risk Level:
  - GREEN
  - YELLOW
  - ORANGE
  - RED

- Primary Impact Summary

---

### 4. Cascade Visualization Panel

Shows:

- Cross-domain impact flow
- Chain reaction mapping

Example:

FIN-001 → DC-001 risk increase → CYB exposure change

---

### 5. Rule Trace Panel (Audit Layer)

Displays:

- Which rule was used
- Which indicators triggered decision
- Thresholds activated

Purpose:
Full transparency for governance review

---

## UI FLOW

```text
Select Scenario
      ↓
Click "Run Simulation"
      ↓
Engine Processes Rule
      ↓
Risk Level Generated
      ↓
Cascade Model Activated
      ↓
Results Displayed
