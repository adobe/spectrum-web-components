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
import fg from 'fast-glob';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import tar from 'tar-stream';
import gunzip from 'gunzip-maybe';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NPMSpectrumURI =
    'https://registry.npmjs.org/@adobe/spectrum-tokens/latest';
const CSSBaseURI = 'https://opensource.adobe.com/spectrum-css';
const ConfigPath = path.resolve(
    __dirname,
    '../packages/*/src/spectrum-config.js'
);
const OutPath = path.resolve(__dirname, '../INVENTORY.md');

build();

async function build() {
    const [design, css, web] = await Promise.all([
        getDesignComponents(),
        getCSSComponents(),
        getWebComponents(),
    ]);
    const components = merged(design, css, web);
    const md = inventory(components, design.size, css.size, web.size);
    await fs.promises.writeFile(OutPath, md);
}

async function getDesignComponents() {
    const res = await fetch(NPMSpectrumURI);
    const metadata = await res.json();
    const tarballURI = metadata.dist.tarball;
    const tarball = await fetch(tarballURI);
    const extract = tar.extract();

    const linked = await new Promise((resolve, reject) => {
        let contents = '';
        extract
            .on('entry', async (header, stream, next) => {
                stream.on('end', () => next());
                if (header.name !== 'package/dist/data/json/dna-linked.json') {
                    stream.resume();
                    return;
                }
                for await (const chunk of stream) {
                    contents += chunk;
                }
                extract.destroy();
            })
            .on('close', () => {
                resolve(contents);
            })
            .on('error', reject);

        tarball.body.pipe(gunzip()).pipe(extract);
    });
    const json = JSON.parse(linked);
    return new Set(Object.keys(json.dna.components.light.medium));
}

async function getCSSComponents() {
    const res = await fetch(`${CSSBaseURI}/store.json`);
    const store = await res.json();
    return new Map(
        Object.values(store).map((item) => [
            item.component,
            `${CSSBaseURI}/${item.href}`,
        ])
    );
}

async function getWebComponents() {
    const directoryRE = /(?:\/)([^\/]+)(?=\/src)\//;
    const paths = fg.sync(ConfigPath);
    const configs = await Promise.all(
        paths.map(async (path) => {
            return {
                directory: path.match(directoryRE)[1],
                contents: await import(pathToFileURL(path)),
            };
        })
    );
    const components = configs.flatMap(({ directory, contents }) => {
        const configs = [contents.default].flat();
        return configs.map((config) => {
            return [
                config.spectrum,
                `https://opensource.adobe.com/spectrum-web-components/components/${directory}`,
            ];
        });
    });
    return new Map(components);
}

function merged(design, css, web) {
    const all = new Set([...design, ...css.keys(), ...web.keys()]);
    const sorted = Array.from(all).sort();
    return sorted.map((name) => {
        return {
            name,
            design: design.has(name),
            css: css.get(name),
            web: web.get(name),
        };
    });
}

function inventory(components, nDesign, nCSS, nWeb) {
    return `
# Component Inventory

Availability of [Spectrum](https://spectrum.adobe.com) components in [Spectrum CSS](https://opensource.adobe.com/spectrum-css/)
and [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/).

${tableOf(components, nDesign, nCSS, nWeb)}
    `;
}

function tableOf(components, nDesign, nCSS, nWeb) {
    const rows = components
        .map(({ name, design, css, web }) => {
            const designMD = design ? '✅' : '';
            const cssMD = css ? `[📄](${css})` : '';
            const webMD = web ? `[📄](${web})` : css ? '❌' : '';
            return `| ${name} | ${designMD} | ${cssMD} | ${webMD} |`;
        })
        .join('\n');
    return `| Component | Design tokens (${nDesign}) | CSS (${nCSS}) | Web Components (${nWeb}) |\n|-|-|-|-|\n${rows}`;
}
