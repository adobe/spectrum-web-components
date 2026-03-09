<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / PR review checklist

<!-- Document title (editable) -->

# PR review checklist

<!-- Document content (editable) -->

Use this checklist when reviewing test code in pull requests:

- [ ] Test file follows the five-section structure
- [ ] Each test story uses `step` with a descriptive label
- [ ] Every `expect()` call includes a descriptive message as the second argument
- [ ] Tests use `getComponent` / `getComponents` instead of raw `querySelector`
- [ ] Property mutations are followed by `await element.updateComplete`
- [ ] Warning tests use `withWarningSpy` and include both positive and negative cases
- [ ] Valid variant/size values are imported from the types file, not hardcoded
- [ ] ARIA roles, labels, and states are tested for interactive components
- [ ] Keyboard interactions are tested and verify ARIA state changes
- [ ] ARIA snapshot taken after every state change (selection, expansion, etc.)
- [ ] ARIA snapshot tests and aXe tests exist for the component
- [ ] No hardcoded timeouts or `setTimeout` usage
- [ ] No shared mutable state between test stories
- [ ] Coverage meets or exceeds thresholds
