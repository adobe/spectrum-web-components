# Text field story and test analysis

## Summary

The gen2 Text Field suite is comprehensive, but its organization makes it harder to see which test owns each behavior. The best improvements are safer fixture cleanup, smaller repeated setup, clearer coverage ownership, and a few missing trusted-browser regressions. A wholesale rewrite or large reduction in coverage is not justified.

The highest-value changes are:

1. Introduce a scoped fixture helper that always removes the fixture wrapper.
2. Introduce a small Text Field lookup helper that returns a settled field and its required native input.
3. Consolidate repeated validation-source assertions without losing lifecycle, reset, pattern, or status-transition coverage.
4. Extend real-browser tests for pointer-versus-keyboard focus rings and implicit submission.
5. Test native forwarding and trusted `maxlength` enforcement.

The original analysis below describes revision `c9d60c30b3`; its measurements and line references are baseline evidence. One independent subagent performed a separate read-only review, and its findings were compared with the main review. The follow-up below records the implementation approved after that analysis.

## Implementation follow-up

The main findings have been applied to gen2 tests and VRT stories. Component implementation, public documentation stories, shared test infrastructure, and 1st-gen remain unchanged.

- Added component-local [helpers](./gen2/packages/swc/components/text-field/test/helpers.ts) for required field/input lookup, actual form ownership, and fixture-wrapper disposal on callback success or failure.
- Added helper regressions covering rejected callbacks, callbacks that remove their field, missing fields/inputs/forms, and explicit external form association. The cleanup and missing-field regressions failed against the original patterns before the helpers were implemented.
- Converted all direct Text Field fixtures in the two behavioral test files to scoped cleanup. Existing warning spies still own and restore warning globals.
- Removed the duplicate native-validity assertion, overlapping bogus-type fixture, unnecessary initial fixture waits, full example renders in metadata-only tests, and repeated validation-source steps. Exact authored-message checks now live in the existing 25-transition matrix.
- Extended native binding coverage for initial attributes, updates, and removal of input hints and length constraints.
- Added trusted-browser submission checks with an associated submitter, without a submitter, and inside a shadow-root form. They verify exactly-once submission, the submitter and value, native invalid blocking, cancellation, and recovery.
- Added trusted keydown regressions for disabling, disconnecting, or disassociating the field before deferred submission. Playwright's clock advances the bridge's task deterministically; the tests do not use fixed sleeps.
- Added trusted maximum-length boundary/editing checks and pointer-versus-keyboard ring assertions. Native-input focus sentinels keep keyboard-navigation checks independent of WebKit's platform-specific button-tab behavior.
- Added disabled-prefix, invalid-description-only, and inherited-disabled invalid-message VRT cases. The matrix now has 68 cases per theme context, or 240 field instances across the three existing VRT stories.

The existing status-transition matrix, synthetic event contracts, slot mutation/reconnection checks, reset/restoration tests, browser accessibility assertions, and custom-property coverage were preserved. Broader theme/direction expansion and optional cosmetic warning helpers remain deferred; neither was necessary for the main cleanup.

### Follow-up validation

| Check                                                                                                           | Result                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `VITEST_BROWSER_INSTANCES=chromium,firefox,webkit yarn workspace @adobe/spectrum-wc test components/text-field` | Passed: 174 checks, 58 per browser, in 7.81 seconds                                                                               |
| Full Playwright run with the audit-only configuration, one worker, and zero retries                             | 137 of 138 passed: all new/modified browser checks passed in Chromium, Firefox, and WebKit; all three VRT rendering checks passed |
| Isolated unchanged WebKit narrow-screen scrolling test, repeated three times                                    | One passed; two failed because the region's `scrollLeft` stayed at zero after <kbd>ArrowRight</kbd>                               |
| `yarn type-check:gen2`                                                                                          | Passed                                                                                                                            |
| Targeted ESLint and Prettier on the five changed TypeScript files                                               | Passed                                                                                                                            |

The full browser command was `yarn node node_modules/@playwright/test/cli.js test --config /Users/miwhabonini/.copilot/session-state/e4fd351e-45d0-4498-9364-d8a96a272603/files/text-field-implementation.playwright.config.mjs --workers 1 --trace retain-on-failure`. That temporary configuration reused the package's three browser projects against a dedicated dev Storybook on port 6026 and added three temporary Chromium VRT-rendering checks. The VRT checks verified the new compositions, forced-color rendering, case counts, and custom-property border overrides without approving Chromatic image baselines.

The remaining WebKit failure is in the existing address-table scrolling check, whose code and public story were not changed. It also reproduces when run alone; it was not hidden with retries, relaxed assertions, or an unrelated component change. This prevents describing the full Playwright run as green. Earlier Firefox timeouts in two new cases did not reproduce in isolated tracing or the final single-worker run.

The isolated scrolling command was `yarn node node_modules/@playwright/test/cli.js test --config /Users/miwhabonini/.copilot/session-state/e4fd351e-45d0-4498-9364-d8a96a272603/files/text-field-implementation.playwright.config.mjs --project webkit --grep 'keeps the address matrix keyboard-scrollable' --repeat-each 3 --workers 1 --trace retain-on-failure`. Temporary validation scripts were removed afterward; logs and failure evidence remain in session storage.

### Consistency and validity pass

- **Code conformance:** targeted lint, formatting, and gen2 type-check pass. New helper lifecycle behavior has regression coverage; browser negatives use controlled virtual time rather than sleeps.
- **Plan validity:** no public API or runtime behavior changed. The existing migration plan's completed testing contracts remain intact; this follow-up does not mark a new migration phase complete.
- **Shared resources:** not applicable. The added helpers are component-local test utilities; no shared runtime resource or consumer was introduced.

## Original audit scope and measured baseline

The six primary story/test files contain 5,480 lines. The base and concrete implementations add 646 lines, for 6,126 lines across those eight files. Shared helpers, mixin/controller tests, styling, Storybook discovery, and CI configuration were also examined.

| Surface                                                                                                       | Inventory                         | Main responsibility                                                 |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| [Documentation stories](./gen2/packages/swc/components/text-field/stories/text-field.stories.ts)              | 17 stories; 764 lines             | Readable public examples, controls, states, and a working form demo |
| [Behavioral tests](./gen2/packages/swc/components/text-field/test/text-field.test.ts)                         | 33 test stories; 2,480 lines      | Component wiring, APIs, forms, validation, warnings, submission     |
| [Field-status tests](./gen2/packages/swc/components/text-field/test/field-status.test.ts)                     | 6 test stories; 516 lines         | All status transitions, reset semantics, validation eligibility     |
| [Playwright tests](./gen2/packages/swc/components/text-field/test/text-field.a11y.spec.ts)                    | 38 cases per browser; 1,036 lines | Trusted interaction, ARIA, geometry, styling, keyboard behavior     |
| [Main VRT](./gen2/packages/swc/components/text-field/test/vrt/text-field.vrt.ts)                              | 2 snapshot stories; 490 lines     | Dense visual permutations and forced colors                         |
| [Custom-property VRT](./gen2/packages/swc/components/text-field/test/vrt/text-field-custom-properties.vrt.ts) | 1 snapshot story; 194 lines       | 18 reference/override property pairs and manifest coverage          |

### Validation performed

| Command                                                                                                                                                                                                                            | Result                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `yarn workspace @adobe/spectrum-wc test components/text-field`                                                                                                                                                                     | Passed: 56 tests in 3 files, Chromium; 5.36 seconds                              |
| `yarn node node_modules/@playwright/test/cli.js test --config gen2/packages/swc/playwright.config.js gen2/packages/swc/components/text-field/test/text-field.a11y.spec.ts --list`                                                  | Passed: discovered 114 expanded cases, 38 each for Chromium, Firefox, and WebKit |
| `yarn node node_modules/@playwright/test/cli.js test --config /Users/miwhabonini/.copilot/session-state/e4fd351e-45d0-4498-9364-d8a96a272603/files/text-field-audit.playwright.config.mjs text-field/test/text-field.a11y.spec.ts` | Passed: all 38 Chromium cases; 19.4 seconds                                      |

The final command used a temporary, audit-only configuration derived from the package configuration: Chromium, two workers, zero retries, and a dedicated Storybook server on port 6026. Playwright owned and stopped that server. The repository remained unchanged after these runs. The temporary configuration is not part of this deliverable; its settings are documented here for reproducibility.

The Vitest run reported 460 ms for field-status tests, 741 ms for public stories, and 2,000 ms for behavioral tests. Setup/import/test aggregates overlap across files and should not be added together as wall time. One slot-backed validation test took approximately 445 ms; that is a measurement, not evidence that its observer checks should be removed.

The original audit did not measure a speedup. The follow-up correctness runs are not a controlled performance benchmark. The targeted suite was already relatively fast; most recommendations primarily improve maintenance and failure diagnosis.

### Runner distinctions that matter

- [Vitest](./gen2/packages/swc/vitest.config.js) runs the Storybook-driven behavioral surface and explicitly excludes VRT. Its default browser is Chromium; [CI behavioral jobs](./.circleci/continue_config.yml#L412) select Chromium, Firefox, and WebKit separately.
- The [package-local Playwright configuration](./gen2/packages/swc/playwright.config.js) defines three browsers. The [root gen2 accessibility project](./playwright.a11y.shared.config.ts#L48), used by the standard CI command, selects Desktop Chrome. These are different configurations for the same component specifications, not evidence that CI runs every Playwright case three times.
- The [Storybook accessibility runner](./gen2/packages/swc/.storybook/test-runner.ts) performs axe scans on rendered stories. Its CI catalog excludes behavioral test stories. Passing the 56 Vitest cases is not equivalent to passing that axe job.
- [Chromatic-only discovery](./gen2/packages/swc/.storybook/main.ts#L178) uses the VRT files and executes their play functions. Neither local validation run above verified visual baselines.

## Helper opportunities

### 1. Scoped fixture ownership

**Priority: high maintenance value. Confidence: high.**

The existing [fixture helper](./gen2/packages/swc/utils/test-utils.ts#L171) creates a wrapper, appends it to `document.body`, renders the template, waits for the component, and returns its first child. It does not provide a disposer.

The behavioral file has 13 lexical `fixture<TextField>` call sites, and the status file has another two. Several sites execute inside loops, so this is not a count of total runtime allocations.

Most warning tests remove `field.parentElement` only after assertions succeed. Examples begin at [enum validation](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L819), [missing accessible name](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L920), and [label conflicts](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1037). An assertion failure skips that cleanup.

[Status warning tests](./gen2/packages/swc/components/text-field/test/field-status.test.ts#L478) use `finally`, but remove the field rather than the wrapper, leaving an empty wrapper in the document.

Recommended shape: a local `withTextFieldFixture(template, callback)` built on the existing fixture utility, capturing its wrapper and removing that wrapper in `finally`. Keep the existing scoped `withWarningSpy`; do not introduce a second warning-spy implementation.

This would provide a single cleanup contract across both files. It addresses a confirmed ownership inconsistency. Cross-story contamination after a failure is a risk, not a failure demonstrated by this audit.

### 2. Required field/input lookup

**Priority: medium. Confidence: high.**

Repeated setup queries the field, waits for its update, resolves its native input, finds its form, and checks for missing elements. Examples include [restoration](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1317), [invalid contract](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1397), [slotted error lifecycle](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1509), and [submission](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L2183).

Use the existing [getComponent](./gen2/packages/swc/utils/test-utils.ts) for update-aware lookup and the component's `roleElement` for its native input. Add a small local wrapper that fails with a useful message when a required field or input is absent. Form tests can additionally require `field.form`.

Important boundaries:

- Do not infer the owning form from `closest('form')`. The suite already exercises a field associated through the `form` attribute.
- Keep optional parts, such as an absent invalid icon, nullable where absence is the actual assertion.
- Keep case-specific buttons, outputs, fieldsets, and message slots explicit.
- Do not turn this into a universal form-testing framework.

There is matching prior art: the [field-association controller tests](./gen2/packages/core/controllers/field-association-controller/stories/field-association-controller.test.ts#L43) already use small required-element helpers.

### 3. Small warning-message conversion helper

**Priority: low. Confidence: high.**

Across the two component test files, 14 scoped `withWarningSpy` callback sites repeatedly convert warning argument arrays to strings and search for phrases.

A local `warningMessages(calls)` or small phrase predicate would reduce noise. Keep each test's actual expected condition visible. Do not hide positive, negative, precedence, or warning-suppression assertions inside a generic helper.

The cleanup helper is more valuable than this cosmetic extraction. Do not create a new shared warning API merely to shorten a few `map` calls.

### 4. Small expected-state assertions, not a large scenario DSL

**Priority: optional. Confidence: medium.**

The two files contain 123 `step` blocks and 117 direct `updateComplete` awaits. Many waits are necessary after property changes; observer-backed error-text tests correctly use condition-based waiting.

A small assertion helper for stable invariants, such as native disabled/read-only state plus host validation eligibility, could reduce duplication in the status matrix. It should take a descriptive expectation object and leave transitions visible at the call site.

Do not replace explicit mutations with a large scenario builder. Do not remove waits globally. In particular, waiting for a Lit update does not necessarily mean a `MutationObserver`-driven validation update has finished.

## Redundancy and coverage ownership

### Certain, inexpensive cleanup

| Finding                                                                              | Evidence                                                                                                                                                                                                                                           | Safe action                                                                                        |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Identical assertion repeated without an intervening mutation                         | [Barred native constraints](./gen2/packages/swc/components/text-field/test/field-status.test.ts#L449) asserts `typeMismatch` twice in the reinstatement block                                                                                      | Remove one assertion                                                                               |
| Standalone bogus-type warning duplicates a case in the broader unsupported-type loop | [Enum validation](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L819) and the immediately following loop                                                                                                                       | Move its specific `expects "type"` check into the broader case, then remove the standalone fixture |
| Metadata-only tests render unrelated component examples                              | [OptionControlsTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L55) renders Playground; [StateStoriesTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L196) renders the six-field Labelling example | Use an inert render, or combine metadata assertions into one contract story                        |
| Extra initial update waits after the fixture helper has already awaited that update  | For example, [enum fixture setup](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L828)                                                                                                                                          | Remove only waits with no intervening mutation                                                     |

The metadata-only change avoids rendering seven field instances across those two tests while preserving the assertions. It is not a reason to create a Node test project: the relevant Node-project slot is currently commented out.

### Validation tests overlap, but are not interchangeable

The largest consolidation opportunity is spread across [InvalidContractTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1397), [SlottedErrorLifecycleTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1509), [SlotBackedValidationTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1597), [ValidationSourcesTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1707), and [status validation sources](./gen2/packages/swc/components/text-field/test/field-status.test.ts#L361).

Several sequences re-establish that authored invalid sets `customError`, clearing it removes the custom error, error text becomes the validation message, and native validity resumes afterward.

Recommended ownership:

| Contract                                                     | Recommended owner                                           | Distinct coverage to preserve                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Status-to-native-state and validation-eligibility invariants | Existing status-transition matrix                           | Every predecessor/successor pair, including clearing status                         |
| Native constraints versus authored validity                  | Focused validation-source tests                             | Pattern mismatch, required constraints, authored `valid` not bypassing required     |
| Error text as the custom validation message                  | One canonical invalid-contract or status case               | Exact message, fallback behavior, native invalid event/form blocking                |
| Live slot/message changes                                    | Slot-backed lifecycle tests                                 | Text edits, replacement, nested text, slot changes, disconnect/reconnect            |
| Reset and restoration                                        | Existing reset and restoration cases                        | Authored default value, transient validation status, retained interaction status    |
| Disabled form participation                                  | Form participation plus focused disabled integration checks | FormData inclusion, fieldset cascade, native input state, message/icon presentation |
| Public demo behavior                                         | FormBehaviorTest                                            | Submit output, reset button, disabled toggle, layout stability                      |

A concrete first reduction is the repeated clearing-custom-error step in the main validation-source test, already covered by the slotted-error lifecycle. The following pattern assertions must remain. In the status file, consolidate the repeated invalid-only invariant checks while preserving its exact-message assertion and authored-valid/required case.

Do not simply delete entire exported tests by title. Two tests with similar names often protect different update timing or lifecycle behavior.

### Duplication that should remain

- **All 25 status transitions:** five statuses, including no authored status, tested against every predecessor. Testing only the five final states would miss stale state left behind by a previous status.
- **Synthetic and trusted input:** synthetic events isolate synchronization contracts; actual browser editing establishes native dirty-value and default-action behavior.
- **VRT and computed-style checks:** a screenshot catches spatial appearance; a targeted style assertion identifies state precedence and exact override consumption.
- **DOM associations and browser accessibility checks:** cross-shadow ARIA reflection is not fully represented by every snapshot or axe result.
- **Reset versus restoration:** these are different public lifecycle operations.
- **390 px fit versus 320 px scrolling:** these validate complementary responsive behaviors, not duplicate geometry.
- **Controller/mixin tests and one component integration check:** shared mechanics still need evidence that Text Field wires them correctly. Repeating the entire shared matrix at component level is unnecessary.

## Missing or weaker coverage

These are coverage gaps, not demonstrated component defects.

### 1. Actual pointer-versus-keyboard focus-ring transitions

**Priority: high. Confidence: high.**

The [base implementation](./gen2/packages/core/components/text-field/TextField.base.ts#L198) maintains custom keyboard-focus state because native text inputs can match `:focus-visible` after pointer interaction. The [CSS](./gen2/packages/swc/components/text-field/text-field.css#L148) relies on that custom state.

The [trusted click test](./gen2/packages/swc/components/text-field/test/text-field.a11y.spec.ts#L678) proves label/padding/prefix clicks focus the input, but does not check ring suppression. The [Tab test](./gen2/packages/swc/components/text-field/test/text-field.a11y.spec.ts#L976) proves delegated focus, but does not check the ring. Existing message-click assertions exercise a different interaction.

Extend those existing cases to assert pointer focus has no keyboard ring, keyboard re-entry restores it, and clicking an already keyboard-focused control clears it. This adds meaningful coverage without another navigation for every assertion.

Forced-state VRT cannot replace this test: its [shared pseudo-state helper](./gen2/packages/swc/.storybook/helpers/pseudo-state.ts#L35) deliberately bypasses event bookkeeping by mirroring CSS selectors.

### 2. Trusted implicit submission

**Priority: high. Confidence: high.**

The [implicit-submission tests](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L2161) have a useful synthetic matrix. The Playwright file has no real <kbd>Enter</kbd>-submission test.

Add a small trusted-browser case proving exactly one submission, the correct submitter, invalid-form blocking, and consumer cancellation. A no-submitter case is also valuable because it exercises the other bridge path. Keep the synthetic matrix for unsupported/composition/disabled/default-submitter variants.

This specifically tests the interaction between native default behavior and the component's deferred submission bridge, rather than merely repeating event dispatch.

### 3. Native forwarding and trusted maximum length

**Priority: medium. Confidence: high.**

[Native input rendering](./gen2/packages/swc/components/text-field/TextField.ts#L157) forwards `inputmode`, `autocomplete`, and `maxlength`. The examples use autocomplete, but the component tests do not assert these bindings on the native input. There is no equivalent of the strong trusted `minlength` test for maximum length.

Add a compact binding table covering initial value, update, and removal. Add a trusted editing boundary for `maxlength`, asserting the native value, host value, and FormData agree. Typing is the minimum useful case; include paste if the existing browser utilities provide a reliable way to drive it.

Do not replace the existing minimum-length tests: their distinction between programmatic values and user-edited values is separate and important.

### 4. Deferred submission guards and shadow-root forms

**Priority: medium. Confidence: high.**

The [submission bridge](./gen2/packages/core/components/text-field/TextField.base.ts#L283) checks current disabled/connected/form state inside its deferred callback and explicitly searches a form rooted in a `ShadowRoot`. The current submission cases do not cover a shadow-root form or a field disabled/detached during keydown propagation.

Add focused cases for those paths. Negative assertions must observe the deferred boundary, not just the synchronous keydown handler. This report does not claim the existing negative tests are false positives: `userEvent.keyboard` can itself yield to timers, and that hypothesis was not demonstrated.

### 5. Small composite visual gaps

**Priority: medium. Confidence: high.**

The [visual state row](./gen2/packages/swc/components/text-field/test/vrt/text-field.vrt.ts#L211) includes disabled fields without prefixes/messages and invalid fields with explicit error text. Prefix cases are enabled. Add a few named compositions:

- Disabled prefix coloring, including forced colors.
- Invalid status with description only, without an error-text slot.
- Fieldset-disabled invalid field retaining messages while suppressing the invalid icon.

The latter two already have behavioral/computed-style checks. The missing layer is snapshot coverage, not all coverage.

### Lower-priority integration check

[PrefixTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L588) verifies the initial avatar and every field-size change. It does not replace or add an avatar after the field has settled. The [shared controller tests](./gen2/packages/core/controllers/slot-attribute-propagation-controller/test/slot-attribute-propagation-controller.test.ts#L174) already exercise dynamic slot propagation, so this is not a missing shared capability. At most, add one late-assignment integration step if this wiring has been regression-prone; do not copy the controller matrix.

### Gaps considered and ruled out

- Combined external and slotted descriptions are already covered by [FieldDescriptionMixin tests](./gen2/packages/core/mixins/test/field-description-mixin.test.ts#L64), including [external descriptions during error swaps](./gen2/packages/core/mixins/test/field-description-mixin.test.ts#L300).
- Native pattern mismatch, value sanitization, trusted minimum-length semantics, form-state synchronization during input, and error-text mutation/reconnection already have meaningful coverage.
- Selection-direction edge cases and broad platform autofill behavior are lower-value than the missing component-specific integration checks above. This audit does not recommend reproducing the browser's own input test suite.

## Story and VRT efficiency

### Public stories

The public stories are not the right place for a large test matrix. Keep them readable and preserve the usable form demo.

The long [FormBehaviorTest](./gen2/packages/swc/components/text-field/test/text-field.test.ts#L1793) mixes the demo's UI contract, layout stability, and component form semantics. A future cleanup should separate those responsibilities in the test structure, without necessarily creating many additional stories or page navigations. Keep UI-output assertions close to the demo; move repeated generic validity assertions to their canonical component cases.

Multi-example tests frequently select fields by ordinal position. Prefer stable identifiers or accessible names when an example already exposes them. Do not add test-only component APIs just to avoid indexes.

The local `captioned` story helper is not automatically replaceable by the shared VRT helper: its rich caption and above-content placement differ. Mapping the sizes story from the existing size constants is a reasonable small cleanup, but less valuable than fixture ownership.

### Visual matrix

The main VRT content contains 65 curated field cases. It renders once in light/LTR, once in dark/RTL, and once for forced colors: 195 field instances across the two main snapshot stories. The custom-property story adds 36 fields for 18 reference/override pairs. That is approximately 231 Text Field instances across three snapshots, not 231 independently isolated tests.

This is already using the project's intended dense-VRT approach. Medium-size reference cases repeated across rows help reviewers compare axes; they are not automatically waste.

One limitation: [Permutations](./gen2/packages/swc/components/text-field/test/vrt/text-field.vrt.ts#L477) correlates theme and direction. It does not test light/RTL or dark/LTR. If theme/direction interactions are a concern, add a small targeted set of those combinations rather than doubling every case.

The custom-property VRT already reuses coverage helpers and compares its case list with the generated [custom-elements manifest](./gen2/packages/swc/components/text-field/test/vrt/text-field-custom-properties.vrt.ts#L144). Keep that safeguard. Its accuracy depends on a current build manifest.

For border properties, the play function verifies the actual computed control border. For other properties, it verifies the override reaches the host and relies on the visual diff to prove consumption. Do not describe that host assertion as a complete computed-style test of every property.

The side-label setup does not make the row-gap case inert: shared [form-field CSS](./gen2/packages/swc/stylesheets/_lit-styles/form-fields.css#L104) still applies the gap above messages. No change is justified on that basis.

## Independent review comparison

The independent reviewer inspected the same implementation and test surfaces without changing files or running tests. The main review supplied runtime results and the final prioritization.

| Topic                                  | Main review                                                                        | Independent review                                                                           | Final conclusion                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Fixture ownership and required lookups | Identified repeated setup and failure-path cleanup problems                        | Independently identified the same patterns and existing helper reuse                         | Strong agreement; best first refactor                      |
| Validation overlap                     | Identified distributed invalid/customError/clearing assertions                     | Identified specific repeated clearing and status assertions                                  | Consolidate individual invariants, not whole suites        |
| Trusted focus and submission           | Identified missing real modality and Enter integration                             | Independently prioritized both highly                                                        | Best new regression coverage                               |
| Native forwarding                      | Identified unasserted input bindings and maxlength behavior                        | Independently identified the same gap                                                        | Add one compact binding table and a trusted boundary case  |
| Deferred submission lifecycle          | Main review considered the untested guards lower priority than trusted submission  | Independent review also highlighted shadow-root forms and disable/detach during propagation  | Include as a bounded second step, not a large new matrix   |
| VRT                                    | Main review quantified render count and theme/direction correlation                | Independent review added concrete disabled-prefix and invalid-message compositions           | Add a few targeted cases; do not multiply all axes         |
| Small redundancies                     | Main review found the duplicate typeMismatch assertion and metadata-only rendering | Independent review also found the overlapping bogus-type fixture and redundant initial waits | Low-risk cleanup after coverage ownership is explicit      |
| Shared inherited behavior              | Checked core tests before calling absent component cases gaps                      | Independently ruled out missing description-composition coverage                             | Avoid duplicating already-proven mixin/controller matrices |

There was no material disagreement about the main recommendations. The main caution is scope: source-level repetition alone is not enough to justify deleting browser, lifecycle, or visual layers.

## Suggested implementation order

1. **Mechanical helper pass:** introduce local required-part and scoped-fixture helpers; preserve assertions and story IDs. Remove the certain duplicate assertion, redundant initial waits, and unnecessary metadata renders. Expected gain: cleaner failure paths and less setup noise, with small runtime savings.
2. **Coverage additions:** extend existing trusted focus tests, then add narrow trusted submission and maxlength checks. Expected gain: protect the component-specific paths that synthetic tests and forced-state snapshots cannot verify.
3. **Ownership pass:** consolidate repeated validation-source assertions using the ownership table. Keep all transition, native-constraint, reset/restoration, and slot-lifecycle distinctions. Expected gain: fewer places to update the same contract.
4. **Visual pass:** add the few composite cases and, if warranted, representative uncorrelated theme/direction cases. Expected gain: better visual coverage without a Cartesian explosion.
5. **Measure again:** rerun the same targeted commands, then the relevant Firefox/WebKit jobs after behavior changes. Compare runtime and failure diagnostics before making broader runner changes.

Acceptance criteria for a refactor should be unchanged behavior, preserved unique coverage, cleanup on assertion failures, and clearer diagnostics. A percentage speedup or line-reduction target is not supported by the current evidence.

## Original audit limits

The runtime baseline covers Chromium only. Firefox/WebKit execution, the separate axe runner, Chromatic baselines, manual assistive-technology testing, and coverage instrumentation were not run for this analysis. Passing tests do not establish that the gaps above are defects, nor that every untested branch is important.
