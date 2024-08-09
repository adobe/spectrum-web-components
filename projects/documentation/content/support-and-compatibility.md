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
