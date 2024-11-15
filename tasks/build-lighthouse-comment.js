#!/usr/bin/env node

/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fs from 'fs';
import prettyBytes from 'pretty-bytes';

const latestURL = 'https://opensource.adobe.com/spectrum-web-components/';
const mainURL = 'https://main--spectrum-web-components.netlify.app/';
const winnerSign = ' 🏆'; // Emoji to indicate the best performance

const totalIndex = 0;
const fontIndex = 1;
const scriptIndex = 2;
const stylesheetIndex = 3;
const documentIndex = 4;

// Format resource usage by index and add winner sign if applicable
const formatResourceByIndex = (index, resource, resourcesRaw, winner) =>
    resource === 'transferSize'
        ? prettyBytes(resourcesRaw[index][resource], {
              minimumFractionDigits: 2,
          }) + (winner ? winnerSign : '')
        : resourcesRaw[index][resource] + (winner ? winnerSign : '');

// Format all resource usage categories
const formatResources = (resource, resourcesRaw, winners) => ({
    total: formatResourceByIndex(
        totalIndex,
        resource,
        resourcesRaw,
        winners.total
    ),
    scripts: formatResourceByIndex(
        scriptIndex,
        resource,
        resourcesRaw,
        winners.scripts
    ),
    stylesheet: formatResourceByIndex(
        stylesheetIndex,
        resource,
        resourcesRaw,
        winners.stylesheet
    ),
    document: formatResourceByIndex(
        documentIndex,
        resource,
        resourcesRaw,
        winners.document
    ),
    font: formatResourceByIndex(
        fontIndex,
        resource,
        resourcesRaw,
        winners.font
    ),
});

// Format all resources for size and count
const formatAllResources = (resourcesRaw, winners) => ({
    size: formatResources('transferSize', resourcesRaw, winners.size),
    count: formatResources('requestCount', resourcesRaw, winners.count),
});

// Determine if the current context is the winner for a specific resource
const getWinnerByIndex = (index, test, context, competitorA, competitorB) => {
    return (
        context[index][test] < competitorA[index][test] &&
        context[index][test] < competitorB[index][test]
    );
};

// Get winners for all resource categories
const getWinners = (test, context, competitorA, competitorB) => ({
    total: getWinnerByIndex(
        totalIndex,
        test,
        context,
        competitorA,
        competitorB
    ),
    scripts: getWinnerByIndex(
        scriptIndex,
        test,
        context,
        competitorA,
        competitorB
    ),
    stylesheet: getWinnerByIndex(
        stylesheetIndex,
        test,
        context,
        competitorA,
        competitorB
    ),
    document: getWinnerByIndex(
        documentIndex,
        test,
        context,
        competitorA,
        competitorB
    ),
    font: getWinnerByIndex(fontIndex, test, context, competitorA, competitorB),
});

// Get winners for all resources (size and count)
const getAllWiners = (context, competitorA, competitorB) => ({
    size: getWinners('transferSize', context, competitorA, competitorB),
    count: getWinners('requestCount', context, competitorA, competitorB),
});

// Compare resource usage between branch, main, and latest
const compareResourceUsage = (branch, main, latest) => {
    const branchWinners = getAllWiners(branch, latest, main);
    const mainWinners = getAllWiners(main, branch, latest);
    const latestWinners = getAllWiners(latest, main, branch);
    const branchResources = formatAllResources(branch, branchWinners);
    const mainResources = formatAllResources(main, mainWinners);
    const latestResources = formatAllResources(latest, latestWinners);

    return {
        branchResources,
        mainResources,
        latestResources,
    };
};

// Build the Lighthouse comment for the pull request
export const buildLighthouseComment = (links, manifest) => {
    const report = {};
    // Map the links to their respective categories (main, latest, branch)
    Object.keys(links).forEach((key) => {
        if (key === mainURL) {
            report.main = links[key];
        } else if (key === latestURL) {
            report.latest = links[key];
        } else {
            report.branch = links[key];
        }
    });

    // Find the representative run for branch, main, and latest
    const branch = manifest.find(
        (result) =>
            result.isRepresentativeRun &&
            result.url !== mainURL &&
            result.url !== latestURL
    );
    const main = manifest.find(
        (result) => result.isRepresentativeRun && result.url === mainURL
    );
    const latest = manifest.find(
        (result) => result.isRepresentativeRun && result.url === latestURL
    );

    // Read and parse the resource summary from the Lighthouse JSON reports
    const branchResourcesRaw = JSON.parse(
        fs.readFileSync(branch.jsonPath, 'utf8')
    ).audits['resource-summary'].details.items;
    const mainResourcesRaw = JSON.parse(fs.readFileSync(main.jsonPath, 'utf8'))
        .audits['resource-summary'].details.items;
    const latestResourcesRaw = JSON.parse(
        fs.readFileSync(latest.jsonPath, 'utf8')
    ).audits['resource-summary'].details.items;

    // Compare resource usage between branch, main, and latest
    const { branchResources, mainResources, latestResources } =
        compareResourceUsage(
            branchResourcesRaw,
            mainResourcesRaw,
            latestResourcesRaw
        );

    // Construct the comment with Lighthouse scores and resource usage
    const comment = `## Lighthouse scores

| Category | Latest ([report](${report.latest})) | Main ([report](${report.main})) | Branch ([report](${report.branch})) |
|---|---|---|---|
| Performance | ${latest.summary.performance} | ${main.summary.performance} | ${branch.summary.performance} |
| Accessibility | ${latest.summary.accessibility} | ${main.summary.accessibility} | ${branch.summary.accessibility} |
| Best Practices | ${latest.summary['best-practices']} | ${main.summary['best-practices']} | ${branch.summary['best-practices']} |
| SEO | ${latest.summary.seo} | ${main.summary.seo} | ${branch.summary.seo} |
| PWA | ${latest.summary.pwa} | ${main.summary.pwa} | ${branch.summary.pwa} |

<details>
    <summary>What is this?</summary>

[Lighthouse](https://github.com/GoogleChrome/lighthouse) scores comparing the documentation site built from the PR ("Branch") to that of the production documentation site ("Latest") and the build currently on <code>main</code> ("Main"). Higher scores are better, but *note that the SEO scores on Netlify URLs are artifically constrained to 0.92.*

</details>

### Transfer Size

| Category | Latest | Main | Branch |
|---|---|---|---|
| Total | ${latestResources.size.total} | ${mainResources.size.total} | ${branchResources.size.total} |
| Scripts | ${latestResources.size.scripts} | ${mainResources.size.scripts} | ${branchResources.size.scripts} |
| Stylesheet | ${latestResources.size.stylesheet} | ${mainResources.size.stylesheet} | ${branchResources.size.stylesheet} |
| Document | ${latestResources.size.document} | ${mainResources.size.document} | ${branchResources.size.document} |
| Font | ${latestResources.size.font} | ${mainResources.size.font} | ${branchResources.size.font} |

### Request Count

| Category | Latest | Main | Branch |
|---|---|---|---|
| Total | ${latestResources.count.total} | ${mainResources.count.total} | ${branchResources.count.total} |
| Scripts | ${latestResources.count.scripts} | ${mainResources.count.scripts} | ${branchResources.count.scripts} |
| Stylesheet | ${latestResources.count.stylesheet} | ${mainResources.count.stylesheet} | ${branchResources.count.stylesheet} |
| Document | ${latestResources.count.document} | ${mainResources.count.document} | ${branchResources.count.document} |
| Font | ${latestResources.count.font} | ${mainResources.count.font} | ${branchResources.count.font} |
`;

    // Return the constructed comment
    return comment;
};
