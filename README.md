Before any formal submission or presentation, I would only suggest cleaning the small UI issue (duplicate “ACTION SEQUENCE PROMPT”) and ensuring the documentation explains that it is a controlled simulation and decision-support framework, not a live production risk engine.

For the Sextant Resilience Cockpit, the Golden Rule can be defined as:
🛰 SPD GOLDEN RULE

OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
Meaning:
OBSERVE
Monitor FX, DC, CYB, INF, EN signals.
No action before understanding the event.
VERIFY
Confirm the scenario is real or simulated.
Check data quality and avoid false alarms.
ASSESS
Calculate:
Impact intensity
Risk index
System domain stress
Cascade possibility
DECIDE
Select the safest proportional response.
Avoid overreaction.
ACT
Execute the recommended mitigation sequence.
UPDATE
Record results in:
Audit Record
Pipeline Log
Risk state
For your current example:
Scenario: FX Market Stress
Intensity: 40%

Observe:
FX pressure detected

Verify:
Scenario confirmed

Assess:
SPD Risk Index: 8.4

Decide:
Activate monitoring

Act:
Review liquidity buffer

Update:
Audit record completed
A good next upgrade for SPD v13 would be adding a GOLDEN RULE STATUS PANEL:
GOLDEN RULE ENGINE

OBSERVE     ✅
VERIFY      ✅
ASSESS      ✅
DECIDE      ✅
ACT         ⏳
UPDATE      ✅
# 📘 Sextant Rule Library

Governed decision layer for the **Sextant Protocol** resilience simulation framework.

The Rule Library provides structured, version-controlled resilience rules that enable simulation engines to evaluate scenarios consistently across financial, cyber, infrastructure, operational, and energy domains.

---

# 🛰 Live System

## SPA Control System
https://123agustien.github.io/sextant-rule-library/

## Operations Console
https://123agustien.github.io/sextant-resilience-operations-console/

---

# 📦 Repository

Source Code

https://github.com/123AGustien/sextant-rule-library

---

# 🧠 Purpose

The Rule Library standardises how resilience scenarios are interpreted.

Rather than embedding decision logic inside application code, every scenario is evaluated through governed rules.

Simulation Flow

```
Scenario
      ↓
Rule Selection
      ↓
Threshold Evaluation
      ↓
Risk Classification
      ↓
Cascade Analysis
      ↓
Contingency Actions
      ↓
Recovery Actions
      ↓
Audit Output
```

---

# 🏗 System Architecture

```
                Sextant Protocol

        Submission Gateway
               │
               ▼
      Operations Console
               │
               ▼
       Scenario Simulator
               │
               ▼
        Rule Library (THIS REPOSITORY)
               │
               ▼
      Resilience Decision Engine
               │
               ▼
 Risk Assessment • Cascade • Audit
```

---

# 🌐 Domains

The Rule Library currently supports:

- Financial Resilience (FIN)
- Data Centre Resilience (DC)
- Cyber Resilience (CYB)
- Infrastructure Resilience (INF)
- Supply Chain Resilience (SC)
- Energy Resilience (EN)
- Operational Resilience (OPS)

---

# 📚 Rule Structure

Each rule follows a governed template.

```
Rule ID
Version
Domain
Scenario
Trigger Conditions
Indicators
Threshold Logic
Expected Cascade
Contingency Actions
Recovery Actions
Audit Requirements
Version History
```

---

# ⚙ Example

Example Rule

```
FIN-001
Foreign Exchange Stress
```

Simulation

```
Foreign Bond Outflow
        ↓
Currency Pressure
        ↓
Liquidity Stress
        ↓
Risk Classification
        ↓
Contingency Actions
```

---

# 🔄 Simulator Flow

```
User selects scenario
        ↓
Rule ID selected
        ↓
Rule loaded
        ↓
Indicators evaluated
        ↓
Risk calculated
        ↓
Cascade simulated
        ↓
Recovery recommendations generated
        ↓
Audit recorded
```

---

# 🧩 Deployment Model

Platform

GitHub Pages

Architecture

Single Page Application (SPA)

Entry File

```
index.html
```

Characteristics

- Client-side execution
- No backend dependency
- Version-controlled rules
- Deterministic simulation
- Audit logging
- Single-entry deployment

---

# ⚖ Governance

Each rule is version controlled.

Example

```
FIN-001 v1.0
        ↓
FIN-001 v1.1
        ↓
FIN-001 v2.0
```

The governance model supports:

- Rule versioning
- Institutional review
- Regulatory review
- Client-specific branches
- Controlled evolution

---

# 🔗 Repository Role

```
Sextant Protocol

        │
        ▼

Rule Library

        │
        ▼

Simulation Engine

        │
        ▼

Operations Console

        │
        ▼

Decision Output
```

---

# 🚀 Current Status

| Component | Status |
|-----------|--------|
| Rule Library | Active |
| SPA Deployment | Active |
| Operations Console | Active |
| Simulation Engine | Prototype |
| Audit Engine | Active |
| GitHub Pages | Live |

---

# 📄 Version

**Sextant Rule Library**

Version **1.0**

Governed resilience rule framework supporting the Sextant Protocol simulation ecosystem.
