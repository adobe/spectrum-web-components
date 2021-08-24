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

const globby = require('globby');
const fs = require('fs');
const prettyBytes = require('pretty-bytes');

const getTachometerResults = () => {
    const results = [];
    for (const result of globby.sync(`./tach-results.*.json`)) {
        const file = fs.readFileSync(result, 'utf8');
        const json = JSON.parse(file);
        results.push(json.benchmarks);
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

const buildTable = (result) => {
    const remote = result[0];
    const remoteDifferences = formatDifference(remote.differences[1]);
    const remoteDifferencesString = `${remoteDifferences.label} <br> ${remoteDifferences.relative} <br> ${remoteDifferences.absolute}`;
    const branch = result[1];
    const branchDifferences = formatDifference(branch.differences[0]);
    const branchDifferencesString = `${branchDifferences.label} <br> ${branchDifferences.relative} <br> ${branchDifferences.absolute}`;
    const packageName = `${result[0].name.split(':')[0]}`;
    const table = `<a id="${packageName}"></a>

## ${packageName} [_permalink_](#user-content-${packageName})
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
`;
    return table;
};

const buildTachometerComment = () => {
    const results = getTachometerResults();
    const tables = results.map(buildTable);
    const body = tables.length
        ? tables.join(`
    
`)
        : 'Currently, no packages are changed by this PR...';
    const comment = `# Tachometer results
${body}`;
    return comment;
};

console.log(buildTachometerComment());

module.exports = {
    buildTachometerComment,
};
