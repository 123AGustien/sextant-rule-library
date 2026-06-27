# sextant-rule-library
Governed resilience rule engine for the Sextant Protocol simulation system. It defines structured, version-controlled rules for financial, cyber, datacentre, infrastructure, and operational resilience scenarios used by simulation engines and decision-support dashboards.

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
