---
layout: introduction.njk
title: 'Support and compatibility: Spectrum Web Components'
displayName: Support and compatibility
slug: support-and-compatibility
---

# Support and compatibility: Spectrum Web Components

This page provides comprehensive information on versioning, public APIs, browser support, and issue severity classification to ensure a seamless integration experience for developers. Below, you'll find detailed guidelines and policies to help you understand our commitment to maintaining the stability and compatibility of Spectrum Web Components.

## Versioning

Starting from version 1.0.0, Spectrum Web Components follows semantic versioning ([semver](https://semver.org/)). We regularly release patch versions, which do not contain breaking changes. When a breaking change occurs, it will be done in a major version release to avoid breaking existing applications depending on the old version. Major version releases will be communicated in advance, and migration guides will be provided.

### Beta versions

To provide early access to upcoming releases, we maintain a beta tag that points to the next minor version. The beta tag will always correspond to the next minor version incremented from the latest stable release. For example, if the latest tagged release is `1.2.1`, the beta tag will be `1.3.0-beta.0`.

You can find the respective `beta` version of the documentation website under the following link: https://swcpreviews.z13.web.core.windows.net/beta/docs/

You can install the beta version of a specific Spectrum Web Components package by using the`@beta` tag with your package manager. For example, to install the beta version of the `@spectrum-web-components/button` package, run:

```bash
yarn add @spectrum-web-components/button@beta
```

Consumers using the beta tag can expect a relatively stable experience but should be prepared for potential changes or issues. This tag is ideal for those who want to preview or test new features before they are officially released.

We encourage consumers to report any issues they encounter. Your feedback is valuable in helping us improve the final release.

## Public APIs

Our public API consists of:

- Component APIs (properties, attributes, slots, events, functions)
- TypeScript definitions
- File import paths

## Browser Support

We support the latest 2 major versions of these browsers for desktop:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari for macOS

We do not support Microsoft Internet Explorer.

We support all viewport sizes across supported desktop browsers. While our components are designed to be responsive and mobile-friendly, we do not yet fully support mobile browsers due to limited testing on mobile hardware. We advise testing updates on mobile devices before updating and are happy to address any reported issues.
