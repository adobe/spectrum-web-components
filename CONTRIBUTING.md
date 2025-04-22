Welcome! We’re excited you’re interested in improving Spectrum Web Components. Whether you’re reporting bugs, adding new features, writing documentation, or helping other users, your contributions make this project better for everyone.

Here you’ll find a broad overview of how you can get involved. Please read through these guidelines to help keep the contribution process smooth and to ensure we’re all on the same page.

-   [1. Community \& Support](#1-community--support)
    -   [1.1. External Contributors](#11-external-contributors)
    -   [1.2. Internal Contributors](#12-internal-contributors)
-   [2. Ways to Contribute](#2-ways-to-contribute)
-   [3. Contributor License Agreement](#3-contributor-license-agreement)
-   [4. Code of Conduct](#4-code-of-conduct)
-   [5. Using the Issue Tracker](#5-using-the-issue-tracker)
    -   [5.1. Before Submitting A Bug Report](#51-before-submitting-a-bug-report)
-   [6. Bug Reports](#6-bug-reports)
    -   [6.1. Issue Severity Classification](#61-issue-severity-classification)
-   [7. Feature Requests/New Component](#7-feature-requestsnew-component)
-   [8. Pull Requests](#8-pull-requests)
-   [9. Branches](#9-branches)
-   [10. Developing Locally](#10-developing-locally)
-   [11. Testing](#11-testing)
-   [12. Documentation](#12-documentation)
-   [13. Best Practices \& Guidelines](#13-best-practices--guidelines)
    -   [13.1. Code Formatting](#131-code-formatting)
    -   [13.2. Accessibility](#132-accessibility)
    -   [13.3. Commit Guidelines](#133-commit-guidelines)
-   [14. Thank You](#14-thank-you)

---

# 1. Community & Support

A fantastic first step to contributing is joining our community discussions. This is where you can:

-   Ask questions and troubleshoot with other users.
-   Propose new ideas or get feedback on your own.
-   Stay informed about what’s coming next.

## 1.1. External Contributors

If you need support or have a question about how something works, GitHub Discussions is the best place to start.

## 1.2. Internal Contributors

If you work for Adobe, our slack channel #spectrum_web_components has some great workflows to get you started. Be sure to read the Welcome Canvas when you join.

---

# 2. Ways to Contribute

There’s a common misconception that you need to code in order to contribute. In reality, there are many different ways to help:

-   Filing well-structured bug reports that show what’s broken and how to reproduce it.
-   Suggesting new features that improve the current design system.
-   Improving our documentation to make it clearer for the next person.
-   Reviewing pull requests from other community members and sharing feedback.
-   Helping other users on GitHub Discussions.
-   Advocating for the project on social media or at meetups.

Of course, contributing code is also welcome from fixing a bug to building a brand-new component. All types of contributions help keep Spectrum Web Components thriving.

---

# 3. Contributor License Agreement

We require all external contributors to sign our Contributor License Agreement (CLA). If you haven’t signed it before making your first contribution, please do so—otherwise, we can’t merge your changes.

---

# 4. Code of Conduct

Spectrum Web Components abides by the Adobe Code of Conduct. By participating, you agree to treat all community members kindly and respectfully. We’re committed to fostering a welcoming, inclusive environment.
Should any behavior fall short of these expectations, please report it to <Grp-opensourceoffice@adobe.com>.

---

# 5. Using the Issue Tracker

We use GitHub Issues for two purposes:

1. Bug Reports
2. Feature Requests (after initial discussion)

If you’re having a usage issue or need support, do not open an issue. Instead, reference the Community & Support section. This helps us keep issues focused on actual bugs and actionable tasks.

## 5.1. Before Submitting A Bug Report

1. Check the Open Issues to see if the problem has already been reported.
    1. TIP: Apply the component label to make your search process more straightforward.
2. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.
3. Check if you can reproduce the problem in the latest version of Spectrum Web Components.
4. If there are no related open issues and it is reproducible in isolation, then open a Bug Report.

---

# 6. Bug Reports

When you file a bug, please use the `Bug Report` template provided in GitHub. Include the following information:

1. A concise summary of the problem.
2. Relevant components involved in the issue.
3. Issue Severity based on our classifications defined below.
4. What you expected vs. what actually happened, along with any errors logged in the console.
5. Steps to reproduce the issue, preferably in an isolated environment, so that we can narrow down where the bug is originating from. (e.g., webcomponents.dev or CodePen). Be detailed if you write out the steps!
6. Relevant environment details (OS, browser, library version).

Clear bug reports speed up the triage process, help us replicate the issue, and keep the project robust.

## 6.1. Issue Severity Classification

Providing the correct issue severity classification helps us adequately assess and prioritize your issue. We reserve the right to adjust the severity of your bug during triage.
Below is our issue severity classification criteria:

| Severity Level | Description                                                                                                                                                                                                                                                                                                                                                     | Examples                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔥 SEV 1       | A critical design or functionality issue that breaks the design system, causes significant usability problems, or exposes critical security vulnerabilities. This issue impacts all users and/or essential workflows, making users unable to complete any tasks. Requires immediate attention.                                                                  | Broken navigation system, complete unresponsiveness on all devices, components not rendering, inaccessible primary actions, security vulnerabilities.<br><br>Accessibility: The end user is not able to complete core tasks or activities (e.g., key navigational elements not accessible via keyboard, missing or incorrect form labels that prevent screen reader users from completing forms or actions, critical color contrast issues that prevent users from reading or interacting with essential content). |
| 🔴 SEV 2       | A significant problem affecting the design, usability, or functionality of the system or components for a subset of users. This issue causes major disruptions and prevent users from completing tasks or workflows.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and blocks core user tasks (no known workaround).                   | Content that is out of view or unreachable by customers, critical buttons or links not functioning, or actions that cannot be submitted. Unintentional breaking changes causing disruptions in production environments.<br><br>Accessibility: Issue with a component or controller with widespread use and blocks core user tasks (no known workaround).                                                                                                                                                           |
| 🟠 SEV 3       | A design or functionality issue that causes noticeable errors or minor usability problems for users which either cause confusion or degrade the user experience, but do not prevent task completion.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and is either non-blocking for core user tasks or blocking for non-core user tasks. | Misleading labels, inconsistent component behavior, unexpected interactions, decreases in system performance.<br><br>Accessibility: Workarounds are available and discoverable for the end user to complete core user tasks, or the end user is not able to complete non-core user tasks (e.g., inadequate ARIA labels, improper focus management, insufficient color contrast for non-critical elements).                                                                                                         |
| 🟡 SEV 4       | A minor design flaw that affects user experience, but doesn't have a serious impact on overall usability or functionality. This issue does not prevent users from completing tasks.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria but has lower user impact.                                                                           | Minor visual inconsistencies, non-critical content misalignment, or minor layout issues.<br><br>Accessibility: A WCAG violation is present in areas not frequently visited by end users, or it has a lower impact on overall accessibility and usability.                                                                                                                                                                                                                                                          |
| 🟢 SEV 5       | A low-level design inconsistency or minor issue that slightly affects usability or aesthetic, with minimal impact on users.                                                                                                                                                                                                                                     | Slight color deviations, minor typographical errors, or small spacing inconsistencies that do not impact functionality.                                                                                                                                                                                                                                                                                                                                                                                            |

---

# 7. Feature Requests/New Component

Is there something you wish the project did differently? Have a new component in mind? We love hearing new ideas and are eager to collaborate!

-   Start with a discussion: Share your idea in Discussions to gather feedback and see if it aligns with project goals.
-   Open a feature request issue: After some positive initial conversation, open an issue using the `Feature Request` or `New Component` template with details and potential use cases.

---

# 8. Pull Requests

If you plan to fix a bug, create a feature, or improve documentation, follow the [Pull Request Guide](PULL_REQUESTS.md) to ensure you're contribution meets expectations for getting reviewed.

---

# 9. Branches

We keep things straightforward with branching:

-   `[username]/[short-description]` (e.g., `alex/fix-dropdown-bug`) is often all you need.
-   If your work references a known issue, you could also incorporate the issue number (e.g., `alex/123-bug-fix`).

Avoid editing distribution files (if present). Make changes to the source files, then allow the build system to generate any bundled or output files automatically.

---

# 10. Developing Locally

Read the steps outlined in the README.md to get your environment set up.

If you encounter hurdles, feel free to ask for help in your pull request or in the community forum.

---

# 11. Testing

Quality and stability are important. We require writing tests for any fixes or features you introduce. This helps ensure:

-   Bugs don’t resurface later.
-   New features work as intended for all users.
-   Overall library reliability remains high.

Read about our testing guidance in the README.md.

If you’re unsure how to write tests for certain parts of the library, don’t hesitate to ask maintainers for guidance. We appreciate every effort to keep the code solid!

---

# 12. Documentation

In addition to well-tested code, documentation is crucial. Whenever you add or change a feature,include documentation for it in the relevant areas:

-   **README.md**: Each component has a README within its directory. Ensure your changes are included here. This file is used in our generated documentation site.
-   **Comment Annotations**: We use comment-based documentation (JSDocs) so that references are generated automatically where possible.

Accessible, helpful docs are a huge win for everyone, especially newcomers.

---

# 13. Best Practices & Guidelines

## 13.1. Code Formatting

We rely on automated tools like Prettier or ESLint to enforce style preferences. Setting up these tools in your editor saves time and prevents minor style conflicts from slowing down reviews.

## 13.2. Accessibility

Since Spectrum Web Components is used by a diverse audience, we pay close attention to accessibility. Please keep features inclusive by:

-   Using semantic markup when possible.
-   Properly labeling interactive elements.
-   Ensuring focus states and keyboard navigation are well supported.

If you’re unsure about an accessibility detail, open a discussion or ask in your PR.

## 13.3. Commit Guidelines

As mentioned previously, we use Conventional Commit syntax:

    type(component?): subject
    //component is optional, but should reference the package you are updating

Examples:

-   `feat(sp-card): add shadow styles for theme consistency`
-   `fix(sp-action-menu): correct arrow key navigation in nested menus`
-   `docs: clarify how to submit bug reports`

This helps us track changes in a predictable way and automate versioning.

---

# 14. Thank You

We appreciate everyone who invests time, energy, and expertise into Spectrum Web Components. Your contributions—big or small—help this library evolve to serve a broader audience and remain at a high standard of quality.

If you have any suggestions for improving these guidelines, feel free to open a pull request or bring it up in our community discussions. We’re always eager to make the contribution experience better.

Happy contributing!
