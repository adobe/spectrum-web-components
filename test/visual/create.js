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
import fs from 'fs';
import fg from 'fast-glob';
import path from 'path';

async function main() {
    for (const storyPath of await fg(`packages/*/stories/*.stories.ts`)) {
        const pathParts = storyPath.split('/');
        const packageName = pathParts[1];
        const stories = pathParts[3].replace('.stories.ts', '');
        const name =
            stories
                .split('-')
                .map((part) => {
                    if (part === 'cta' || part === 'ui') {
                        return part.toUpperCase();
                    }
                    return part[0].toUpperCase() + part.substr(1);
                })
                .join('') + 'Stories';
        const testString = `/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import * as stories from '../stories/${stories}.stories.js';
import { regressVisuals } from '../../../test/visual/test.js';
import type { TestsType } from '../../../test/visual/test.js';

regressVisuals('${name}', stories as unknown as TestsType);
`;
        const directory = path.join('packages', packageName, 'test');
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(
            path.join(directory, `${stories}.test-vrt.ts`),
            testString,
            { recursive: true }
        );
    }
}

main();
