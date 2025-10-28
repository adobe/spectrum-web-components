<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Getting involved

<!-- Document title (editable) -->

# Getting involved

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Welcome](#welcome)
- [Community & support](#community--support)
    - [External contributors](#external-contributors)
    - [Internal contributors](#internal-contributors)
- [How you can contribute](#how-you-can-contribute)
- [Contributor license agreement](#contributor-license-agreement)
- [Code of conduct](#code-of-conduct)
- [Pull requests](#pull-requests)
- [Branches](#branches)
- [Developing locally](#developing-locally)
- [Testing](#testing)
- [Documentation](#documentation)
- [Best practices & guidelines](#best-practices--guidelines)
    - [Code formatting](#code-formatting)
    - [Accessibility](#accessibility)
    - [Commit guidelines](#commit-guidelines)
- [Thank you](#thank-you)

</details>

<!-- Document content (editable) -->

## Welcome

Welcome! We're excited you're interested in improving Spectrum Web Components. Whether you're reporting bugs, adding new features, writing documentation, or helping other users, your contributions make this project better for everyone.

Here you'll find a broad overview of how you can get involved. Please read through these guidelines to help keep the contribution process smooth and to ensure we're all on the same page.

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
