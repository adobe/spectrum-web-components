<!---
    - Following conventional commit format, provide a general summary of your changes in the title above.
    - Acceptable commit types in order of severity (high to low): feat, fix, docs, style, chore, perf, and test. Commit types are defined in PULL_REQUESTS.md.
    - For example,`type(component): general summary`
-->

## Description

<!--- Describe your changes in detail -->

## Motivation and context

<!--- Why is this change required? What problem does it solve? -->

## Related issue(s)

<!---
    - If suggesting a new feature or change, please discuss it in an issue first.
    - If fixing a bug, include the issue number where the reviewers can find a description of the bug with steps to reproduce.
    - If you're an Adobe employee, add a Jira ticket number but DO NOT LINK directly to Jira.
-->

- fixes [Issue Number]

## Screenshots (if appropriate)

---

## Author's checklist

<!--- Go over all the following points, and put an `x` in all the boxes that apply.  If you're unsure about any of these, don't hesitate to ask. We're here to help! -->

- [ ] I have read the **[CONTRIBUTING](<(https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTING.md)>)** and **[PULL_REQUESTS](<(https://github.com/adobe/spectrum-web-components/blob/main/PULL_REQUESTS.md)>)** documents.
- [ ] I have reviewed at the Accessibility Practices for this feature, see: [Aria Practices](https://www.w3.org/TR/wai-aria-practices/)
- [ ] I have added automated tests to cover my changes.
- [ ] I have included a well-written changeset if my change needs to be published.
- [ ] I have included updated documentation if my change required it.

---

## Reviewer's checklist

- [ ] Includes a Github Issue with appropriate flag or Jira ticket number without a link
- [ ] Includes thoughtfully written changeset if changes suggested include `patch`, `minor`, or `major` features
- [ ] Automated tests cover all use cases and follow best practices for writing
- [ ] Validated on all supported browsers
- [ ] All VRTs are approved before the author can update Golden Hash

### Manual review test cases

<!---
    - For the author, please describe in detail what reviewers should test.
    - Include links and manual steps for how the reviewer should go through to verify your changes.
    - Be sure to include all areas of the codebase that might be affected. Any components that use these changes for a dependency should be cross-checked for regressions.
    - For example, changes to Menu Item will affect Picker, Menu, and Action Menu.
-->

- [ ] _Descriptive Test Statement_
  1. Go [here](url)
  2. Do this action
  3. Expect this result

- [ ] _Descriptive Test Statement_
  1. Go [here](url)
  2. Do this action
  3. Expect this result

### Device review

<!--- Verify the above manual tests and visual accuracy utilizing an emulator like Polypane browser or on an actual device. -->

- [ ] Did it pass in Desktop?
- [ ] Did it pass in (emulated) Mobile?
- [ ] Did it pass in (emulated) iPad?

## Accessibility testing checklist

<!---
    Manual accessibility testing is required because automated tools cannot catch all issues (e.g. focus order, screen reader announcements, keyboard flow).
    You must document your keyboard and screen reader testing steps below. Reviewers will use this checklist during review.
    See: [Accessibility testing guide](https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTOR-DOCS/01_contributor-guides/09_accessibility-testing.md)
-->

**Required:** Complete each applicable item and document your testing steps (replace the placeholders with your component-specific instructions).

- [ ] **Keyboard** (required — document steps below) — _What to test for:_ Focus order is logical; <kbd>Tab</kbd> reaches the component and all interactive descendants; <kbd>Enter</kbd>/<kbd>Space</kbd> activate where appropriate; arrow keys work for tabs, menus, sliders, etc.; no focus traps; <kbd>Escape</kbd> dismisses when applicable; focus indicator is visible.
  1. Go [here](url)
  2. Do this action
  3. Expect this result

- [ ] **Screen reader** (required — document steps below) — _What to test for:_ Role and name are announced correctly; state changes (e.g. expanded, selected) are announced; labels and relationships are clear; no unnecessary or duplicate announcements.
  1. Go [here](url)
  2. Do this action
  3. Expect this result
