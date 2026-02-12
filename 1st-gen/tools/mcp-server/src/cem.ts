/* eslint-disable @spectrum-web-components/prevent-argument-names */
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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Minimal declaration shape for a custom element in CEM. */
export interface CEMDeclaration {
    kind?: string;
    name?: string;
    tagName?: string;
    customElement?: boolean;
    description?: string;
    attributes?: Array<{
        name?: string;
        type?: { text?: string };
        description?: string;
        default?: string;
    }>;
    events?: Array<{
        name?: string;
        type?: { text?: string };
        description?: string;
    }>;
    slots?: Array<{
        name?: string;
        description?: string;
    }>;
    cssParts?: Array<{
        name?: string;
        description?: string;
    }>;
    cssProperties?: Array<{
        name?: string;
        type?: { text?: string };
        description?: string;
        default?: string;
    }>;
    members?: Array<{
        name?: string;
        kind?: string;
        type?: { text?: string };
        description?: string;
    }>;
}

/** Minimal Custom Elements Manifest types for our usage. */
export interface CustomElementsManifest {
    schemaVersion?: string;
    modules: Array<{
        path?: string;
        declarations?: CEMDeclaration[];
    }>;
}

export interface ComponentEntry {
    tagName: string;
    name?: string;
    description?: string;
    modulePath?: string;
    declaration: CEMDeclaration;
}

/**
 * Resolves the path to custom-elements.json. Uses SWC_CEM_PATH if set,
 * otherwise defaults to 1st-gen/projects/documentation/custom-elements.json
 * relative to the package (when run from repo root or 1st-gen).
 */
export function getManifestPath(): string {
    if (process.env.SWC_CEM_PATH) {
        return path.resolve(process.env.SWC_CEM_PATH);
    }
    const candidatePaths = [
        // Repo root as cwd (e.g. Cursor runs: node 1st-gen/tools/mcp-server/dist/index.js).
        path.resolve(
            process.cwd(),
            '1st-gen/projects/documentation/custom-elements.json'
        ),
        // From 1st-gen/tools/mcp-server/dist/cem.js: up to 1st-gen then projects/documentation.
        path.resolve(
            __dirname,
            '../../../projects/documentation/custom-elements.json'
        ),
        // From 1st-gen/tools/mcp-server/dist (if __dirname is one level short): up to 1st-gen.
        path.resolve(
            __dirname,
            '../../../../1st-gen/projects/documentation/custom-elements.json'
        ),
        // When cwd is 1st-gen (e.g. yarn workspace run start from 1st-gen).
        path.resolve(
            process.cwd(),
            'projects/documentation/custom-elements.json'
        ),
    ];
    for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }
    return candidatePaths[0];
}

export function loadManifest(manifestPath?: string): CustomElementsManifest {
    const p = manifestPath ?? getManifestPath();
    if (!fs.existsSync(p)) {
        throw new Error(
            `Custom Elements Manifest not found at ${p}. Run \`yarn docs:analyze\` from 1st-gen to generate it.`
        );
    }
    const raw = fs.readFileSync(p, 'utf-8');
    return JSON.parse(raw) as CustomElementsManifest;
}

/** All custom element declarations (has tagName) from the manifest. */
export function getComponents(
    manifest: CustomElementsManifest
): ComponentEntry[] {
    const entries: ComponentEntry[] = [];
    for (const mod of manifest.modules ?? []) {
        for (const decl of mod.declarations ?? []) {
            const tagName = decl.tagName;
            if (!tagName || typeof tagName !== 'string') continue;
            entries.push({
                tagName,
                name: decl.name,
                description: decl.description,
                modulePath: mod.path,
                declaration: decl,
            });
        }
    }
    return entries;
}

export function listComponents(
    manifest: CustomElementsManifest,
    options?: { tagPrefix?: string; packagePath?: string }
): ComponentEntry[] {
    let list = getComponents(manifest);
    if (options?.tagPrefix) {
        const prefix = options.tagPrefix.toLowerCase();
        list = list.filter((c) => c.tagName.toLowerCase().startsWith(prefix));
    }
    if (options?.packagePath) {
        const frag = options.packagePath.replace(/\\/g, '/');
        list = list.filter((c) =>
            c.modulePath?.replace(/\\/g, '/').includes(frag)
        );
    }
    return list;
}

export function getComponentDoc(
    manifest: CustomElementsManifest,
    tagName: string
): ComponentEntry | null {
    const normalized = tagName.toLowerCase().trim();
    const components = getComponents(manifest);
    return (
        components.find((c) => c.tagName.toLowerCase() === normalized) ?? null
    );
}

/** Format a single component as markdown for the get_component_doc tool. */
export function formatComponentDoc(entry: ComponentEntry): string {
    const d = entry.declaration;
    const lines: string[] = [];
    lines.push(`# ${entry.tagName}`);
    if (entry.description) lines.push(`\n${entry.description}`);
    if (d.attributes?.length) {
        lines.push('\n## Attributes');
        for (const a of d.attributes) {
            const type = a.type?.text ?? '';
            const def = a.default != null ? ` (default: \`${a.default}\`)` : '';
            lines.push(
                `- **${a.name}**${type ? ` \`${type}\`${def}` : ''}${a.description ? ` – ${a.description}` : ''}`
            );
        }
    }
    if (d.events?.length) {
        lines.push('\n## Events');
        for (const e of d.events) {
            const type = e.type?.text ?? '';
            lines.push(
                `- **${e.name}**${type ? ` \`${type}\`` : ''}${e.description ? ` – ${e.description}` : ''}`
            );
        }
    }
    if (d.slots?.length) {
        lines.push('\n## Slots');
        for (const s of d.slots) {
            const name = s.name ?? 'default';
            lines.push(
                `- **${name}**${s.description ? ` – ${s.description}` : ''}`
            );
        }
    }
    if (d.cssProperties?.length) {
        lines.push('\n## CSS custom properties');
        for (const p of d.cssProperties) {
            const def = p.default != null ? ` (default: \`${p.default}\`)` : '';
            lines.push(
                `- **${p.name}**${def}${p.description ? ` – ${p.description}` : ''}`
            );
        }
    }
    return lines.join('\n');
}
