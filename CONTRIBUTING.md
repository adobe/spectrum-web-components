# Contributing to Spectrum Web Components

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to Spectrum Web Components which is hosted in the [Adobe Spectrum Web Components](https://github.com/adobe/spectrum-web-components) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table Of Contents

[Code of Conduct](#code-of-conduct)

[I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[Getting Started with Spectrum Web Components](#what-should-i-know-before-i-get-started)

I want to -

-   [use Spectrum Web Components in my React app](#use-spectrum-web-component-in-react-app)
-   [build a new component that's part of the Spectrum design system](#building-a-new-component)
-   [build a new app-specific component that is not part of the Spectrum design system](#suggesting-enhancements)

[How Can I Contribute?](#how-can-i-contribute)

-   [Reporting Bugs](#reporting-bugs)
-   [Suggesting Enhancements](#suggesting-enhancements)
-   [Your First Code Contribution](#your-first-code-contribution)
-   [Pull Requests](#pull-requests)

[Styleguides](#styleguides)

-   [Git Commit Messages](#git-commit-messages)
-   [TypeScript Styleguide](#javascript-styleguide)
-   [Spectrum Styleguide](#spectrum-styleguide)
-   [Documentation Styleguide](#documentation-styleguide)

[Additional Notes](#additional-notes)

-   [Pull Request Labels](#issue-and-pull-request-labels)

## Code of Conduct

This project and everyone participating in it is governed by the [Adobe Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [Grp-opensourceoffice@adobe.com](mailto:Grp-opensourceoffice@adobe.com)

## I don't want to read this whole thing I just have a question!!!

> **Note:** [Please don't file an issue to ask a question.](https://github.com/adobe/spectrum-web-components/discussions) You'll get faster results by using the resources below.

We have an official message board with a detailed FAQ and where the community chimes in with helpful advice if you have questions.

-   [Github Discussions, the official Spectrum Web Components message board](https://github.com/adobe/spectrum-web-components/discussions)
-   [Spectrum Web Components FAQ](https://github.com/adobe/spectrum-web-components/discussions/categories/q-a)

## Getting Started with Spectrum Web Components

### Use Spectrum Web Component In React App

swc-react is a collection of React wrapper components for the Spectrum Web Components (SWC) library, enabling you to use SWC in your React applications with ease. It relies on the @lit-labs/react package to provide seamless integration between React and the SWC library.
Follow Along [here](https://opensource.adobe.com/spectrum-web-components/using-swc-react/)

### Building a new component

Creating a new component from the command line can be done by running the following:

```
$ yarn new-package
```

This will scaffold your component's required architecture by prompting you for 2 data points - the desired name for your package and the name of the Spectrum CSS asset from which you will be building.

? SWC package name (i.e. color-area)

Note that your component name should be provided in kebab case and should relate as closely as possible to the Spectrum core naming.

? Spectrum CSS package name (i.e. colorarea)

You can find this information in the [Spectrum CSS GitHub project](https://github.com/adobe/spectrum-css) by finding the component package.json (i.e., components/accordion/package.json)

For additional information, please see the [generating components documentation](https://opensource.adobe.com/spectrum-web-components/guides/generating-components/) and capturing the value of the package name: "name": "@spectrum-css/accordion". In this example, that name is accordion. Note that the project scope @spectrum-css is stripped out of the response.

## How Can I Contribute?

### Contributor License Agreement

All third-party contributions to this project must be accompanied by a signed contributor
license agreement. This gives Adobe permission to redistribute your contributions
as part of the project. [Sign our CLA](http://opensource.adobe.com/cla.html). You
only need to submit an Adobe CLA one time, so if you have submitted one previously,
you are good to go!

## Reporting Bugs

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/adobe/spectrum-web-components/blob/main/.github/ISSUE_TEMPLATE/bug_report.yaml), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **`Closed`** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

### Before Submitting A Bug Report

-   **Check the [Issue Discussions](https://github.com/adobe/spectrum-web-components/issues).** You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem [in the latest version of Spectrum Web Components](https://studio.webcomponents.dev/workspace/adobe)
-   **Check the [faq](https://github.com/adobe/spectrum-web-components/discussions/categories/q-a) and the [discussions](https://github.com/adobe/spectrum-web-components/discussions)** for a list of common questions and problems.
-   **Perform a [search](https://github.com/adobe/spectrum-web-components/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue on the repository and provide the following information by filling in [the template](https://github.com/adobe/spectrum-web-components/blob/main/.github/ISSUE_TEMPLATE/bug_report.yaml).

[IMPORTANT] Explain the problem and include additional details to help maintainers reproduce the problem:

-   **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started Spectrum Web Components, e.g. which command exactly you used in the terminal, or how you started Spectrum Web Components otherwise. When listing steps, **don't just say what you did, but explain how you did it**.
-   **Provide specific examples to demonstrate the steps**. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
-   **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
-   **Explain which behavior you expected to see instead and why.**
-   **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

### Include details about your configuration and environment:

-   **Which version of Spectrum Web Components are you using?**
-   **What's the name and version of the OS you're using**?
-   **Are you running Spectrum Web Components in a virtual machine?**

## Your First Code Contribution

Unsure where to begin contributing to Spectrum Web Components? You can start by looking through these `beginner` and `help-wanted` issues:

-   [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
-   [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

If you want to read about using Spectrum Web Components or developing packages in Spectrum Web Components, the [Spectrum Web Components Make a Component Manual](https://flight-manual.Spectrum Web Components.io) is available online.

## Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Git Commit Messages

1. fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
2. feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
3. BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, 5. `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
   footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

## TypeScript Styleguide

All TypeScript code is linted with [Prettier](https://prettier.io/).

-   Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
-   Inline `export`s with expressions whenever possible

    ```js
    // Use this:
    export default class ClassName {

    }

    // Instead of:
    class ClassName {

    }
    export default ClassName
    ```

-   Place requires in the following order:
    -   Built in Node Modules (such as `path`)
    -   Local Modules (using relative paths)
-   Place class properties in the following order:
    -   Class methods and properties (methods starting with `static`)
    -   Instance methods and properties

## Spectrum Styleguide

Spectrum Web Components are a LitElement-powered web component library of patterns built on top of the Spectrum CSS specification. Styles for these components are made available (and, in some cases, customizable) via CSS Custom Properties, e.g. var(--spectrum-black). In this package, you will find the CSS Custom Properties that power the various color and size themes defined by Spectrum CSS.
For more information [click here](https://opensource.adobe.com/spectrum-web-components/tools/styles/)

## Documentation Styleguide

-   Use [JsDoc](https://github.com/Spectrum Web Components/Spectrum Web Componentsdoc).
-   Use [Markdown](https://daringfireball.net/projects/markdown).
-   Reference methods and classes in markdown with the custom `{}` notation:
    -   Reference classes with `{ClassName}`
    -   Reference instance methods with `{ClassName::methodName}`
    -   Reference class methods with `{ClassName.methodName}`

## Pull Request Labels

| Label name         | Description                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `work-in-progress` | Pull requests which are still being worked on, more changes will follow.                                  |
| `needs-review`     | Pull requests which need code review, and approval from maintainers or Spectrum Web Components core team. |
| `under-review`     | Pull requests being reviewed by maintainers or Spectrum Web Components core team.                         |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again.                  |
| `needs-testing`    | Pull requests which need manual testing.                                                                  |

## Security Issues

Security issues shouldn't be reported on this issue tracker. Instead, [file an issue to our security experts](https://helpx.adobe.com/security/alertus.html)
