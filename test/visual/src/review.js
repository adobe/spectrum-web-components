/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/vrt-compare/vrt-compare.js';
import { html, render, nothing } from 'lit-html';

const review = document.querySelector('vrt-compare');
const resultTypes = ['new', 'updated', 'removed', 'passed'];

function buildNavigation(tests) {
    const sidenav = document.querySelector('sp-sidenav');
    render(
        html`
            ${resultTypes.map(
                (resultType) => html`
                    ${tests[resultType] && tests[resultType].length
                        ? html`
                              <sp-sidenav-heading label=${resultType}>
                                  <sp-sidenav-item
                                      label="${tests[resultType]
                                          .length} screenshots"
                                      expanded
                                  >
                                      ${tests[resultType].map((test) => {
                                          return html`
                                              <sp-sidenav-item
                                                  @click=${() =>
                                                      placeTest(test)}
                                                  label=${test.name}
                                                  value=${test.name}
                                              ></sp-sidenav-item>
                                          `;
                                      })}
                                  </sp-sidenav-item>
                              </sp-sidenav-heading>
                          `
                        : nothing}
                `
            )}
        `,
        sidenav
    );
    if (tests.new?.[0]) {
        sidenav.value = tests.new[0].name;
        placeTest(tests.new[0]);
    } else if (tests.updated?.[0]) {
        sidenav.value = tests.updated[0].name;
        placeTest(tests.updated[0]);
    } else if (tests.removed?.[0]) {
        sidenav.value = tests.removed[0].name;
        placeTest(tests.removed[0]);
    } else if (tests.passed?.[0]) {
        sidenav.value = tests.passed[0].name;
        placeTest(tests.passed[0]);
    }
}

function placeTest(test) {
    const results = [];
    review.innerHTML = '';
    if (test.baseline) {
        const img = document.createElement('img');
        img.src = test.baseline;
        img.slot = 'baseline';
        results.push(img);
    }
    if (test.diff) {
        const img = document.createElement('img');
        img.src = test.diff;
        img.slot = 'diff';
        results.push(img);
    }
    if (test.actual) {
        const img = document.createElement('img');
        img.src = test.actual;
        img.slot = 'actual';
        results.push(img);
    }
    review.append(...results);
}

async function run() {
    const response = await fetch('./tests.json');
    const tests = await response.json();
    buildNavigation(tests);
}

run();
