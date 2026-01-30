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

import * as fs from 'fs';

export class TokenStore {
    private tokens: Record<string, unknown> = {};

    constructor(pathOrTokens: string | Record<string, unknown>) {
        if (typeof pathOrTokens === 'string') {
            this.load(pathOrTokens);
        } else {
            this.tokens = pathOrTokens;
        }
    }

    load(path: string) {
        try {
            this.tokens = JSON.parse(fs.readFileSync(path, 'utf8'));
        } catch {
            this.tokens = {};
        }
    }

    has(k: string) {
        return k in this.tokens;
    }

    filter(term: string): string[] {
        const q = term.toLowerCase();
        return Object.keys(this.tokens).filter((k) =>
            k.toLowerCase().includes(q)
        );
    }

    all() {
        return Object.keys(this.tokens);
    }
}
