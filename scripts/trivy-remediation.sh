#!/bin/bash

set -e

echo "Step 1: Run Trivy scan"
bash scripts/trivy-scan.sh

echo "Step 2: Run npm audit fix"
bash scripts/audit-remediation.sh

echo "Step 3: Re-scan vulnerabilities"

trivy fs \
--severity HIGH,CRITICAL \
--format json \
-o trivy-after.json \
.

mv trivy-after.json trivy-report.json

echo "Step 4: Fix remaining vulnerabilities"

node scripts/dependency-fix.js

echo "Step 5: Update lockfile"

npm i --package-lock-only --ignore-scripts
npm ci --ignore-scripts
