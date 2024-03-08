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
    -   Reproduce your issue [here](https://studio.webcomponents.dev/workspace/adobe)
-   What you would expect to happen
-   What actually happens
-   Notes (for example why you think this might be happening, or stuff you tried that didn't work)

## Do you intend to add a new feature or change an existing one?

-   Suggest your change in the [ideas list](https://github.com/adobe/spectrum-web-components/discussions/categories/ideas) and start writing code.

-   Do not open an issue on GitHub until you have collected positive feedback about the change. You can start on [Adding your idea here](https://github.com/adobe/spectrum-web-components/discussions/categories/ideas) under Ideas

-   Once your Idea or request is submitted, you can create an [issue](https://github.com/adobe/spectrum-web-components/issues/new/choose) with the New Component or a Feature Request template.

-   Please make sure that your PR follows our [best practices](https://opensource.adobe.com/spectrum-web-components/migrations/2021-8-11/#using-lit%402.0-inside-of-lit-html-and%2For-litelement) and [styleguide](https://spectrum.corp.adobe.com/page/design-tokens/#Usage-guidelines) before you submit for review

## Branching Strategy

### Branch Naming Convention:

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

## Do you want to contribute to the Spectrum Web Components documentation?

Please read [Contributing Guidelines for documentation](https://github.com/adobe/spectrum-web-components#documentation)

Thanks! :heart: :heart: :heart:

The Spectrum Web Components Team
