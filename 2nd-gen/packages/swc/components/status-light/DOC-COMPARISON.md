# Status light: 1st-gen vs 2nd-gen documentation comparison

## Summary

The 2nd-gen documentation successfully covers the core concepts but is missing some important features and states documented in 1st-gen. The migration is good but incomplete.

## Missing content areas

### Critical gaps

1. **XL size option**
    - **1st-gen**: Documents and demonstrates `size="xl"`
    - **2nd-gen**: Only shows `s`, `m`, `l` sizes
    - **Priority**: High
    - **Recommendation**: Verify if `xl` size is supported in 2nd-gen implementation. If yes, add to stories and documentation.

2. **Disabled state**
    - **1st-gen**: Has dedicated section showing disabled state with example: `<sp-status-light variant="positive" disabled>disabled</sp-status-light>`
    - **2nd-gen**: No disabled state documentation
    - **Priority**: High
    - **Recommendation**: Add disabled state to States section if supported. Include visual example and accessibility note about `aria-disabled="true"`.

3. **ARIA disabled support**
    - **1st-gen**: Explicitly documents: "When disabled, the component automatically sets `aria-disabled='true'`"
    - **2nd-gen**: No mention of ARIA disabled support
    - **Priority**: High (if disabled is supported)
    - **Recommendation**: Add to accessibility features section.

### Nice-to-have additions

4. **Package metadata**
    - **1st-gen**: Includes NPM version, bundle size, and Stackblitz badges
    - **2nd-gen**: No package metadata
    - **Priority**: Low
    - **Recommendation**: Consider adding if useful for developer reference.

5. **Installation instructions**
    - **1st-gen**: Shows yarn add command and import statements
    - **2nd-gen**: Missing installation section
    - **Priority**: Low (may be intentional - centralized elsewhere)
    - **Recommendation**: If not documented globally, consider adding brief usage section.

## Content depth differences

### States documentation

**1st-gen advantage**:

- Has dedicated "States" section
- Documents disabled state with clear explanation: "shows that a status exists, but is not available in that circumstance"
- Provides use case: "maintain layout continuity and communicate that a status may become available later"

**2nd-gen**:

- No states section at all
- This is a significant gap if disabled state is supported

### Size documentation

**1st-gen advantage**:

- Four sizes: s, m, l, xl
- Interactive tabs for each size

**2nd-gen advantage**:

- Clean story-based approach
- Better for automated testing
- Clear size hierarchy explanation

**Gap**: Missing xl size (if supported in implementation)

### Accessibility guidance

**1st-gen advantage**:

- Documents ARIA disabled support explicitly
- Four best practices including "Consider the disabled state"

**2nd-gen advantage**:

- Well-structured features section
- Clear formatting with numbered features and bullet points

**Gap**: Missing ARIA disabled documentation and disabled state best practice

### Variant documentation

Both 1st-gen and 2nd-gen cover semantic and non-semantic variants comprehensively. The approaches differ but both are effective:

- **1st-gen**: Uses interactive tabs
- **2nd-gen**: Uses separate stories with clear descriptions

## Recommendations by priority

### High priority

1. **Add disabled state documentation** (if supported)
    - Add to States section in stories
    - Show visual example
    - Document ARIA disabled support in accessibility section

2. **Add XL size support** (if available in implementation)
    - Include in size story
    - Update size documentation

3. **Verify non-semantic color variants** - Ensure all colors from 1st-gen are available

### Medium priority

4. **Expand accessibility section** with ARIA disabled information (if applicable)
5. **Add States section** to usage.mdx if disabled or other states exist

### Low priority

6. Consider adding package metadata badges
7. Add installation/usage section if not documented globally

## Content quality assessment

| Area              | 1st-gen           | 2nd-gen             | Notes                                                   |
| ----------------- | ----------------- | ------------------- | ------------------------------------------------------- |
| **Installation**  | ✅ Comprehensive  | ❌ Missing          | May be intentional                                      |
| **Anatomy**       | ✅ Good           | ✅ Good             | Both clear and concise                                  |
| **Sizes**         | ✅ Has XL         | ⚠️ Missing XL       | Verify if XL removed intentionally                      |
| **Variants**      | ✅ Comprehensive  | ✅ Comprehensive    | Both cover semantic/non-semantic well                   |
| **States**        | ✅ Disabled state | ❌ Missing entirely | Critical gap if disabled supported                      |
| **Text wrapping** | ❌ Not documented | ✅ Has example      | 2nd-gen advantage                                       |
| **Accessibility** | ✅ Good           | ✅ Good             | 1st-gen has ARIA disabled, 2nd-gen has better structure |

## Overall assessment

**Strengths of 2nd-gen migration**:

- Clean, organized story structure
- Better separation with clear sections (anatomy, options, a11y)
- Added text wrapping example (not in 1st-gen)
- More maintainable testing approach

**Critical gaps to address**:

- Missing disabled state (if supported in implementation)
- Missing xl size (if supported)
- Missing ARIA disabled documentation

**Areas needing enhancement**:

- Add States section if disabled or other states exist
- Verify all size and variant options are documented
- Consider adding installation instructions

**Completeness score**: 80% - Core content migrated successfully, but missing critical state documentation and potentially one size option.
