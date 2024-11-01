---
layout: deprecation.njk
title: 'Deprecation Guide: Spectrum Web Components'
displayName: Deprecation Guide
slug: deprecation-guide
---

## Introduction

The deprecation process for Spectrum Web Components (SWC) outlines the process for identifying, communicating, and removing deprecated components from the library. This document provides process for managing deprecation and ensuring a smooth transition for consumers.

Things change and evolve in libraries like SWC, but we don't want consumers to be surprised by those changes. We think that by providing clearer expectations to when we intent to remove potentially useful APIs, consuming teams have the opportunity to talk with us to better understand their needs before we finalize changes. If a deprecation is unexpected to you please reach out to the SWC team.

## Deprecation timeline

By default the removal of functionality or a component is considered for the next major release after the major release for which it was marked as deprecated. For example, a function marked as deprecated during a SWC 1.x will be removed at the next major release, e.g. SWC 2.0.

## Deprecation policy

### Warning levels

Deprecation warnings are categorised into the following levels:

-   **Yellow**: Components are marked as deprecated but still functional. Users are encouraged to migrate to alternative solutions.

    <img src="https://github.com/adobe/spectrum-web-components/blob/dea262add8a832f8ec89ae54d77484b64758b139/.github/images/yellow-warning.png?raw=true" alt="Yellow warning" width="50%"/>

-   **Red**: Components are nearing removal and require immediate action for migration.

    <img src="https://github.com/adobe/spectrum-web-components/blob/3dcbf73f2fc9f207cddb39a5edf5bb5438eff88b/.github/images/red-warning.png?raw=true" alt="Red warning" width="50%"/>

### Communication

Deprecation notices will be added to the affected components, including a warning message and a link to documentation for migration guidance. Notices will be prominently displayed in the documentation and release notes.

## Deprecation process

1. **_Identification_**: Components or features that are no longer recommended for use will be identified through internal review or community feedback.
2. **_Announcement_**: Deprecation of a component will be announced in the release notes and on the SWC website. The announcement will include the deprecation level and migration guidance.
3. **_Warning Implementation_**: A deprecation warning will be added to the affected components, using the `window.__swc.warn` method to display the warning message.
4. **_Package.json Update_**: The `package.json` file of the deprecated component will be updated with a `deprecationNotice` key containing the deprecation message and guidance.
5. **_Documentation Update_**: Documentation for the deprecated component will be updated to include the deprecation notice and migration guidance.
6. **_Migration Period_**: Deprecated components will remain functional for a specified period to allow users to migrate to alternative solutions.
7. **_Removal:_** Deprecated components will be removed from the library in the 1.0.0 release. Prior to removal, the deprecation level will be changed to red to indicate the urgency of migration.

## Examples

### Deprecating a function, method or class

Its important functions, methods and classes are never immediately removed from code.
Instead they are deprecated for at least 1 major release before being removed.

A function,method or a class can be depreacted with a depreacted tag in the JSdoc to properly surface up to its context and API

```js
/**
* @deprecated since 0.42.1
*/

const enableScrollIntoView = () => {
    ....
}
```

### Adding Deprecation Notice

**Context**:

-   This example demonstrates how a deprecation notice is added to a component using the `window.__swc.warn` method.
-   The `window.__swc.warn` method is used to display a warning message to developers using the deprecated component.

**Purpose**:

-   The purpose of this deprecation notice is to inform developers using the deprecated component about its status and encourage them to migrate to alternative solutions in dev mode.
-   The notice provides a link to documentation for more information on migrating to alternative solutions.

```js
window.__swc.warn(
    this,
    `<${this.localName}> is deprecated and will be removed in the SWC 1.0 release. Use a Button Group to show any additional actions related to the most critical action.`,
    'https://opensource.adobe.com/spectrum-web-components/components/split-button/#deprecation',
    { level: 'deprecation' }
);
```

### Adding `package.json` update

**Context**:

-   This example demonstrates how the `package.json` file of a deprecated component is updated with a `deprecationNotice` key.
-   The `deprecationNotice` key contains a message informing users about the deprecation and providing guidance on alternative solutions.

**Purpose**:

-   The purpose of updating the `package.json` file with a `deprecationNotice` key is to provide a clear and visible indication to users that the component is deprecated.
-   This helps users to easily identify the deprecated component and access guidance on migrating to alternative solutions.

```json
{
    "name": "@spectrum-web-components/some-component",
    "version": "0.0.1",
    "deprecationNotice": "@spectrum-web-components/some-component is deprecated and will be removed in some future release."
}
```

## Backward compatibility

Breaking changes in Spectrum Web Components will only happen in the platform releases (ie: major version releases). Any planned breaking changes will be communicated with advance notice through the deprecation method and documentation.

Deprecations will be removed at the next major release, if possible. If the specifics for a deprecation can't be constrained to the next major release, we'll minimally mark things as deprecated for 2 releases or six months (whatever is smaller).
