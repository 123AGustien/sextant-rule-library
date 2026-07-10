#!/bin/bash

echo "Removing corrupted risk-model filename..."

git rm "risk-model.js ===================================================== SEXTANT PROTOCOL RESILIENCE RISK MODEL File: risk/risk-model.js Version: 1.2 Purpose: Multi-domain deterministic risk classification engine Domains: FX Financial DC Data Centre CYB Cyber INF Infrastructure EN Energy Governance: Sextant Golden Rule ===================================================== *"

git commit -m "Remove corrupted filename"

git push

echo "Cleanup complete"