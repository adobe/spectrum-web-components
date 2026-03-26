/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseReadmeExamples } from '../src/readme-parser.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sampleReadme = readFileSync(
    resolve(__dirname, 'fixtures/sample-readme.md'),
    'utf-8'
);

describe('parseReadmeExamples', () => {
    it('extracts html demo code blocks', () => {
        const examples = parseReadmeExamples(sampleReadme);
        expect(examples).toHaveLength(4);
        expect(examples[0].title).toBe('Basic');
        expect(examples[0].html).toContain('sp-button');
        expect(examples[0].source).toBe('readme');
    });

    it('ignores non-html code blocks', () => {
        const examples = parseReadmeExamples(sampleReadme);
        const titles = examples.map((example) => example.title);
        expect(titles).not.toContain('Installation');
        expect(titles).not.toContain('TypeScript Example');
    });

    it('uses preceding heading as example title', () => {
        const examples = parseReadmeExamples(sampleReadme);
        expect(examples[1].title).toBe('With Icon');
        expect(examples[2].title).toBe('Pending State');
    });

    it('handles empty content', () => {
        const examples = parseReadmeExamples('');
        expect(examples).toEqual([]);
    });
});
