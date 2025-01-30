# How to Contribute to Spectrum Web Components

First off, thanks for taking the time to contribute!

The following are a set of guidelines for contributing to Spectrum Web Components, which is hosted on the [Adobe Spectrum Web Components repository](https://github.com/adobe/spectrum-web-components). These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request if the need arises while contributing to the library.

## Code Of Conduct

This project adheres to the Adobe [code of conduct](CODE_OF_CONDUCT.md). By participating,
you are expected to uphold this code. Please report unacceptable behavior to
[Grp-opensourceoffice@adobe.com](mailto:Grp-opensourceoffice@adobe.com).

## TL;DR

> **Note:** [Please don't file an issue to ask a question.](https://github.com/adobe/spectrum-web-components/discussions) You'll get faster results by using the resources below.

We have an official message board with a detailed FAQ and where the community chimes in with helpful advice if you have questions.

-   [Spectrum Web Components FAQ](https://github.com/adobe/spectrum-web-components/discussions/categories/q-a): Your question may have been asked before, take a quick look at the FAQ to see previous questions that may help you.
-   [Github Discussions, the official Spectrum Web Components message board](https://github.com/adobe/spectrum-web-components/discussions): If you don't see a previously asked question, feel free to reach out to the team in the message board.

## How Can I Contribute?

### Contributor License Agreement

All third-party contributions to this project must be accompanied by a signed contributor
license agreement. [Sign our CLA](http://opensource.adobe.com/cla.html).

### Security Issues

Do not open up a GitHub issue if the bug is a security vulnerability in Spectrum Web Components, and instead to refer to our [security policy](https://helpx.adobe.com/security/alertus.html).

## Did you find a bug?

### Before Submitting A Bug Report

-   Check the [Issue Discussions](https://github.com/adobe/spectrum-web-components/issues).
-   You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem [in the latest version of Spectrum Web Components](https://studio.webcomponents.dev/workspace/adobe).

-   Perform a [search](https://github.com/adobe/spectrum-web-components/issues) to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

### Report bugs using Github's [issues](https://github.com/adobe/spectrum-web-components/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/adobe/spectrum-web-components/issues/new/choose); it's that easy!

### Write bug reports with detail, background, and sample code

Create an issue on the repository and provide the following information by filling in [the template](https://github.com/adobe/spectrum-web-components/blob/main/.github/ISSUE_TEMPLATE/bug_report.yaml).

-   A quick summary and/or background
-   Steps to reproduce -
    -   Please be specific!
    -   Please reproduce your issue in an isolated or abstract environment, preferrably [webcomponents.dev](https://studio.webcomponents.dev/workspace/adobe). Screenshots or videos from your local development environment are often not sufficient to help us determine if the issue originates from our library.
-   What you would expect to happen
-   What actually happens
-   Notes (for example why you think this might be happening, or stuff you tried that didn't work)
-   Issue severity

### Issue severity classification

Providing the correct issue severity classification helps us adequately assess and prioritize your issue.

Please be aware of our issue severity classification criteria:

<!-- prettier-ignore -->
| Severity Level | Description | Examples |
|---|---|---|
| **SEV 1** | A critical design or functionality issue that breaks the design system, causes significant usability problems, or exposes critical security vulnerabilities. This issue impacts all users and/or essential workflows, making users unable to complete any tasks. Requires immediate attention. | Broken navigation system, complete unresponsiveness on all devices, components not rendering, inaccessible primary actions, security vulnerabilities.<br><br>Accessibility: The end user is not able to complete core tasks or activities (e.g., key navigational elements not accessible via keyboard, missing or incorrect form labels that prevent screen reader users from completing forms or actions, critical color contrast issues that prevent users from reading or interacting with essential content). |
| **SEV 2** | A significant problem affecting the design, usability, or functionality of the system or components for a subset of users. This issue causes major disruptions and prevent users from completing tasks or workflows.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and blocks core user tasks (no known workaround). | Content that is out of view or unreachable by customers, critical buttons or links not functioning, or actions that cannot be submitted. Unintentional breaking changes causing disruptions in production environments.<br><br>Accessibility: Issue with a component or controller with widespread use and blocks core user tasks (no known workaround). |
| **SEV 3** | A design or functionality issue that causes noticeable errors or minor usability problems for users which either cause confusion or degrade the user experience, but do not prevent task completion.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria and is either non-blocking for core user tasks or blocking for non-core user tasks. | Misleading labels, inconsistent component behavior, unexpected interactions, decreases in system performance.<br><br>Accessibility: Workarounds are available and discoverable for the end user to complete core user tasks, or the end user is not able to complete non-core user tasks (e.g., inadequate ARIA labels, improper focus management, insufficient color contrast for non-critical elements). |
| **SEV 4** | A minor design flaw that affects user experience, but doesn't have a serious impact on overall usability or functionality. This issue does not prevent users from completing tasks.<br><br>Accessibility: Does not conform with WCAG 2.1 Level AA criteria but has lower user impact. | Minor visual inconsistencies, non-critical content misalignment, or minor layout issues.<br><br>Accessibility: A WCAG violation is present in areas not frequently visited by end users, or it has a lower impact on overall accessibility and usability. |
| **SEV 5** | A low-level design inconsistency or minor issue that slightly affects usability or aesthetic, with minimal impact on users. | Slight color deviations, minor typographical errors, or small spacing inconsistencies that do not impact functionality. |

## Do you intend to add a new feature or change an existing one?

-   Suggest your change in the [ideas list](https://github.com/adobe/spectrum-web-components/discussions/categories/ideas) and start writing code.

-   Do not open an issue on GitHub until you have collected positive feedback about the change. You can start on [Adding your idea here](https://github.com/adobe/spectrum-web-components/discussions/categories/ideas) under Ideas

-   Once your Idea or request is submitted, you can create an [issue](https://github.com/adobe/spectrum-web-components/issues/new/choose) with the New Component or a Feature Request template.

-   Please make sure that your PR follows our [best practices](https://opensource.adobe.com/spectrum-web-components/migrations/2021-8-11/#using-lit%402.0-inside-of-lit-html-and%2For-litelement) and [styleguide](https://spectrum.corp.adobe.com/page/design-tokens/#Usage-guidelines) before you submit for review

## Branching Strategy

### Branch Naming Convention

-   Use `[username]/[issue]` format for branches.
-   `[username]` identifies the contributor.
-   `[issue]` refers to the associated issue or feature number.

For e.g: Be descriptive after the /, like `john-doe/123-fix-bug`.

## Create your first Pull Request

-   Follow all instructions in [the template](https://github.com/adobe/spectrum-web-components/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
-   After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing.

## Git Commit Messages

### Commitlint

We use [Commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint) to help manage the semantic versions across the various packages in this library. Please be sure that you take this into consideration when submitting PRs to this repository. Generally, your commits should look like the following:

```bash
type(scope?): subject #scope is optional, but should reference the package you are updating
```

We maintain a specific standard of commit messages while committing to the respository. See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

## Browser support

When contributing to our system or filing an issue, please consider the target browsers we support.

We support the latest 2 major versions of these browsers for desktop:

-   Google Chrome
-   Mozilla Firefox
-   Microsoft Edge
-   Apple Safari for macOS

We do not support Microsoft Internet Explorer.

We support all viewport sizes across supported desktop browsers.

While our components are designed to be responsive and mobile-friendly, we do not yet fully support mobile browsers due to limited testing in mobile hardware. We encourage contributors to keep mobile compatibility in mind and to test updates on mobile devices when possible.

## Do you want to contribute to the Spectrum Web Components documentation?

Please read [Contributing Guidelines for documentation](https://github.com/adobe/spectrum-web-components#documentation)

Thanks! :heart: :heart: :heart:

The Spectrum Web Components Team
