#!/usr/bin/env node

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

import fs from 'fs';

import fg from 'fast-glob';
import prettyBytes from 'pretty-bytes';

const getTachometerResults = () => {
    const results = {
        chrome: [],
        firefox: [],
    };
    for (const result of fg.sync('./tach-results.*.json')) {
        const file = fs.readFileSync(result, 'utf8');
        // Grab the ${bowserName}.${package} part of the results file name as an array of [browserName, package].
        const match = /tach-results\.(.*)\.json/.exec(result);
        if (match) {
            const [bowserName] = match[1].split('.');
            const json = JSON.parse(file);
            results[bowserName].push(json.benchmarks);
        }
    }
    return results;
};

function formatConfidenceInterval(ci, format) {
    return `${format(ci.low)} - ${format(ci.high)}`;
}

function percent(n) {
    // return (n * 100).toFixed(0);
    return n.toFixed(0) + '%';
}

function milli(n) {
    return n.toFixed(2) + 'ms';
}

const colorizeSign = (n, format) => {
    // Argh, it appears we can't color text using inline styes :(
    if (n > 0) {
        // return ansi.format(`[red bold]{+}${format(n)}`);
        return `+${format(n)}`;
    } else if (n < 0) {
        // Negate the value so that we don't get a double negative sign.
        // return ansi.format(`[green bold]{-}${format(-n)}`);
        return `-${format(-n)}`;
    } else {
        return format(n);
    }
};

function negate(ci) {
    return {
        low: -ci.high,
        high: -ci.low,
    };
}

function formatDifference({ absolute, percentChange: relative }) {
    let word, rel, abs;
    if (Math.round(relative.low) == 0 && Math.round(relative.high) == 0) {
        // Our formatting for percents uses `.toFixed(0)`. In cases where we would
        // show 0% - 0% but the actual result is actually not zero (i.e. -0.5 - 0.4)
        // let's still show the result as unsure to avoid a situation where we would
        // display something like "slower ❌ 0% - 0% (0.00ms - 0.00ms)"
        word = `<strong>unsure 🔍</strong>`; // bold blue
        rel = formatConfidenceInterval(relative, (n) =>
            colorizeSign(n, percent)
        );
        abs = formatConfidenceInterval(absolute, (n) => colorizeSign(n, milli));
    } else if (absolute.low > 0 && relative.low > 0) {
        word = `<strong>slower ❌</strong>`; // bold red
        rel = formatConfidenceInterval(relative, percent);
        abs = formatConfidenceInterval(absolute, milli);
    } else if (absolute.high < 0 && relative.high < 0) {
        word = `<strong>faster ✔</strong>`; // bold green
        rel = formatConfidenceInterval(negate(relative), percent);
        abs = formatConfidenceInterval(negate(absolute), milli);
    } else {
        word = `<strong>unsure 🔍</strong>`; // bold blue
        rel = formatConfidenceInterval(relative, (n) =>
            colorizeSign(n, percent)
        );
        abs = formatConfidenceInterval(absolute, (n) => colorizeSign(n, milli));
    }

    return {
        label: word,
        relative: rel,
        absolute: abs,
    };
}

const buildTable = (results) => {
    const packageName = `${results[0].name.split(':')[0]}`;
    const table = [];

    table.push(`<a id="${packageName}"></a>

## ${packageName} [_permalink_](#user-content-${packageName})
`);

    results.forEach((result, i) => {
        if (i % 2 > 0) {
            return;
        }
        const testName = `${result.name.split(':')[1]}`;
        const remote = result;
        const remoteDifferences = formatDifference(remote.differences[i + 1]);
        const remoteDifferencesString = `${remoteDifferences.label} <br> ${remoteDifferences.relative} <br> ${remoteDifferences.absolute}`;

        const branch = results[i + 1];
        const branchDifferences = formatDifference(branch.differences[i]);
        const branchDifferencesString = `${branchDifferences.label} <br> ${branchDifferences.relative} <br> ${branchDifferences.absolute}`;

        table.push(`
### ${
            testName.includes(`basic`)
                ? `${testName}`
                : `${testName} [_permalink_](#user-content-${packageName}-${testName})`
        }
| Version | Bytes | Avg Time | vs remote | vs branch |
|---|---|---|---|---|
| npm latest | ${prettyBytes(remote.bytesSent)} | ${formatConfidenceInterval(
            remote.mean,
            milli
        )} | - | ${remoteDifferencesString} |
| branch | ${prettyBytes(branch.bytesSent)} | ${formatConfidenceInterval(
            branch.mean,
            milli
        )} | ${branchDifferencesString} | - |
`);
    });

    const resultTable = table.join(`

    `);

    return resultTable;
};

export const buildTachometerComment = () => {
    const results = getTachometerResults();
    const chromeTables = results.chrome.map(buildTable);
    const firefoxTables = results.firefox.map(buildTable);
    const chromeBody = chromeTables.length
        ? chromeTables.join(`

`)
        : 'Currently, no packages are changed by this PR...';
    const firefoxBody = firefoxTables.length
        ? firefoxTables.join(`

`)
        : '';
    let comment = `## Tachometer results
`;
    if (firefoxBody) {
        [
            ['Chrome', chromeBody],
            ['Firefox', firefoxBody],
        ].map((body) => {
            comment += `

<details>
    <summary><strong>${body[0]}</strong></summary>

${body[1]}

</details>
`;
        });
    } else {
        comment += chromeBody;
    }
    return comment;
};

console.log(buildTachometerComment());
