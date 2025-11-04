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
import { main } from 'tachometer/lib/cli.js';
import { ConfigFile } from 'tachometer/lib/configfile.js';
import { existsSync, readdirSync, writeFileSync } from 'fs';
import { join as pathjoin } from 'path';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

const optionDefinitions: commandLineUsage.OptionDefinition[] = [
    {
        name: 'help',
        description: 'Show documentation',
        type: Boolean,
        defaultValue: false,
    },
    {
        name: 'package',
        description:
            'Select which individual packages to benchmark.\ne.g.' +
            ' "-p button radio icon-button".\n(default runs all)',
        alias: 'p',
        type: String,
        multiple: true,
        defaultValue: [],
    },
    {
        name: 'filter',
        description:
            'A filter for tests in a package to benchmark.\ne.g.' +
            ' "-f test-open-close".\n(default runs all)',
        alias: 'f',
        type: String,
        multiple: true,
        defaultValue: [],
    },
    {
        name: 'remote',
        description:
            'Remote location to point tachometer.\ne.g. if running' +
            ' a remote SSH Selenium tunnel on port 4444:\n' +
            '-r http://localhost:4444/wd/hub.\n(default runs locally)',
        alias: 'r',
        type: String,
        defaultValue: '',
    },
    {
        name: 'sample-size',
        description:
            'Minimum number of times to run each benchmark.\n(default 50)',
        alias: 'n',
        type: Number,
        defaultValue: 50,
    },
    {
        name: 'timeout',
        description:
            'The maximum number of minutes to spend auto-sampling.\n(default 3)',
        alias: 't',
        type: Number,
    },
    {
        name: 'browser',
        description:
            'Which browsers to launch in automatic mode.' +
            '\n(default chrome)',
        alias: 'b',
        type: String,
        defaultValue: 'chrome',
    },
    {
        name: 'compare',
        description:
            'Which version of @spectrum-web-components/bundle to compare your performance against.' +
            '\n(default latest)',
        alias: 'c',
        type: String,
        defaultValue: 'latest',
    },
    {
        name: 'start',
        description:
            'Test from "page" start (includes element registration and upgrade) or "element" start (only includes upgrade).' +
            '\n(default element)',
        alias: 's',
        type: String,
        defaultValue: 'element',
    },
    {
        name: 'end',
        description:
            'Test until "updateComplete" for all elements in the text (only includes the work included required to update) or "paint" (wait for the paint after the update has completed).' +
            '\n(default updateComplete)',
        alias: 'e',
        type: String,
        defaultValue: 'updateComplete',
    },
    {
        name: 'json',
        description: 'Save output to json.',
        alias: 'j',
        type: Boolean,
        defaultValue: false,
    },
];

interface Options {
    help: boolean;
    package: string[];
    filter: string[];
    remote: string;
    'sample-size': string;
    timeout: string;
    browser: 'chrome' | 'firefox';
    compare: string;
    start: string;
    end: string;
    json: boolean;
}

(async () => {
    const opts = commandLineArgs(optionDefinitions) as Options;

    if (opts.help) {
        // eslint-disable-next-line no-console
        console.log(
            commandLineUsage([
                {
                    header: 'benchmark runner',
                    content: `Runs benchmarks for SWC`,
                },
                {
                    header: 'Usage',
                    content: `Run all benchmarks for all SWC components:
$ node test/benchmark/cli
Run all benchmarks for specific components:
$ node test/benchmark/cli -p button textfield
$ node test/benchmark/cli -p button -p textfield
Run benchmarks on remote Selenium server or SSH tunnel:
$ node test/benchmark/cli -r http://localhost:4444/wd/hub
Run benchmarks n times on each package:
$ node test/benchmark/cli -n 20
`,
                },
                {
                    header: 'Options',
                    optionList: optionDefinitions,
                },
            ])
        );
        return;
    }

    let packages: string[] = [];

    if (opts.package.length) {
        packages = opts.package;
    } else {
        packages = readdirSync(pathjoin('packages'), {
            withFileTypes: true,
        })
            .filter((dirEntry) => dirEntry.isDirectory())
            .map((dirEntry) => dirEntry.name);
    }
    const start = opts.start;
    const end = opts.end;

    const printResults: string[] = [];
    for (const packageName of packages) {
        const runCommands: string[] = [];
        const config: Partial<ConfigFile> = {
            root: '../../..',
            $schema:
                'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
            timeout: parseFloat(opts.timeout) || 0,
            sampleSize: parseFloat(opts['sample-size']) || 50,
            benchmarks: [],
        };

        // Naively assume any change that doesn't exist is "packages" exists in "tools".
        const monorepoDir = existsSync(pathjoin('packages', packageName))
            ? 'packages'
            : 'tools';

        const hasTests = readdirSync(pathjoin(monorepoDir, packageName)).find(
            (dirEntry) => dirEntry === 'test'
        );

        if (!hasTests) {
            continue;
        }

        const hasBenchmarks = readdirSync(
            pathjoin(monorepoDir, packageName, 'test')
        ).find((dirEntry) => dirEntry === 'benchmark');

        if (!hasBenchmarks) {
            continue;
        }

        const benchmarks = readdirSync(
            pathjoin(monorepoDir, packageName, 'test', 'benchmark'),
            { withFileTypes: true }
        )
            .filter(
                (dirEntry) =>
                    dirEntry.isFile() &&
                    dirEntry.name.endsWith('.js') &&
                    (!opts.filter.length ||
                        opts.filter.find((filter) =>
                            dirEntry.name.includes(filter)
                        ))
            )
            .map((dirEntry) => dirEntry.name.replace(/\.js$/, ''));

        for (const benchmark of benchmarks) {
            /**
             * Assume that packages with the default package version
             * have yet to be published to NPM and skip.
             **/
            const { default: pjson } = await import(
                pathjoin(
                    process.cwd(),
                    monorepoDir,
                    packageName,
                    'package.json'
                ),
                {
                    with: { type: 'json' },
                }
            );
            if (pjson.version === '0.0.1' && opts.compare !== 'none') {
                // eslint-disable-next-line no-console
                console.log(
                    `⚠️  It looks like '${packageName}' has yet to be published to NPM. Skipping comparison!`
                );
                return;
            }
            if (!config.benchmarks) {
                return;
            }
            if (opts.compare !== 'none') {
                config.benchmarks.push({
                    name: `${packageName}:${benchmark}`,
                    url: `bench-runner.html?bench=${benchmark}&package=${packageName}&start=${start}&end=${end}&dir=${monorepoDir}`,
                    packageVersions: {
                        label: 'remote',
                        dependencies: {
                            '@spectrum-web-components/bundle': opts.compare,
                            '@spectrum-web-components/grid': opts.compare,
                            lit: '^2.0.0',
                        },
                    },
                    measurement: 'global',
                    browser: {
                        name: opts.browser,
                        headless: true,
                        windowSize: {
                            width: 800,
                            height: 600,
                        },
                    },
                });
            }
            config.benchmarks.push({
                name: `${packageName}:${benchmark}`,
                url: `bench-runner.html?bench=${benchmark}&package=${packageName}&start=${start}&end=${end}&dir=${monorepoDir}`,
                measurement: 'global',
                browser: {
                    name: opts.browser,
                    headless: true,
                    windowSize: {
                        width: 800,
                        height: 600,
                    },
                },
            });
        }

        writeFileSync(
            pathjoin(process.cwd(), 'test/benchmark/config.json'),
            JSON.stringify(config),
            {
                encoding: 'utf8',
            }
        );

        if (opts.json) {
            runCommands.push(
                `--json-file=tach-results.${opts.browser}.${packageName}.json`
            );
        }
        runCommands.push(`--config=./test/benchmark/config.json`);
        runCommands.push(`--force-clean-npm-install`);

        const statResults = await main(runCommands);

        if (!statResults) {
            return;
        }

        for (const statResult of statResults) {
            const name = statResult.result.name;
            const low = statResult.stats.meanCI.low.toFixed(2);
            const high = statResult.stats.meanCI.high.toFixed(2);
            printResults.push(`${name}: ${low}ms - ${high}ms`);
        }
    }

    for (const printResult of printResults) {
        // eslint-disable-next-line no-console
        console.log(printResult);
    }
})();
