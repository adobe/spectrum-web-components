<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Using the issue tracker

<!-- Document title (editable) -->

# Using the issue tracker

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Before creating a new issue](#before-creating-a-new-issue)
- [Filing a bug report](#filing-a-bug-report)
- [Classifying issue severity](#classifying-issue-severity)
- [Requesting a feature or a new component](#requesting-a-feature-or-a-new-component)

</details>

<!-- Document content (editable) -->

We use GitHub Issues for two purposes:

1. Bug Reports
2. Feature Requests (after initial discussion)

If you're having a usage issue or need support, do not open an issue. Instead, reference the Community & Support section. This helps us keep issues focused on actual bugs and actionable tasks.

## Before creating a new issue

1. Check the [Open Issues](https://github.com/adobe/spectrum-web-components/issues) to see if the problem has already been reported.
    - TIP: Apply the component label to make your search process more straightforward.
2. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.
3. Check if you can reproduce the problem in the latest version of Spectrum Web Components by forking a code example in [Stackblitz](https://stackblitz.com/orgs/custom/SWC-Team/collections/spectrum-web-components). 
4. If there are no related open issues and it is reproducible in isolation, then open a [Bug Report](https://github.com/adobe/spectrum-web-components/issues/new?template=bug_report.yaml).

## Filing a bug report

When you file a bug, please use the `Bug Report` template provided in GitHub. Include the following information:

- A concise summary of the problem.
- Relevant components involved in the issue.
- Issue Severity based on our classifications defined below.
- What you expected vs. what actually happened, along with any errors logged in the console.
- Steps to reproduce the issue, preferably in an isolated environment, so that we can narrow down where the bug is originating from. (e.g., webcomponents.dev or CodePen). Be detailed if you write out the steps!
- Relevant environment details (OS, browser, library version).

Clear bug reports speed up the triage process, help us replicate the issue, and keep the project robust.

## Classifying issue severity

Providing the correct issue severity classification helps us adequately assess and prioritize your issue. We reserve the right to adjust the severity of your bug during triage.
Below is our issue severity classification criteria:

| Severity level | Description                                                                                                                                                                                                                                                                                                                                                     | Examples                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔥 SEV 1       | A critical design or functionality issue that breaks the design system, causes significant usability problems, or exposes critical security vulnerabilities. This issue impacts all users and/or essential workflows, making users unable to complete any tasks. Requires immediate attention.                                                                  | Broken navigation system, complete unresponsiveness on all devices, components not rendering, inaccessible primary actions, security vulnerabilities.<br><br>Accessibility: The end user is not able to complete core tasks or activities (e.g., key navigational elements not accessible via keyboard, missing or incorrect form labels that prevent screen reader users from completing forms or actions, critical color contrast issues that prevent users from reading or interacting with essential content). |
| 🔴 SEV 2       | A significant problem affecting the design, usability, or functionality of the system or components for a subset of users. This issue causes major disruptions and prevent users from completing tasks or workflows.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and blocks core user tasks (no known workaround).                   | Content that is out of view or unreachable by customers, critical buttons or links not functioning, or actions that cannot be submitted. Unintentional breaking changes causing disruptions in production environments.<br><br>Accessibility: Issue with a component or controller with widespread use and blocks core user tasks (no known workaround).                                                                                                                                                           |
| 🟠 SEV 3       | A design or functionality issue that causes noticeable errors or minor usability problems for users which either cause confusion or degrade the user experience, but do not prevent task completion.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and is either non-blocking for core user tasks or blocking for non-core user tasks. | Misleading labels, inconsistent component behavior, unexpected interactions, decreases in system performance.<br><br>Accessibility: Workarounds are available and discoverable for the end user to complete core user tasks, or the end user is not able to complete non-core user tasks (e.g., inadequate ARIA labels, improper focus management, insufficient color contrast for non-critical elements).                                                                                                         |
| 🟡 SEV 4       | A minor design flaw that affects user experience, but doesn't have a serious impact on overall usability or functionality. This issue does not prevent users from completing tasks.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria but has lower user impact.                                                                           | Minor visual inconsistencies, non-critical content misalignment, or minor layout issues.<br><br>Accessibility: A WCAG violation is present in areas not frequently visited by end users, or it has a lower impact on overall accessibility and usability.                                                                                                                                                                                                                                                          |
| 🟢 SEV 5       | A low-level design inconsistency or minor issue that slightly affects usability or aesthetics, with minimal impact on users.                                                                                                                                                                                                                                    | Slight color deviations, minor typographical errors, or small spacing inconsistencies that do not impact functionality.                                                                                                                                                                                                                                                                                                                                                                                            |

## Requesting a feature or a new component

Is there something you wish the project did differently? Have a new component in mind? We love hearing new ideas and are eager to collaborate!

- Start with a discussion: Share your idea in Discussions to gather feedback and see if it aligns with project goals.
- Open a feature request issue: After some positive initial conversation, open an issue using the `Feature Request` or `New Component` template with details and potential use cases.
