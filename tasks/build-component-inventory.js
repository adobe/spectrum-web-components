#!/usr/bin/env node

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

import fetch from 'node-fetch';
import globby from 'globby';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSSBaseURI = 'https://opensource.adobe.com/spectrum-css';
const ConfigPath = path.resolve(
    __dirname,
    '../packages/*/src/spectrum-config.js'
);
const OutPath = path.resolve(__dirname, '../INVENTORY.md');

build();

async function build() {
    const [cssComponents, webComponents] = await Promise.all([
        getCSSComponents(),
        getWebComponents(),
    ]);
    const components = merged(cssComponents, webComponents);
    const md = inventory(components, cssComponents.size, webComponents.size);
    await fs.promises.writeFile(OutPath, md);
}

async function getCSSComponents() {
    const res = await fetch(`${CSSBaseURI}/store.json`);
    const store = await res.json();
    return new Map(Object.values(store).map((item) => [
        item.component,
        `${CSSBaseURI}/${item.href}`,
    ]));
}

async function getWebComponents() {
    const directoryRE = /(?:\/)([^\/]+)(?=\/src)\//;
    const paths = globby.sync(ConfigPath);
    const componentPromises = paths.map(async (path) => {
        const config = await import(pathToFileURL(path));
        const component = config.default.spectrum;
        const directory = path.match(directoryRE)[1];
        const href = `https://opensource.adobe.com/spectrum-web-components/components/${directory}`;
        return [component, href];
    });
    const components = await Promise.all(componentPromises);
    return new Map(components);
}

function merged(css, web) {
    const all = new Set([...css.keys(), ...web.keys()]);
    const sorted = Array.from(all).sort();
    return sorted.map((name) => {
        return {
            name,
            css: css.get(name),
            web: web.get(name),
        };
    });
}

function inventory(components, cssCount, webCount) {
    return `
# Component Inventory

Availability of components in [Spectrum CSS](https://opensource.adobe.com/spectrum-css/)
and [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/).

${tableOf(components, cssCount, webCount)}
    `;
}

function tableOf(components, cssCount, webCount) {
    const rows = components
        .map(({ name, css, web }) => {
            const cssDocs = css ? `[📄](${css})` : '';
            const webDocs = web ? `[📄](${web})` : '❌';
            return `| ${name} | ${cssDocs} | ${webDocs} |`;
        })
        .join('\n');
    return `| Component | Spectrum CSS (${cssCount}) | Spectrum Web Components (${webCount}) |\n|-|-|-|\n${rows}`;
}
