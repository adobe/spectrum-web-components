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

const latestURL = 'https://opensource.adobe.com/spectrum-web-components/';
const mainURL = 'https://main--spectrum-web-components.netlify.app/';

export const buildLighthouseComment = (links, manifest) => {
    const report = {};
    Object.keys(links).forEach((key) => {
        if (key === mainURL) {
            report.main = links[key];
        } else if (key === latestURL) {
            report.latest = links[key];
        } else {
            report.branch = links[key];
        }
    });
    const branch = manifest.find(
        (result) =>
            result.isRepresentativeRun &&
            result.url !== mainURL &&
            result.url !== latestURL
    );
    const latest = manifest.find(
        (result) => result.isRepresentativeRun && result.url === latestURL
    );
    const main = manifest.find(
        (result) => result.isRepresentativeRun && result.url === mainURL
    );

    const comment = `## Lighthouse scores

| Category | Latest ([report](${report.latest})) | Main ([report](${report.main})) | Branch ([report](${report.branch})) |
|---|---|---|---|
| Performance | ${latest.summary.performance} | ${main.summary.performance} | ${branch.summary.performance} |
| Accessibility | ${latest.summary.accessibility} | ${main.summary.accessibility} | ${branch.summary.accessibility} |
| Best Practices | ${latest.summary['best-practices']} | ${main.summary['best-practices']} | ${branch.summary['best-practices']} |
| SEO | ${latest.summary.seo} | ${main.summary.seo} | ${branch.summary.seo} |
| PWA | ${latest.summary.pwa} | ${main.summary.pwa} | ${branch.summary.pwa} |

[Lighthouse](https://github.com/GoogleChrome/lighthouse) scores comparing the documentation site built from the PR ("Branch") to that of the production documentation site ("Latest") and the build currently on <code>main</code> ("Main"). Higher scores are better, but *note that the SEO scores on Netlify URLs are artifically constrained to 0.92.*
`;

    return comment;
};
