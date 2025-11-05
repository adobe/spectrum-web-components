/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import '@spectrum-web-components/story-decorator/sp-story-decorator.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/vrt-compare/vrt-compare.js';
import { html, nothing, render } from 'lit-html';

const review = document.querySelector('vrt-compare');
const resultTypes = ['new', 'updated', 'removed', 'passed'];

function buildNavigation(tests, metadata) {
    const sidenav = document.querySelector('sp-sidenav');
    const resultsByType = resultTypes.reduce((acc, type) => {
        acc[type] = Object.keys(tests[type]).reduce((acc, group) => {
            return acc + tests[type][group].length;
        }, 0);
        return acc;
    }, {});
    render(
        html`
            <sp-sidenav-heading label="Results for">
                <sp-sidenav-item
                    label=${metadata.branch}
                    style="user-select: all"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    label=${metadata.system}
                    style="user-select: all"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
            <sp-sidenav-item multilevel label="Other VRT Results">
                ${metadata.vrts.map(
                    (theme) => html`
                        <sp-sidenav-item
                            label=${theme[0]}
                            href=${theme[1]}
                        ></sp-sidenav-item>
                    `
                )}
            </sp-sidenav-item>
            <sp-sidenav-heading label="Preview">
                <sp-sidenav-item
                    label="Docs Site"
                    href=${metadata.preview}
                ></sp-sidenav-item>
                <sp-sidenav-item
                    label="Storybook"
                    href="${metadata.preview}storybook/"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
            <sp-sidenav-heading label="Golden Images Hash">
                <sp-sidenav-item
                    label=${metadata.commit}
                    style="user-select: all"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
            ${resultTypes.map((resultType) => {
                const groups = Object.keys(tests[resultType]).sort();
                return html`
                    ${tests[resultType] && groups.length
                        ? html`
                              <sp-sidenav-heading label=${resultType}>
                                  <sp-sidenav-item
                                      label="${resultsByType[
                                          resultType
                                      ]} screenshots"
                                      ?expanded=${resultType !== 'passed'}
                                      multiLevel
                                  >
                                      ${groups.map((group) => {
                                          return html`
                                              <sp-sidenav-item
                                                  label=${group}
                                                  value=${group}
                                              >
                                                  ${tests[resultType][
                                                      group
                                                  ].map((test) => {
                                                      return html`
                                                          <sp-sidenav-item
                                                              @click=${() =>
                                                                  placeTest(
                                                                      test
                                                                  )}
                                                              label=${test.name}
                                                              value=${test.name}
                                                              href="#${group}/${test.name}"
                                                          ></sp-sidenav-item>
                                                      `;
                                                  })}
                                              </sp-sidenav-item>
                                          `;
                                      })}
                                  </sp-sidenav-item>
                              </sp-sidenav-heading>
                          `
                        : nothing}
                `;
            })}
        `,
        sidenav
    );
    const hash = location.hash.replace('#', '');
    if (hash) {
        const [group, name] = hash.split('/');
        let test;
        for (let type in tests) {
            if (tests[type][group]) {
                test = tests[type][group].find(
                    (testResult) => testResult.name === name
                );
            }
        }
        if (test) {
            placeTest(test);
            return;
        }
    }
    if (Object.keys(tests.new).length) {
        const key = Object.keys(tests.new)[0];
        sidenav.value = tests.new[key][0].name;
        placeTest(tests.new[key][0]);
    } else if (Object.keys(tests.updated).length) {
        const key = Object.keys(tests.updated)[0];
        sidenav.value = tests.updated[key][0].name;
        placeTest(tests.updated[key][0]);
    } else if (Object.keys(tests.removed).length) {
        const key = Object.keys(tests.removed)[0];
        sidenav.value = tests.removed[key][0].name;
        placeTest(tests.removed[key][0]);
    } else if (Object.keys(tests.passed).length) {
        const key = Object.keys(tests.passed)[0];
        sidenav.value = tests.passed[key][0].name;
        placeTest(tests.passed[key][0]);
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
    const response = await fetch('./data.json');
    const data = await response.json();
    const decorator = document.querySelector('sp-story-decorator');
    const system = data.meta.system.split(' ');
    decorator.system = system[0];
    decorator.color = system[1];
    decorator.scale = system[2];
    buildNavigation(data.tests, data.meta);
}

run();
