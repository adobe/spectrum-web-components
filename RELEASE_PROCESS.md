# Releasing a new version of SWC

Users with permissions against the `@spectrum-web-components` organization on NPM can follow the following steps to create and publish a new version of the SWC library.

1. merge outstanding PRs and wait for `main` show that it has completed the required CI jobs
2. `git checkout main`
3. `git pull`
4. `rm -rf node_modules packages projects tools`
5. `git checkout packages`
6. `git checkout projects`
7. `git checkout tools`
8. `yarn`
9. `npm whoami` ensure that you are logged in with the user account for the public NPM registry
10. `yarn lerna-publish`
11. scan the version summary for any unexpected changes

-   changes to the _major_ versions number are likely to point to undesired version numbers
-   changes to the _minor_ or _feature_ version number should be confirmed as correct against the changes that have been made since the last release

12. `Y` to confirm
13. enter npm’s 2-factor auth
14. Go to [CircleCI](https://app.circleci.com/pipelines/github/adobe) and once the commit to `main` with the new versions is ready, press the 👍🏼 button on the "site-approve" job to publish a new version of the documentation site
