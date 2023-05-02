---
layout: dev-mode.njk
title: 'Registry Conflicts: Spectrum Web Components'
displayName: Registry conflicts
slug: registry-conflicts
---

# Registry conflicts

Element names are unique, so if you try to register two different implementations of the same element via [window.customElements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements), you'll encounter an error like:

```
Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry':
the name "foo-bar" has already been used with this registry
```

You might hit this error when:

-   Multiple components import the redefined component as a dependency and the project's dependency tree has not been [deduped](https://docs.npmjs.com/cli/v9/commands/npm-dedupe?v=true).
-   Multiple components import out-of-date versions of the redefined component, such that there is no [semver-valid](https://docs.npmjs.com/about-semantic-versioning) version to satisfy all of them.
-   A package publishes a pre-built JavaScript blob instead of [import](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import)-able files, and includes web component dependency definitions in that blob instead of listing them as external.

## Resolution

First, verify that each `@spectrum-web-components` package in your `package.json` shares the same version. If `@spectrum-web-components/button` is on version `0.30.0`, then all other SWC packages should _also_ be on version `0.30.0`.

Further resolutions are package-manager dependent, but the goal state is the same: a _de-duped_ dependency tree where multiple versions of the same package are _hoisted_ into a single version.

Regardless of package manager, packages that share a dependency with un-resolvable semver ranges are not compatible with one another. The solution is typically for the package maintainers to bump their dependencies to a recent version.

If that isn't possible, package managers provide a way to _force_ version resolutions. However, forcing incompatible versions is likely to cause undefined or breaking behavior in your application:

-   [npm overrides](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides)
-   [yarn resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/)
-   [pnpm overrides](https://pnpm.io/package_json#pnpmoverrides)

### With npm or pnpm

Run [`(p)npm dedupe`](https://docs.npmjs.com/cli/v9/commands/npm-dedupe?v=true) to collapse multiple definitions of the same component into a single dependency in your tree.

To check for duplication, run [`npm list @spectrum-web-components/packagenamehere`](https://docs.npmjs.com/cli/v8/commands/npm-ls?v=true). This will show the branches of the dependency tree that include the conflicting package.

Also, consider setting `npm config set prefer-dedupe true` for npm to deduplicate packages by default. With this set, npm will dedupe by default, which is convenient for web component development.

### With yarn

Yarn [removed its dedupe command](https://classic.yarnpkg.com/en/docs/cli/dedupe), since in theory it dedupes on install. However, this does not seem to always be true.

If you are not able to switch to a package manager that can dedupe dependency trees automatically, then you may have to dedupe manually. With yarn, that involves:

-   Running `yarn list {packagename}` to see which versions are installed
-   Adding a commonly-valid version to [yarn's resolutions list](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) in package.json.
-   Running `yarn` to reinstall with resolutions.

## Future

The [Scoped custom element registries](https://wicg.github.io/webcomponents/proposals/Scoped-Custom-Element-Registries.html) proposal is being prototyped in Chrome and discussed in standards groups like the [WCCG](https://w3c.github.io/webcomponents-cg/2022.html#scoped-element-registries).

Scoped registries would allow for multiple custom element definitions for a single tag name to coexist within a page. While that will alleviate some pain, it will not be a panacea, because:

-   Shipping multiple versions of components will increase page-load size.
-   Some components that broadly manage state, or coordinate and orchestrate other components, will still require a single de-duplicated version on the page.

Experimentation with scoped registry polyfills showed unacceptable performance degradation for a large component library.

To support this feature in coming to browsers faster, [share your use case](https://github.com/WICG/webcomponents/issues/716) with implementors to help increase awareness and priority of this API.
