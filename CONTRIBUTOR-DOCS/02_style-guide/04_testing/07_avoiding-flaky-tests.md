<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Avoiding flaky tests

<!-- Document title (editable) -->

# Avoiding flaky tests

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

    - [Wait for components to be ready](#wait-for-components-to-be-ready)
    - [Avoid fixed timeouts](#avoid-fixed-timeouts)
    - [Handle race conditions](#handle-race-conditions)
    - [Use deterministic content](#use-deterministic-content)
    - [Isolate test state](#isolate-test-state)

</details>

<!-- Document content (editable) -->

Flaky tests fail sometimes and pass other times. They waste time and erode trust in the test suite. Here are common causes and fixes, drawn from real fixes in this repository.

## Wait for components to be ready

Never assert on a component before it finishes rendering. Use `getComponent` or `getComponents` (which call `updateComplete` internally) instead of raw `querySelector`:

```typescript
// Good: waits for the component to finish rendering
const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

// Bad: component might not be ready yet
const badge = canvasElement.querySelector('swc-badge') as Badge;
```

## Avoid fixed timeouts

Do not use `setTimeout` or `sleep` to wait for things to happen. Use deterministic waits:

```typescript
// Good: wait for a specific condition
await badge.updateComplete;

// Bad: arbitrary delay
await new Promise((r) => setTimeout(r, 500));
```

## Handle race conditions

When waiting for async state changes, check the current state first, then wait for events. This pattern from the overlay flaky test fix prevents race conditions:

```typescript
// Good: check first, then wait
if (overlay.state === 'opened') {
  return Promise.resolve();
}

return await Promise.race([
  waitUntil(() => overlay.state === 'opened'),
  oneEvent(overlay, 'sp-opened'),
]);

// Bad: wait and check together (race condition)
return await waitUntil(
  () => overlay.state === 'opened' || oneEvent(overlay, 'sp-opened')
);
```

## Use deterministic content

Avoid random data, timestamps, or any content that changes between runs. This especially matters for VRT:

```typescript
// Good: static, predictable content
render: () => html`<swc-badge variant="informative">Active</swc-badge>`

// Bad: random content
render: () => html`<swc-badge>${Math.random()}</swc-badge>`
```

## Isolate test state

Each test should be independent. Use `withWarningSpy` (which handles setup and teardown) rather than sharing state across tests. If you use `setupSwcWarningSpy` directly, always restore in a `finally` block.
