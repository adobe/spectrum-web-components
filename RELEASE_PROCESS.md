# Releasing a new version of Spectrum Web Components

Users with permissions in the `@spectrum-web-components` organization on NPM can follow the following steps to create and publish a new version.

1. Merge all pull requests to be included in the release and wait for the `main` branch to show that it has completed the required CI jobs.
2. `git checkout main && git fetch && git pull && git clean -dfX`
3. `rm -rf node_modules packages projects tools`
4. `git checkout packages projects tools`
5. `yarn install`
6. `npm whoami` ensure that you are logged in with the user account for the public NPM registry
7. `yarn lerna-publish`
8. Scan the version summary for any unexpected changes.
    - Changes to the _major_ versions number are likely to point to undesired version numbers.
    - Changes to the _minor_ or _feature_ version number should be confirmed as correct against the changes that have been made since the last release.
9. `Y` to confirm.
10. Enter 2-factor authentication for npm.

The docs site will publish automatically if the `#publish` string is included in the commit message and the check suite runs successfully.

## Publishing the docs site manually

Navigate to SWC's [Actions](https://github.com/adobe/spectrum-web-components/actions) and click the `Build & publish site` link under the _Workflows_ heading.

At the top of the table you will see a `Run workflow` dropdown; click that and run it from the `main` branch.

[Running manual workflows](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow), GitHub documentation

If you have the [GitHub CLI](https://cli.github.com) installed, you can alternatively run `gh workflow run publish.yml --ref main` from the command line.
