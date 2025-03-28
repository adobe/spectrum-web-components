#!/usr/bin/env bash

# Add this after the shebang line
cd "$(git rev-parse --show-toplevel)" || exit 1

echo "🧪 Testing Husky pre-commit hook with single bracket syntax..."

# Original files to restore later
ACCORDION_TS="packages/accordion/src/Accordion.ts"
ACCORDION_CSS="packages/accordion/src/accordion.css"

# Create backup of original files
cp "$ACCORDION_TS" "$ACCORDION_TS.bak"
cp "$ACCORDION_CSS" "$ACCORDION_CSS.bak"

echo -e "\n\n🔍 Test 1: Verifying ESLint (TypeScript files)"
echo "// Testing ESLint conditional" >> "$ACCORDION_TS"
git add "$ACCORDION_TS"
HUSKY=1 .husky/pre-commit
git reset "$ACCORDION_TS"

echo -e "\n\n🔍 Test 2: Verifying lit-analyzer (TypeScript in packages)"
echo "// Testing lit-analyzer conditional" >> "$ACCORDION_TS"
git add "$ACCORDION_TS"
HUSKY=1 .husky/pre-commit
git reset "$ACCORDION_TS"

echo -e "\n\n🔍 Test 3: Verifying stylelint (CSS files)"
echo "/* Testing stylelint conditional */" >> "$ACCORDION_CSS"
git add "$ACCORDION_CSS"
HUSKY=1 .husky/pre-commit
git reset "$ACCORDION_CSS"

echo -e "\n\n🔍 Test 4: Verifying all conditionals together"
git add "$ACCORDION_TS" "$ACCORDION_CSS"
HUSKY=1 .husky/pre-commit
git reset "$ACCORDION_TS" "$ACCORDION_CSS"

# Restore original files
mv "$ACCORDION_TS.bak" "$ACCORDION_TS"
mv "$ACCORDION_CSS.bak" "$ACCORDION_CSS"

echo -e "\n\n✅ All tests completed!"
