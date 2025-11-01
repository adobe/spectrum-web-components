<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Releasing SWC

<!-- Document title (editable) -->

# Releasing SWC

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Prerequisites](#prerequisites)
    - [Main successfully builds](#main-successfully-builds)
    - [The correct version of Node is installed](#the-correct-version-of-node-is-installed)
    - [Github Token is set up](#github-token-is-set-up)
    - [Logged in to NPM](#logged-in-to-npm)
    - [NPM 2FA authenticator app](#npm-2fa-authenticator-app)
- [Releasing to NPM — the good stuff](#releasing-to-npm--the-good-stuff)
    - [Troubleshooting](#troubleshooting)
- [Publishing the documentation site manually](#publishing-the-documentation-site-manually)
    - [From GitHub](#from-github)
    - [From the terminal](#from-the-terminal)
    - [References](#references)

</details>

<!-- Document content (editable) -->

Users with permissions in the `@spectrum-web-components` organization on NPM can follow these steps to create and publish a new version.

## Prerequisites

### Main successfully builds

Merge all pull requests to be included in the release, and wait for the `main` branch to show that it has completed the required Circle CI jobs.

Check [Circle Ci build for `main`](https://app.circleci.com/pipelines/github/adobe/spectrum-web-components?branch=main) shows a `success` status. 1. If it failed, click `rerun` dropdown and select `rerun from failed`. 2. If it continues to fail, investigate further until you can successfully get the `main` branch building.

---

### The correct version of Node is installed

This is important to confirm before next step because differing node versions will cause build issues.

#### Using Node Version Manager

Run `nvm use` (assumes a Node Version Manager install), and confirm you’re on an operable version of Node.

#### Manually checking

1. Run `node --version` to see what version you have installed
2. Check `.nvmrc` for node version requirements.
3. If the versions don't match, run `node install [version]`

#### Troubleshooting

If you need to install the correct yarn version and/or have issues with `yarn` command not being recognized, run `corepack enabled`. Yarn 4 uses corepack and needs to be enabled to access the commands.

---

### Github Token is set up

Check you have a GitHub token set up, run `echo $GITHUB_TOKEN`.

#### Generate a Github token

1. If you do not have one, set it up in [Github settings > Developer settings > Personal access tokens](https://github.com/settings/personal-access-tokens)
    1. Create a classic token
        - Note: SWC changeset release token
        - Set the expiration to a year or less
        - Scopes:
            - `repo (all)`
            - `read:user`
2. Add generated token to `~/.zshrc` with `export GITHUB_TOKEN='token'`
    - Make sure there isn't another export with the same name
3. Close your terminal to reset your profile, open terminal back up

---

### Logged in to NPM

Run `npm whoami` ensure that you are logged in with the user account for the public NPM registry.

If not logged in, run `npm login` to sign in to your account.

---

### NPM 2FA authenticator app

1. Go to `Account Settings` on NPM
2. Click `Modify 2FA` in the Two-Factor Authentication section
3. Follow the instructions to configure the authenticator app (i.e. Google Authenticator) of your choice
    1. Should be able generate a 6-digit password that updates regularly

---

## Releasing to NPM — the good stuff

The publishing workflow is handled by a single unified script (`scripts/publish.js`) that automates the entire process: cleaning, building, versioning, publishing, and git operations.

1. **Prepare your workspace:**
    - Run `git checkout main && git fetch && git pull` to ensure you have the latest code
    - Confirm the working directory is clean with `git status`
2. **Review changesets:**
    - Scan the `.changeset` directory for pending changes
    - In your IDE search `': major`, `': minor`, `': patch` to verify the release impact
        - Exclude files: `.changeset/README.md`
        - The highest level takes precedence (major > minor > patch)
    - Confirm the changes match your expectations
3. **Prepare for publishing:**
    - Open your authenticator app to have it ready
    - You'll need to enter a one-time password twice during the process:
        1. Once for the main SWC packages
        2. Once for the React wrapper packages
4. **Run the publish command:**
    - **Regular release:** `yarn publish`
        - Creates git tags
        - Publishes to npm with `latest` tag
        - Commits changes to `main`
    - **Snapshot release:** `yarn publish:snapshot`
        - No git tags
        - Publishes to npm with `snapshot` tag
        - No git commits
    - **Custom tag release:** `node ./scripts/publish.js --snapshot --tag beta`
        - No git tags
        - Publishes to npm with custom tag (e.g., `beta`, `alpha`, `rc`, `nightly`)
        - No git commits
5. **What happens during publishing:**
    1. The script cleans all build artifacts and reinstalls dependencies
    2. Builds all packages (1st-gen and 2nd-gen)
    3. Generates custom elements manifests
    4. Versions packages with changesets
    5. Publishes to npm (you'll enter your first OTP here)
    6. Builds React wrapper packages
    7. Publishes React wrappers to npm (you'll enter your second OTP here)
    8. For regular releases: commits changes and creates git tags
6. **Verify the release:**
    - For regular releases, confirm the build on `main` passes
    - Check the [tags page](https://github.com/adobe/spectrum-web-components/tags) to verify new tags were created
    - The docs site will publish automatically if the commit message includes `#publish` and checks pass

### Troubleshooting

If publishing fails with an error:

- Check the [list of tags](https://github.com/adobe/spectrum-web-components/tags) to see if new tags have been released for your publishing attempt.
- If they were, run `yarn publish` again (or the appropriate command for your release type).

### Custom npm tags

For special releases like beta, alpha, nightly, or release candidates, you can use custom npm tags with the `--snapshot` and `--tag` flags:

```bash
# Beta release
node ./scripts/publish.js --snapshot --tag beta

# Alpha release
node ./scripts/publish.js --snapshot --tag alpha

# Nightly release
node ./scripts/publish.js --snapshot --tag nightly

# Release candidate
node ./scripts/publish.js --snapshot --tag rc
```

Users can then install these versions with:

```bash
yarn add @spectrum-web-components/button@beta
yarn add @spectrum-web-components/button@alpha
yarn add @spectrum-web-components/button@nightly
yarn add @spectrum-web-components/button@rc
```

---

## Publishing the documentation site manually

### From GitHub

1. Navigate to SWC's [Actions](https://github.com/adobe/spectrum-web-components/actions) and click the `Site publish` workflow.
2. At the top of the table, click the `Run workflow` dropdown — Use workflow from `main` branch, and click the `run workflow` button.

### From the terminal

If you have the [GitHub CLI](https://cli.github.com) installed, you can alternatively run `gh workflow run publish.yml --ref main` from the command line.

### References

[Running manual workflows](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow), GitHub documentation
