# Conversational AI multi-artifact plan (working RFC)

## What this is

Working plan for multi-artifact behavior in Conversational AI patterns.

This doc is intentionally practical:

- first half = overview + plan
- second half = concrete TODOs by component/track

## Scope

In scope now:

- composer/prompt-field artifacts (pre-submit)
- user-message/thread artifacts (post-submit)
- component API updates needed for both
- accessibility behavior definition for both

Out of scope now:

- drag-and-drop behavior (follow-up)
- backend upload/storage/validation logic
- file processing and metadata editing

## Current snapshot (short)

- `swc-prompt-field` already supports multiple slotted artifacts and mixed types.
- `swc-upload-artifact` already supports `card` and `media` plus dismiss event.
- current system does not model per-artifact upload states yet.
- `swc-user-message` supports only single-mode rendering via `type="copy|card|media"`.
- current `swc-user-message` API cannot represent mixed multi-artifact + text composition in one message.

## User-message API direction (intentional breaking change)

Current `swc-user-message` is mode-based (`copy|card|media`) and assumes one visual message shape at a time.

That is not a scalable fit for target behavior, where one submitted user message can include:

- multiple artifacts
- mixed artifact types
- optional text in the same message

Decision for this RFC track:

- we will treat `swc-user-message` redesign as an intentional breaking API change
- move from mode-based API to composition-based API

Target shape:

- `swc-user-message` is a message container, not a single-type switch
- message can render:
  - artifact region (0..n)
  - text region (0..1)
- ordering/layout rules are defined by the component contract

Migration direction:

- replace `type="copy|card|media"` usage with explicit content composition
- document before/after examples in stories and migration notes
- keep visual parity where possible while removing mode coupling

## Ownership model

`swc-prompt-field`:

- composer layout, actions, and artifact region behavior
- upload trigger event surface
- optional max-artifact UI constraints

`swc-upload-artifact`:

- artifact visuals/variants
- artifact state rendering (loading/success/error)
- per-artifact actions and state semantics

`swc-user-message`:

- post-submit artifact + text presentation contract
- message-level artifact layout/overflow/a11y behavior

Consumer app:

- file acquisition (picker now, drag/drop later)
- file type and size validation
- upload transport and persistence
- mapping real upload status into component props/slots

## Delivery plan

1. Lock contracts

- finalize API names and behavior for prompt-field, upload-artifact, user-message touchpoints

2. Define interaction and accessibility behavior

- keyboard movement model
- screen-reader announcements
- state transitions and announcements

3. Implement component updates

- add non-breaking API additions
- add stories for new states/layouts
- add tests for behavior and a11y

4. Follow-up

- drag-and-drop support with same ownership split

---

## TODOs: `swc-prompt-field`

- [ ] Add `max-artifacts` API (name can still change if team wants)
- [ ] Define behavior when limit is reached:
  - [ ] upload affordance disabled/hidden rule
  - [ ] event emitted when user tries to add at limit (name TBD)
- [ ] Define artifact region keyboard behavior:
  - [ ] how focus enters artifact region
  - [ ] arrow key movement rules
  - [ ] how focus exits to next control
- [ ] Confirm overflow strategy for composer artifact strip:
  - [ ] wrap only
  - [ ] or capped row + overflow summary
- [ ] Update stories for all intended composer artifact combinations
- [ ] Add/extend tests for keyboard + a11y expectations

## TODOs: `swc-upload-artifact`

- [ ] Add `state` API:
  - [ ] `idle`
  - [ ] `uploading`
  - [ ] `success`
  - [ ] `error`
- [ ] Add `error-reason` API shape (enum/string decision)
- [ ] Add new additive variant for thumbnail + tag (name TBD)
- [ ] Define optional retry interaction for error state:
  - [ ] slot vs event vs both
- [ ] Define accessible naming requirements per variant
- [ ] Add screen-reader state messaging behavior
- [ ] Add stories for each state x variant matrix we commit to
- [ ] Add tests for dismiss/retry/state/a11y behavior

## TODOs: `swc-user-message` (post-submit artifacts)

- [ ] Replace mode-based API (`type="copy|card|media"`) with composition-based API
- [ ] Define API contract for submitted user message content:
  - [ ] artifact region contract (0..n)
  - [ ] text region contract (0..1)
  - [ ] any props/events needed for layout or state
- [ ] Define artifact + text composition rules in one message bubble
- [ ] Define layout rules for multiple and mixed artifact types
- [ ] Define overflow behavior for message-level artifact groups
- [ ] Define keyboard and screen-reader behavior for message artifacts
- [ ] Define state handoff expectations from composer to submitted message
- [ ] Add stories for key message layouts and states
- [ ] Add tests for layout behavior and a11y behavior
- [ ] Add migration notes from old `type` API to new composition API

## TODOs: cross-cutting decisions

- [ ] Finalize naming:
  - [ ] `max-artifacts`
  - [ ] artifact variant names
  - [ ] any new events
- [ ] Finalize what counts as component-owned vs consumer-owned behavior
- [ ] Document explicit non-goals in spike PR description
- [ ] Ensure docs clearly state: drag-and-drop is follow-up only

## PR notes (spike)

Must explicitly say:

- this spike includes composer + user-message artifact planning work
- drag-and-drop is intentionally deferred
- upload transport/validation remains consumer-owned
