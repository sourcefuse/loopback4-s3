#!/bin/bash

set -e

echo "Running Trivy scan..."

trivy fs \
--scanners vuln \
--severity HIGH,CRITICAL \
--format json \
-o trivy-report.json \
.

echo "Trivy scan completed"
