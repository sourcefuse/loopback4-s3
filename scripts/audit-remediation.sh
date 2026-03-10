#!/bin/bash

set -e

echo "Running npm audit fix"

npm audit fix --ignore-scripts || true

echo "Updating lockfile"

npm i --package-lock-only --ignore-scripts

echo "Installing dependencies"

npm ci --ignore-scripts
