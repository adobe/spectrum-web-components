---
layout: guide.njk
title: 'Support and compatibility: Spectrum Web Components'
displayName: Support and compatibility
slug: support-and-compatibility
---

# Support and compatibility: Spectrum Web Components

This page provides comprehensive information on versioning, public APIs, browser support, and issue severity classification to ensure a seamless integration experience for developers. Below, you'll find detailed guidelines and policies to help you understand our commitment to maintaining the stability and compatibility of Spectrum Web Components.

## Versioning

Starting from version 1.0.0, Spectrum Web Components strictly follows semantic versioning ([semver](https://semver.org/)). We regularly release patch versions, which do not contain breaking changes. When a breaking change occurs, it will be done in a major version release to avoid breaking existing applications depending on the old version. Major version releases will be communicated in advance, and migration guides will be provided.

## Public APIs

Our public API consists of:

-   Component APIs (properties, attributes, slots, events, functions)
-   TypeScript definitions
-   File import paths

## Browser Support

We support the latest 2 major versions of these browsers for desktop:

-   Google Chrome
-   Mozilla Firefox
-   Microsoft Edge
-   Apple Safari for macOS

We do not support Microsoft Internet Explorer.

We support all viewport sizes across supported desktop browsers. While our components are designed to be responsive and mobile-friendly, we do not yet fully support mobile browsers due to limited testing on mobile hardware. We advise testing updates on mobile devices before updating and are happy to address any reported issues.

## Reporting bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/adobe/spectrum-web-components/issues/new/choose); it's that easy!

### Writing bug reports

Create an issue on the repository and provide the following information by filling in [the template](https://github.com/adobe/spectrum-web-components/blob/main/.github/ISSUE_TEMPLATE/bug_report.yaml):

-   A quick summary and/or background
-   Steps to reproduce
    -   Please be specific!
    -   Reproduce your issue [here](https://studio.webcomponents.dev/workspace/adobe)
-   What you would expect to happen
-   What actually happens
-   Notes (for example, why you think this might be happening, or stuff you tried that didn't work)
-   Issue severity (please refer to the table below)

### Issue severity classification

Providing the correct issue severity classification allows us to more adequately assess and prioritize your issue.

| Severity Level | Description                                                                                                                                                                                                                                                                                                                                           | Examples                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SEV 1**      | A critical design or functionality issue that breaks the design system, causes significant usability problems, or exposes critical security vulnerabilities. This issue impacts all users and/or essential workflows, making users unwilling or unable to complete any tasks. Requires immediate attention.                                           | Broken navigation system, complete unresponsiveness on all devices, components not rendering, inaccessible primary actions, security vulnerabilities. Accessibility: The end user is not able to access the product or complete core user tasks or activities (key navigational elements not accessible via keyboard, missing or incorrect form labels that prevent screen reader users from completing forms or actions, critical color contrast issues that prevent users from reading or interacting with essential content). |
| **SEV 2**      | A significant problem affecting the design, usability, or functionality of the system or components for a subset of users. These issues cause major disruptions and prevent users from completing tasks or workflows. Accessibility: Does not conform with WCAG 2.1 Level AA criteria and blocks core user tasks (no known workaround).               | Content that is out of view or unreachable by customers, critical buttons or links not functioning or actions that cannot be submitted. Unintentional breaking changes causing disruptions in production environments. Accessibility: Issue with a component or controller with widespread use and blocks core user tasks (no known workaround).                                                                                                                                                                                 |
| **SEV 3**      | A design or functionality issue that causes noticeable errors or minor usability problems for users. These defects cause confusion or degrade user experience but do not prevent task completion. Accessibility: Does not conform with WCAG 2.1 Level AA criteria and is either non-blocking for core user tasks or blocking for non-core user tasks. | Misleading labels, inconsistent component behavior, unexpected interactions, decreases in system performance. Accessibility: Workarounds are available and discoverable for the end user to complete core user tasks, or the end user is not able to complete non-core user tasks (inadequate ARIA labels, improper focus management, insufficient color contrast for non-critical elements).                                                                                                                                    |
| **SEV 4**      | A minor design flaw that affects user experience but doesn't have a serious impact on overall usability or functionality. These issues do not prevent users from completing tasks. Accessibility: Does not conform with WCAG 2.1 Level AA criteria but has lower user impact.                                                                         | Minor visual inconsistencies, non-critical content misalignment, or minor layout issues. Accessibility: A WCAG violation is present in areas not frequently visited by end users or has a lower impact on overall accessibility and usability.                                                                                                                                                                                                                                                                                   |
| **SEV 5**      | A low-level design inconsistency or minor issue that slightly affects usability or aesthetics, with minimal impact on users.                                                                                                                                                                                                                          | Slight color deviations, minor typographical errors, or small spacing inconsistencies that do not impact functionality.                                                                                                                                                                                                                                                                                                                                                                                                          |
