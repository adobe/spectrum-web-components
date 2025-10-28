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

1. Run `git checkout main && git fetch && git pull && git clean -dfX` to ensure you are working with the latest code
2. Run `yarn install && yarn build` to install all dependencies and build the pre-processed assets for publication.
    1. Confirm no files were updated or modified
3. Scan the version summary for any unexpected changes
    1. In your IDE search `': major` , `': minor`, `': patch` , based on the results in the order of this search list, the highest level takes precedence
        1. exclude files: `.changeset/README.md`
4. Open your authenticator app to have it ready
5. Run`yarn changeset-publish`
6. Enter the one-time password from your authenticator for NPM.
    1. Wait for a fresh password; a stale timer might cause issues.
7. After the SWC packages are released, the React Wrapper packages will be generated.
    1. This multi-phase approach ensures that the wrapped packages share the same version as the standard packages.
8. Enter a new one-time password from your authenticator for NPM.
9. The `yarn publish:changeset` command will automatically commit the changes to main with a commit message of `chore: release new versions #publish`
    1. The docs site will publish automatically if the `#publish` string is included in the commit message and the check suite runs successfully.
10. Confirm the build on `main` passes

### Troubleshooting

If publishing fails with an error:

- Check the [list of tags](https://github.com/adobe/spectrum-web-components/tags) to see if new tags have been released for your publishing attempt.
- If they were, run `yarn publish:changeset` again.

---

## Publishing the documentation site manually

### From GitHub

1. Navigate to SWC's [Actions](https://github.com/adobe/spectrum-web-components/actions) and click the `Site publish` workflow.
2. At the top of the table, click the `Run workflow` dropdown — Use workflow from `main` branch, and click the `run workflow` button.

### From the terminal

If you have the [GitHub CLI](https://cli.github.com) installed, you can alternatively run `gh workflow run publish.yml --ref main` from the command line.

### References

[Running manual workflows](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow), GitHub documentation
