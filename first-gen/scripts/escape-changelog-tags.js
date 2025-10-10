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

import { replaceInFile } from 'replace-in-file';

// make sure inline tags are escaped
const tagOptions = {
    files: '.changeset/*.md',
    from: /(?<=\n\s*-\s.*)`?(<\w+(-\w+)*[^>]*>)`?/g,
    to: '`$1`',
};

try {
    const results = await replaceInFile(tagOptions);
    console.log('Replaced unescaped tags in .changeset/*.md:', results);
} catch (error) {
    console.error(
        'Error occurred replacing unescaped tags in .changeset/*.md:',
        error
    );
}
