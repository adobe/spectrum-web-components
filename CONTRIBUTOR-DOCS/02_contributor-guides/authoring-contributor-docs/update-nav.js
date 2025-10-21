#!/usr/bin/env node

/**
 * Regenerate breadcrumbs and table of contents for all CONTRIBUTOR-DOCS files.
 *
 * Usage:
 *   node regenerate-nav.js [docs-root-path]
 *
 * Example:
 *   node regenerate-nav.js ../../
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// MARKER CONSTANTS
// ============================================================================

const MARKER_BREADCRUMBS = '<!-- Generated breadcrumbs - DO NOT EDIT -->';
const MARKER_TITLE = '<!-- Document title (editable) -->';
const MARKER_TOC = '<!-- Generated TOC - DO NOT EDIT -->';
const MARKER_CONTENT = '<!-- Document content (editable) -->';

// ============================================================================
// CONFIGURATION
// ============================================================================

// Maximum depth for "Beneath this doc" navigation (number of indentation levels)
// 1 = show only direct children (no indentation)
// 2 = show children and grandchildren (one level of indentation)
// 3 = show children, grandchildren, and great-grandchildren (two levels of indentation)
const MAX_BENEATH_DOC_DEPTH = 2;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function extractH1(filepath) {
    try {
        const content = fs.readFileSync(filepath, 'utf-8');
        // Extract H1 from between title marker and TOC marker
        const titlePos = findMarkerPosition(content, MARKER_TITLE);
        if (titlePos === -1) {
            // No markers, read from entire file
            const match = content.match(/^#\s+(.+)$/m);
            return match ? match[1].trim() : '';
        }

        const tocPos = findMarkerPosition(content, MARKER_TOC);
        const startPos = titlePos + MARKER_TITLE.length;
        const searchContent =
            tocPos !== -1
                ? content.substring(startPos, tocPos)
                : content.substring(startPos);

        const match = searchContent.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : '';
    } catch (err) {
        return '';
    }
}

function extractHeadings(filepath) {
    try {
        const content = fs.readFileSync(filepath, 'utf-8');
        // Extract headings from document content (after content marker)
        const contentPos = findMarkerPosition(content, MARKER_CONTENT);

        let docContent;
        if (contentPos !== -1) {
            docContent = content.substring(contentPos + MARKER_CONTENT.length);
        } else {
            // No marker found, read entire file
            docContent = content;
        }

        // Find all code block regions to exclude from heading extraction
        const codeBlockRanges = findCodeBlockRanges(docContent);

        // Extract headings, excluding those in code blocks
        const headingMatches = [...docContent.matchAll(/^(#{2,3})\s+(.+)$/gm)];
        return headingMatches
            .filter((m) => {
                // Check if this heading is inside a code block
                const headingPos = m.index;
                return !codeBlockRanges.some(
                    (range) =>
                        headingPos >= range.start && headingPos < range.end
                );
            })
            .map((m) => {
                const rawText = m[2].trim();
                const cleanText = stripMarkdownLinks(rawText);
                return {
                    level: m[1].length,
                    text: cleanText,
                    anchor: makeAnchor(cleanText),
                };
            });
    } catch (err) {
        return [];
    }
}

function makeAnchor(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

function stripMarkdownLinks(text) {
    // Replace [link text](url) with just "link text"
    return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function findCodeBlockRanges(content) {
    // Find all code block regions (fenced code blocks: ```...```)
    const codeBlockRanges = [];
    const fencedBlockRegex = /^```[\s\S]*?^```/gm;
    let match;
    while ((match = fencedBlockRegex.exec(content)) !== null) {
        codeBlockRanges.push({
            start: match.index,
            end: match.index + match[0].length,
        });
    }
    return codeBlockRanges;
}

function findMarkerPosition(content, marker) {
    // Find marker position, excluding those inside code blocks
    const codeBlockRanges = findCodeBlockRanges(content);
    let pos = 0;

    while (true) {
        pos = content.indexOf(marker, pos);
        if (pos === -1) {
            return -1; // Marker not found
        }

        // Check if this position is inside a code block
        const inCodeBlock = codeBlockRanges.some(
            (range) => pos >= range.start && pos < range.end
        );

        if (!inCodeBlock) {
            return pos; // Found marker outside code blocks
        }

        // This occurrence is in a code block, keep searching
        pos += marker.length;
    }
}

function deriveName(name) {
    return name
        .replace(/^\d+_/, '')
        .replace(/\.(md|js|ts|json)$/, '')
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ============================================================================
// METADATA EXTRACTION
// ============================================================================

function walkTree(dir, baseDir = dir, parentPath = null) {
    const result = { files: {}, folders: {} };
    const relativePath = parentPath || '.';

    const items = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter(
            (item) => !item.name.startsWith('.') && item.name !== 'node_modules'
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));

    const children = items.map((item) => item.name);

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const itemRelativePath = path.join(relativePath, item.name);

        if (item.isDirectory()) {
            const hasReadme = fs.existsSync(path.join(fullPath, 'README.md'));
            const readmeH1 = hasReadme
                ? extractH1(path.join(fullPath, 'README.md'))
                : '';

            result.folders[itemRelativePath] = {
                name: item.name,
                hasReadme,
                displayName: hasReadme ? readmeH1 : deriveName(item.name),
                parent: relativePath,
                children: fs
                    .readdirSync(fullPath)
                    .filter((f) => !f.startsWith('.') && f !== 'node_modules')
                    .sort((a, b) =>
                        a.localeCompare(b, 'en', { numeric: true })
                    ),
            };

            const subResult = walkTree(fullPath, baseDir, itemRelativePath);
            Object.assign(result.files, subResult.files);
            Object.assign(result.folders, subResult.folders);
        } else if (item.name.endsWith('.md')) {
            const h1 = extractH1(fullPath);
            const headings = extractHeadings(fullPath);

            result.files[itemRelativePath] = {
                name: item.name,
                displayName: h1 || deriveName(item.name),
                parent: relativePath,
                headings,
                isReadme: item.name === 'README.md',
                fullPath,
            };
        }
    }

    if (relativePath === '.') {
        result.folders['.'] = {
            name: path.basename(dir),
            hasReadme: fs.existsSync(path.join(dir, 'README.md')),
            displayName: 'CONTRIBUTOR-DOCS',
            parent: null,
            children,
        };
    }

    return result;
}

// ============================================================================
// BREADCRUMB GENERATION
// ============================================================================

function generateBreadcrumb(filePath, metadata) {
    const fileMeta = metadata.files[filePath];
    if (!fileMeta) return '';

    // Root README has no breadcrumb
    if (filePath === './README.md' || filePath === 'README.md') {
        return '';
    }

    const segments = [];
    let currentPath = fileMeta.parent;
    const isReadme = fileMeta.isReadme;

    // Walk up parent chain
    while (currentPath && currentPath !== '.') {
        const folderMeta = metadata.folders[currentPath];
        if (!folderMeta) break;

        const hasReadme = folderMeta.hasReadme;

        // If current file is a README in this folder, skip this folder in breadcrumb
        // (we don't want "Folder / Folder" where both refer to the same README)
        if (
            isReadme &&
            hasReadme &&
            path.join(currentPath, 'README.md') === filePath
        ) {
            currentPath = folderMeta.parent;
            continue;
        }

        const relPath = path.relative(
            path.dirname(filePath),
            hasReadme ? path.join(currentPath, 'README.md') : currentPath
        );

        segments.unshift({
            name: folderMeta.displayName,
            link: hasReadme ? relPath : null,
        });

        currentPath = folderMeta.parent;
    }

    // Add root
    const rootRelPath = path.relative(path.dirname(filePath), './README.md');
    segments.unshift({ name: 'CONTRIBUTOR-DOCS', link: rootRelPath });

    // Add current page (no link)
    segments.push({ name: fileMeta.displayName, link: null });

    // Compose breadcrumb
    return segments
        .map((seg) => (seg.link ? `[${seg.name}](${seg.link})` : seg.name))
        .join(' / ');
}

// ============================================================================
// TOC GENERATION
// ============================================================================

function generateTOC(filePath, metadata) {
    const fileMeta = metadata.files[filePath];
    if (!fileMeta) return '';

    const sections = [];

    // "In this doc" section
    if (fileMeta.headings && fileMeta.headings.length > 0) {
        const lines = [
            '<details open>',
            '<summary><strong>In this doc</strong></summary>',
            '',
        ];
        for (const heading of fileMeta.headings) {
            const indent = '    '.repeat(heading.level - 2); // H2 = no indent, H3 = 4 spaces
            lines.push(`${indent}- [${heading.text}](#${heading.anchor})`);
        }
        lines.push('', '</details>');
        sections.push(lines.join('\n'));
    }

    // "Beneath this doc" section
    const beneathLines = generateBeneathDoc(filePath, metadata, 0, 1);
    if (beneathLines) {
        const lines = [
            '<details open>',
            '<summary><strong>Beneath this doc</strong></summary>',
            '',
        ];
        lines.push(beneathLines);
        lines.push('', '</details>');
        sections.push(lines.join('\n'));
    }

    if (sections.length === 0) {
        return ''; // No TOC needed
    }

    return sections.join('\n\n');
}

function generateBeneathDoc(filePath, metadata, indentLevel, depth) {
    const fileMeta = metadata.files[filePath];

    // Only README files can have "beneath this doc" content
    // Regular files are leaf nodes and don't have children
    if (!fileMeta.isReadme) {
        return null;
    }

    const parentFolder = fileMeta.parent;
    const folderMeta = metadata.folders[parentFolder];

    if (
        !folderMeta ||
        !folderMeta.children ||
        folderMeta.children.length === 0
    ) {
        return null;
    }

    const lines = [];
    const indent = '    '.repeat(indentLevel);

    for (const childName of folderMeta.children) {
        const childPath = path
            .join(parentFolder, childName)
            .replace(/\\/g, '/');

        // Check if it's a file
        if (metadata.files[childPath]) {
            const childFileMeta = metadata.files[childPath];
            // Skip self (the README file)
            if (childPath === filePath) continue;

            const relPath = path.relative(path.dirname(filePath), childPath);
            lines.push(`${indent}- [${childFileMeta.displayName}](${relPath})`);

            // Check if it's a folder
        } else if (metadata.folders[childPath]) {
            const childFolderMeta = metadata.folders[childPath];

            if (childFolderMeta.hasReadme) {
                const readmePath = path.join(childPath, 'README.md');
                const relPath = path.relative(
                    path.dirname(filePath),
                    readmePath
                );
                lines.push(
                    `${indent}- [${childFolderMeta.displayName}](${relPath})`
                );
            } else {
                // No README, show as plain text
                lines.push(`${indent}- ${childFolderMeta.displayName}`);
            }

            // Recursively add grandchildren if we haven't hit the depth limit
            if (depth < MAX_BENEATH_DOC_DEPTH) {
                const grandchildren = generateGrandchildren(
                    childPath,
                    filePath,
                    metadata,
                    indentLevel + 1,
                    depth + 1
                );
                if (grandchildren) {
                    lines.push(grandchildren);
                }
            }
        }
    }

    return lines.length > 0 ? lines.join('\n') : null;
}

function generateGrandchildren(
    folderPath,
    originFilePath,
    metadata,
    indentLevel,
    depth
) {
    const folderMeta = metadata.folders[folderPath];
    if (
        !folderMeta ||
        !folderMeta.children ||
        folderMeta.children.length === 0
    ) {
        return null;
    }

    const lines = [];
    const indent = '    '.repeat(indentLevel);

    for (const childName of folderMeta.children) {
        const childPath = path.join(folderPath, childName).replace(/\\/g, '/');

        // Check if it's a file
        if (metadata.files[childPath]) {
            const childFileMeta = metadata.files[childPath];
            // Skip README in the folder itself (already linked from parent)
            if (childName === 'README.md') continue;

            const relPath = path.relative(
                path.dirname(originFilePath),
                childPath
            );
            lines.push(`${indent}- [${childFileMeta.displayName}](${relPath})`);

            // Check if it's a folder
        } else if (metadata.folders[childPath]) {
            const childFolderMeta = metadata.folders[childPath];

            if (childFolderMeta.hasReadme) {
                const readmePath = path.join(childPath, 'README.md');
                const relPath = path.relative(
                    path.dirname(originFilePath),
                    readmePath
                );
                lines.push(
                    `${indent}- [${childFolderMeta.displayName}](${relPath})`
                );
            } else {
                // No README, show as plain text
                lines.push(`${indent}- ${childFolderMeta.displayName}`);
            }

            // Recursively add great-grandchildren if we haven't hit the depth limit
            if (depth < MAX_BENEATH_DOC_DEPTH) {
                const descendants = generateGrandchildren(
                    childPath,
                    originFilePath,
                    metadata,
                    indentLevel + 1,
                    depth + 1
                );
                if (descendants) {
                    lines.push(descendants);
                }
            }
        }
    }

    return lines.length > 0 ? lines.join('\n') : null;
}

// ============================================================================
// FILE UPDATE
// ============================================================================

function updateFile(filePath, metadata, docsRoot) {
    const fileMeta = metadata.files[filePath];
    if (!fileMeta) return false;

    const fullPath = fileMeta.fullPath;

    try {
        const content = fs.readFileSync(fullPath, 'utf-8');

        // Check for markers (ignoring those in code blocks)
        const titlePos = findMarkerPosition(content, MARKER_TITLE);
        const tocPos = findMarkerPosition(content, MARKER_TOC);
        const contentPos = findMarkerPosition(content, MARKER_CONTENT);

        let h1Content = '';
        let documentContent = '';

        if (titlePos !== -1 && contentPos !== -1) {
            // File has markers - extract existing content
            // Extract H1 between title marker and either TOC marker or content marker
            const h1Start = titlePos + MARKER_TITLE.length;
            const h1End = tocPos !== -1 ? tocPos : contentPos;
            h1Content = content.substring(h1Start, h1End).trim();

            // Extract document content after content marker
            documentContent = content
                .substring(contentPos + MARKER_CONTENT.length)
                .trim();
        } else {
            // Plain Markdown file without markers - extract H1 and content
            const h1Match = content.match(/^#\s+(.+)$/m);
            if (h1Match) {
                h1Content = h1Match[0];
                // Extract everything after the H1
                const h1Index = content.indexOf(h1Content);
                documentContent = content
                    .substring(h1Index + h1Content.length)
                    .trim();
            } else {
                console.warn(
                    `⚠️  No H1 found in ${filePath}, using display name`
                );
                h1Content = `# ${fileMeta.displayName}`;
                documentContent = content;
            }
        }

        // Generate breadcrumb and TOC
        const breadcrumb = generateBreadcrumb(filePath, metadata);
        const toc = generateTOC(filePath, metadata);

        // Ensure we have an H1
        if (!h1Content) {
            h1Content = `# ${fileMeta.displayName}`;
        }

        // Build new content with structure:
        // Breadcrumb marker → breadcrumb → Title marker → H1 → TOC marker → TOC → Content marker → rest
        let newContent = '';

        // Breadcrumb section (only if there's a breadcrumb)
        if (breadcrumb) {
            newContent += MARKER_BREADCRUMBS + '\n';
            newContent += '\n' + breadcrumb + '\n';
            newContent += '\n'; // Blank line before title marker
        }

        // Title section
        newContent += MARKER_TITLE + '\n\n';
        newContent += h1Content + '\n';

        // TOC section (only if there's a TOC)
        if (toc) {
            newContent += '\n' + MARKER_TOC + '\n\n';
            newContent += toc + '\n\n';
        } else {
            // No TOC, but still need blank line before content marker
            newContent += '\n';
        }

        // Document content
        newContent += MARKER_CONTENT;
        if (documentContent) {
            newContent += '\n\n' + documentContent;
        }

        // Ensure trailing newline at end of file
        if (!newContent.endsWith('\n')) {
            newContent += '\n';
        }

        // Verify the new content is different before writing
        if (newContent === content) {
            // Content unchanged, skip write
            return true;
        }

        // Delete old file and write new content to ensure clean slate
        // This prevents any potential caching or partial write issues
        fs.unlinkSync(fullPath);
        fs.writeFileSync(fullPath, newContent, 'utf-8');

        // Verify the write succeeded by reading back
        const verification = fs.readFileSync(fullPath, 'utf-8');
        if (verification !== newContent) {
            console.error(
                `❌ Verification failed for ${filePath}: Content mismatch after write`
            );
            return false;
        }

        return true;
    } catch (err) {
        console.error(`❌ Error updating ${filePath}:`, err.message);
        return false;
    }
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
    const docsRoot = process.argv[2] || '../../';
    const docsPath = path.resolve(__dirname, docsRoot);

    console.log('📚 Regenerating CONTRIBUTOR-DOCS navigation...\n');
    console.log(`   Root: ${docsPath}\n`);

    // Step 1: Extract metadata
    console.log('🔍 Extracting metadata...');
    const startTime = Date.now();
    const metadata = walkTree(docsPath);
    const extractTime = Date.now() - startTime;
    console.log(
        `   ✓ Found ${Object.keys(metadata.files).length} files and ${Object.keys(metadata.folders).length} folders (${extractTime}ms)\n`
    );

    // Step 2: Update all files
    console.log('📝 Updating files...');
    let updateCount = 0;
    let skipCount = 0;

    for (const filePath of Object.keys(metadata.files)) {
        if (updateFile(filePath, metadata, docsPath)) {
            updateCount++;
            console.log(`   ✓ ${filePath}`);
        } else {
            skipCount++;
        }
    }

    const totalTime = Date.now() - startTime;

    console.log(`\n✅ Complete!`);
    console.log(`   Updated: ${updateCount} files`);
    if (skipCount > 0) {
        console.log(`   Skipped: ${skipCount} files`);
    }
    console.log(`   Total time: ${totalTime}ms\n`);
}

// Run if called directly
main();

export { walkTree, generateBreadcrumb, generateTOC, updateFile };
