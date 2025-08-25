# Contributing best practices <!-- omit from toc -->

Welcome! We're excited you're interested in improving Spectrum Web Components. Whether you're reporting bugs, adding new features, writing documentation, or helping other users, your contributions make this project better for everyone.

Here you'll find a broad overview of how you can get involved. Please read through these guidelines to help keep the contribution process smooth and to ensure we're all on the same page.

- [Community \& support](#community--support)
    - [External contributors](#external-contributors)
    - [Internal contributors](#internal-contributors)
- [How you can contribute](#how-you-can-contribute)
- [Contributor license agreement](#contributor-license-agreement)
- [Code of conduct](#code-of-conduct)
- [Using the issue tracker](#using-the-issue-tracker)
    - [Before submitting a bug report](#before-submitting-a-bug-report)
- [Bug reports](#bug-reports)
    - [Issue severity classification](#issue-severity-classification)
- [Feature requests/new component](#feature-requestsnew-component)
- [Pull requests](#pull-requests)
- [Branches](#branches)
- [Developing locally](#developing-locally)
- [Testing](#testing)
- [Patching dependencies](#patching-dependencies)
    - [Creating a patch](#creating-a-patch)
    - [How patches work](#how-patches-work)
    - [Updating existing patches](#updating-existing-patches)
    - [Best practices](#best-practices)
- [Documentation](#documentation)
- [Best practices \& guidelines](#best-practices--guidelines)
    - [Code formatting](#code-formatting)
    - [Accessibility](#accessibility)
    - [Commit guidelines](#commit-guidelines)
- [Thank you](#thank-you)

---

## Community & support

A fantastic first step to contributing is filing an issue. This is where you can:

- Ask questions, file bugs, and troubleshoot with other users.
- Propose new features and ideas or get feedback on your own through a linked pull request.
- Additionally, you can check GitHub Discussions to stay up-to-date with any major announcements about the project.

### External contributors

**Adobe Employees, read Internal contributors section below.**
If you need support or have a question about how something works, filing an issue is the best place to start. A team member will be in touch to either triage your issue or follow-up with you in the comments.

### Internal contributors

If you work for Adobe, our Slack channel #spectrum_web_components has some great workflows to get you started. Be sure to read the Welcome Canvas when you join.

---

## How you can contribute

There's a common misconception that you need to code in order to contribute. In reality, there are many different ways to help:

- Filing well-structured bug reports that show what's broken and how to reproduce it.
- Suggesting new features that improve the current design system.
- Improving our documentation to make it clearer for the next person.
- Reviewing pull requests from other community members and sharing feedback.
- Helping other users on GitHub Discussions.
- Advocating for the project on social media or at meetups.

Of course, contributing code is also welcome from fixing a bug to building a brand-new component. All types of contributions help keep Spectrum Web Components thriving.

---

## Contributor license agreement

We require all external contributors to sign our Contributor License Agreement (CLA). If you haven't signed it before making your first contribution, please do so—otherwise, we can't merge your changes.

---

## Code of conduct

Spectrum Web Components abides by the Adobe Code of Conduct. By participating, you agree to treat all community members kindly and respectfully. We're committed to fostering a welcoming, inclusive environment.
Should any behavior fall short of these expectations, please report it to <Grp-opensourceoffice@adobe.com>.

---

## Using the issue tracker

We use GitHub Issues for two purposes:

1. Bug Reports
2. Feature Requests (after initial discussion)

If you're having a usage issue or need support, do not open an issue. Instead, reference the Community & Support section. This helps us keep issues focused on actual bugs and actionable tasks.

### Before submitting a bug report

1. Check the [Open Issues](https://github.com/adobe/spectrum-web-components/issues) to see if the problem has already been reported.
    - TIP: Apply the component label to make your search process more straightforward.
2. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.
3. Check if you can reproduce the problem in the latest version of Spectrum Web Components.
4. If there are no related open issues and it is reproducible in isolation, then open a [Bug Report](https://github.com/adobe/spectrum-web-components/issues/new?template=bug_report.yaml).

---

## Bug reports

When you file a bug, please use the `Bug Report` template provided in GitHub. Include the following information:

- A concise summary of the problem.
- Relevant components involved in the issue.
- Issue Severity based on our classifications defined below.
- What you expected vs. what actually happened, along with any errors logged in the console.
- Steps to reproduce the issue, preferably in an isolated environment, so that we can narrow down where the bug is originating from. (e.g., webcomponents.dev or CodePen). Be detailed if you write out the steps!
- Relevant environment details (OS, browser, library version).

Clear bug reports speed up the triage process, help us replicate the issue, and keep the project robust.

### Issue severity classification

Providing the correct issue severity classification helps us adequately assess and prioritize your issue. We reserve the right to adjust the severity of your bug during triage.
Below is our issue severity classification criteria:

| Severity level | Description                                                                                                                                                                                                                                                                                                                                                     | Examples                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔥 SEV 1       | A critical design or functionality issue that breaks the design system, causes significant usability problems, or exposes critical security vulnerabilities. This issue impacts all users and/or essential workflows, making users unable to complete any tasks. Requires immediate attention.                                                                  | Broken navigation system, complete unresponsiveness on all devices, components not rendering, inaccessible primary actions, security vulnerabilities.<br><br>Accessibility: The end user is not able to complete core tasks or activities (e.g., key navigational elements not accessible via keyboard, missing or incorrect form labels that prevent screen reader users from completing forms or actions, critical color contrast issues that prevent users from reading or interacting with essential content). |
| 🔴 SEV 2       | A significant problem affecting the design, usability, or functionality of the system or components for a subset of users. This issue causes major disruptions and prevent users from completing tasks or workflows.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and blocks core user tasks (no known workaround).                   | Content that is out of view or unreachable by customers, critical buttons or links not functioning, or actions that cannot be submitted. Unintentional breaking changes causing disruptions in production environments.<br><br>Accessibility: Issue with a component or controller with widespread use and blocks core user tasks (no known workaround).                                                                                                                                                           |
| 🟠 SEV 3       | A design or functionality issue that causes noticeable errors or minor usability problems for users which either cause confusion or degrade the user experience, but do not prevent task completion.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and is either non-blocking for core user tasks or blocking for non-core user tasks. | Misleading labels, inconsistent component behavior, unexpected interactions, decreases in system performance.<br><br>Accessibility: Workarounds are available and discoverable for the end user to complete core user tasks, or the end user is not able to complete non-core user tasks (e.g., inadequate ARIA labels, improper focus management, insufficient color contrast for non-critical elements).                                                                                                         |
| 🟡 SEV 4       | A minor design flaw that affects user experience, but doesn't have a serious impact on overall usability or functionality. This issue does not prevent users from completing tasks.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria but has lower user impact.                                                                           | Minor visual inconsistencies, non-critical content misalignment, or minor layout issues.<br><br>Accessibility: A WCAG violation is present in areas not frequently visited by end users, or it has a lower impact on overall accessibility and usability.                                                                                                                                                                                                                                                          |
| 🟢 SEV 5       | A low-level design inconsistency or minor issue that slightly affects usability or aesthetics, with minimal impact on users.                                                                                                                                                                                                                                    | Slight color deviations, minor typographical errors, or small spacing inconsistencies that do not impact functionality.                                                                                                                                                                                                                                                                                                                                                                                            |

---

## Feature requests/new component

Is there something you wish the project did differently? Have a new component in mind? We love hearing new ideas and are eager to collaborate!

- Start with a discussion: Share your idea in Discussions to gather feedback and see if it aligns with project goals.
- Open a feature request issue: After some positive initial conversation, open an issue using the `Feature Request` or `New Component` template with details and potential use cases.

---

## Pull requests

If you plan to fix a bug, create a feature, or improve documentation, follow the [Pull Request Guide](PULL_REQUESTS.md) to ensure you're contribution meets expectations for getting reviewed.

---

## Branches

We keep things organized with a branch naming strategy:

- `[username]/[short-description]` (e.g., `alex/fix-dropdown-bug`) is often all you need.
- If your work references a known issue, you could also incorporate the issue number (e.g., `alex/123-bug-fix`).

Avoid editing distribution files (if present). Make changes to the source files, then allow the build system to generate any bundled or output files automatically.

---

## Developing locally

Read the steps outlined in the [README.md](README.md) to get your environment set up.

If you encounter hurdles, feel free to ask for help in your pull request or in the community forum.

---

## Testing

Quality and stability are important. We require writing tests for any fixes or features you introduce. This helps ensure:

- Bugs don't resurface later.
- New features work as intended for all users.
- Overall library reliability remains high.

Read about our testing guidance in the [README.md](README.md).

If you're unsure how to write tests for certain parts of the library, don't hesitate to ask maintainers for guidance. We appreciate every effort to keep the code solid!

---

## Patching dependencies

Sometimes you may need to temporarily patch a dependency to fix a bug or add functionality while waiting for an upstream fix. This project uses **Yarn 4's built-in patching system** instead of external tools like `patch-package`.

### Creating a patch

1. **Extract the package** for editing:

    ```bash
    yarn patch <package-name>
    ```

    Example:

    ```bash
    yarn patch @web/test-runner-playwright
    ```

2. **Edit the extracted files** in the temporary directory that Yarn creates. Yarn will show you the path where you can make your changes.

3. **Commit the patch** once you're done editing:

    ```bash
    yarn patch-commit -s <temp-folder-path>
    ```

    Example:

    ```bash
    yarn patch-commit -s /private/var/folders/.../user
    ```

### How patches work

- Patches are automatically stored in `.yarn/patches/` directory
- They are applied automatically during `yarn install`
- Patches are version-specific and will need to be recreated if the dependency version changes
- All patches are committed to the repository so they apply for all contributors

### Updating existing patches

To modify an existing patch:

```bash
yarn patch <package-name> --update
```

This will extract the current patched version, allowing you to make additional changes.

### Best practices

- **Keep patches minimal**: Only change what's necessary to fix the specific issue
- **Document the reason**: Add comments in your pull request explaining why the patch is needed
- **Plan for removal**: Patches should be temporary until the upstream fix is available
- **Test thoroughly**: Ensure your patch doesn't break other functionality

For more details, see the [Yarn patching documentation](https://yarnpkg.com/features/patching).

---

## Documentation

In addition to well-tested code, documentation is crucial. Whenever you add or change a feature,include documentation for it in the relevant areas:

- **README.md**: Each component has a README within its directory. Ensure your changes are included here. This file is used in our generated documentation site.
- **Comment annotations**: We use comment-based documentation ([JSDocs](https://jsdoc.app/)) so that references are generated automatically where possible.

Accessible, helpful docs are a huge win for everyone, especially newcomers.

---

## Best practices & guidelines

### Code formatting

We rely on automated tools like Prettier, ESLint, and Stylelint to enforce style preferences. Setting up these tools in your editor saves time and prevents minor style conflicts from slowing down reviews.

### Accessibility

Since this project is used by a diverse audience, the accessibility of our product is of utmost importance. Features will be evaluated for inclusivity by:

- The use of semantic markup.
- Labeled interactive elements with appropriate accordance's.
- Accounting for appropriate states, such as focus and keyboard navigation, according to [standards](https://www.w3.org/WAI/perspective-videos/keyboard/).

If you're unsure about an accessibility detail, the [Web Accessibility Initiative (WAI) ARIA Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) is a good place to start. You can also open a discussion or ask in your PR.

### Commit guidelines

As mentioned previously, we use [Conventional Commit](https://www.conventionalcommits.org) syntax:

    type(component?): subject
    //component is optional, but should reference the package you are updating

Examples:

- `feat(sp-card): add shadow styles for theme consistency`
- `fix(sp-action-menu): correct arrow key navigation in nested menus`
- `docs: clarify how to submit bug reports`

This helps us track changes in a predictable way and automate versioning.

---

## Thank you

We appreciate everyone who invests time, energy, and expertise into Spectrum Web Components. Your contributions—big or small—help this library evolve to serve a broader audience and remain at a high standard of quality.

If you have any suggestions for improving these guidelines, feel free to open a pull request or bring it up in our community discussions. We're always eager to make the contribution experience better.

Happy contributing!
