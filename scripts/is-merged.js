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

import { execSync } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { branch, merged } = yargs(hideBin(process.argv)).argv;

const isMerged = (branch = 'main', merged) => {
    let mergedBranched = merged;
    if (!merged) {
        const command = execSync('git branch --merged');
        mergedBranched = command.toString();
    }
    const isMerged = mergedBranched.search(branch) > -1;
    if (isMerged) {
        console.warn('This branch is up to date.');
    } else {
        console.warn('This branch needs to be rebased.');
        throw new Error('This branch is not merged to its target!');
    }
};

isMerged(branch, merged);
