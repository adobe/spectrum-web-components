<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Patching dependencies

<!-- Document title (editable) -->

# Patching dependencies

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About patches](#about-patches)
- [Creating a patch](#creating-a-patch)
- [How patches work](#how-patches-work)
- [Updating existing patches](#updating-existing-patches)
- [Best practices](#best-practices)

</details>

<!-- Document content (editable) -->

## About patches

Sometimes you may need to temporarily patch a dependency to fix a bug or add functionality while waiting for an upstream fix. This project uses **Yarn 4's built-in patching system** instead of external tools like `patch-package`.

## Creating a patch

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

## How patches work

- Patches are automatically stored in `.yarn/patches/` directory
- They are applied automatically during `yarn install`
- Patches are version-specific and will need to be recreated if the dependency version changes
- All patches are committed to the repository so they apply for all contributors

## Updating existing patches

To modify an existing patch:

```bash
yarn patch <package-name> --update
```

This will extract the current patched version, allowing you to make additional changes.

## Best practices

- **Keep patches minimal**: Only change what's necessary to fix the specific issue
- **Document the reason**: Add comments in your pull request explaining why the patch is needed
- **Plan for removal**: Patches should be temporary until the upstream fix is available
- **Test thoroughly**: Ensure your patch doesn't break other functionality

For more details, see the [Yarn patching documentation](https://yarnpkg.com/features/patching).
