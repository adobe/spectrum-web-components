#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
echo "[swc-mcp] Generating CEM for 1st-gen packages..."
cd "$MONOREPO_ROOT/1st-gen"
yarn docs:analyze
echo "[swc-mcp] CEM generation complete."
