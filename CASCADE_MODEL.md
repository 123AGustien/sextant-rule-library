# CASCADE MODEL — Sextant Protocol Rule Engine

## Overview

The Cascade Model defines how rules interact across domains within the Sextant Rule Library.

Instead of evaluating rules independently, the system now evaluates:
- Cross-domain impacts
- Secondary and tertiary effects
- System-wide resilience behavior

---

## Core Principle

A single scenario can trigger multiple domain responses.

```text
Scenario → Rule → Primary Impact → Secondary Cascade → Cross-Domain Effects
