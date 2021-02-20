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
const standard = require('./web-test-runner.config.js');
const { defaultReporter } = require('@web/test-runner');
const { junitReporter } = require('@web/test-runner-junit-reporter');

standard.reporters = [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: false, reportTestProgress: true }),
    // use another reporter to report test results
    junitReporter({
        outputPath: './results/test-results.xml', // default `'./test-results.xml'`
        reportLogs: true, // default `false`
    }),
];

module.exports = standard;
