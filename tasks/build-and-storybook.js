/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { buildPackages } from './esbuild-packages.js';
import { spawn } from 'child_process';

let firstBuild = true;

const watchStorybook = {
    name: 'watchStorybook',
    setup(build) {
        build.onEnd((result) => {
            if (firstBuild) {
                spawn('yarn', ['run-p', 'watch:css', 'storybook:run'], {
                    stdio: ['inherit', 'inherit', 'inherit'],
                });
                console.log('Initial build complete.');
            } else {
                console.log('Incremental build complete.');
            }
            firstBuild = false;
        });
    },
};

buildPackages({ watch: true, watchPlugins: [watchStorybook] });
