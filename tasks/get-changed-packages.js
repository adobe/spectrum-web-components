#!/usr/bin/env node

/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { execSync } from 'child_process';

export const getChangedPackages = () => {
    let command;

    try {
        // Execute the command to list changed packages since the last commit on origin/main
        command = execSync(
            'yarn lerna ls --since origin/main --json --loglevel silent'
        );
    } catch (error) {
        console.log(error.message);
        console.log(error.stdout.toString());
        return [];
    }

    const packageList = JSON.parse(command.toString()).reduce((acc, item) => {
        // Remove the '@spectrum-web-components/' prefix from the package name
        const name = item.name.replace('@spectrum-web-components/', '');
        if (
            // Exclude packages located in the 'projects' directory as here are no benchmarks available
            item.location.search('projects') === -1 &&
            // Exclude packages that start with 'icons-' as they are long-running tests
            !name.startsWith('icons-')
        ) {
            acc.push(name);
        }
        return acc;
    }, []);

    return packageList;
};
