#!/usr/bin/env node

/**
 * Link verification module for CONTRIBUTOR-DOCS.
 * Validates internal markdown links and anchors.
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// MARKER CONSTANTS (must match update-nav.js)
// ============================================================================

const MARKER_CONTENT = '<!-- Document content (editable) -->';

// ============================================================================
// UTILITY FUNCTIONS (imported from update-nav.js concepts)
// ============================================================================

/**
 * Find all code block regions to exclude from link extraction.
 * Includes both fenced code blocks (```...```) and inline code (`...`).
 */
function findCodeBlockRanges(content) {
    const codeBlockRanges = [];
    
    // First pass: Find fenced code blocks (higher priority)
    const fencedBlockRegex = /^```[\s\S]*?^```/gm;
    let match;
    while ((match = fencedBlockRegex.exec(content)) !== null) {
        codeBlockRanges.push({
            start: match.index,
            end: match.index + match[0].length,
        });
    }
    
    // Second pass: Find inline code (excluding content already in fenced blocks)
    // Match content between single backticks, excluding newlines
    const inlineCodeRegex = /`[^`\n]+`/g;
    while ((match = inlineCodeRegex.exec(content)) !== null) {
        const matchStart = match.index;
        const matchEnd = match.index + match[0].length;
        
        // Skip if this inline code is already inside a fenced block
        const insideFencedBlock = codeBlockRanges.some(
            (range) => matchStart >= range.start && matchStart < range.end
        );
        
        if (!insideFencedBlock) {
            codeBlockRanges.push({
                start: matchStart,
                end: matchEnd,
            });
        }
    }
    
    return codeBlockRanges;
}

/**
 * Find marker position, excluding those inside code blocks.
 */
function findMarkerPosition(content, marker) {
    const codeBlockRanges = findCodeBlockRanges(content);
    let pos = 0;

    while (true) {
        pos = content.indexOf(marker, pos);
        if (pos === -1) {
            return -1;
        }

        const inCodeBlock = codeBlockRanges.some(
            (range) => pos >= range.start && pos < range.end
        );

        if (!inCodeBlock) {
            return pos;
        }

        pos += marker.length;
    }
}

/**
 * Generate GitHub-style anchor from heading text.
 */
function makeAnchor(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

// ============================================================================
// LINK EXTRACTION
// ============================================================================

/**
 * Extract all markdown links from document content (excluding auto-generated sections).
 * Returns array of link objects with metadata for validation.
 */
function extractLinksFromContent(filepath, content) {
    const links = [];

    // Only search in document content (after content marker)
    const contentPos = findMarkerPosition(content, MARKER_CONTENT);
    let docContent;
    let contentOffset = 0;

    if (contentPos !== -1) {
        docContent = content.substring(contentPos + MARKER_CONTENT.length);
        contentOffset = contentPos + MARKER_CONTENT.length;
    } else {
        // No marker found, read entire file
        docContent = content;
    }

    // Find all code block regions to exclude
    const codeBlockRanges = findCodeBlockRanges(docContent);

    // Extract markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(docContent)) !== null) {
        const linkPos = match.index;

        // Skip links in code blocks
        const inCodeBlock = codeBlockRanges.some(
            (range) => linkPos >= range.start && linkPos < range.end
        );
        if (inCodeBlock) continue;

        const linkText = match[1];
        const linkHref = match[2];

        // Only process relative markdown file links (not external URLs or non-md files)
        if (
            linkHref.startsWith('http://') ||
            linkHref.startsWith('https://') ||
            linkHref.startsWith('//')
        ) {
            continue; // Skip external URLs
        }

        // Calculate approximate line number for error reporting
        const beforeLink = content.substring(0, contentOffset + linkPos);
        const lineNumber = (beforeLink.match(/\n/g) || []).length + 1;

        links.push({
            text: linkText,
            href: linkHref,
            line: lineNumber,
            position: linkPos,
        });
    }

    return links;
}

// ============================================================================
// LINK VALIDATION
// ============================================================================

/**
 * Validate a single link.
 * Returns validation result with error details if invalid.
 */
function validateLink(sourceFile, link, metadata, docsRoot) {
    const { href } = link;

    // Parse link into file path and anchor
    const [linkPath, anchor] = href.split('#');

    // Skip empty paths (pure anchor links like "#section")
    if (!linkPath && anchor) {
        // Internal anchor link - validate against source file's own headings
        const fileMeta = metadata.files[sourceFile];
        if (!fileMeta || !fileMeta.headings) {
            return {
                valid: false,
                errorType: 'INTERNAL_ERROR',
                details: 'Could not load file metadata',
            };
        }

        const anchorExists = fileMeta.headings.some((h) => h.anchor === anchor);
        if (!anchorExists) {
            const availableAnchors = fileMeta.headings.map((h) => h.anchor);
            return {
                valid: false,
                errorType: 'ANCHOR_NOT_FOUND',
                details: `Anchor "#${anchor}" not found in current file`,
                suggestions: availableAnchors.slice(0, 5), // Show first 5 available
            };
        }

        return { valid: true };
    }

    // Resolve relative path
    const sourceDir = path.dirname(sourceFile);
    const resolvedPath = path.normalize(path.join(sourceDir, linkPath));

    // Find the target file in metadata
    let targetFileMeta = metadata.files[resolvedPath];

    // If not found, try with .md extension if not already present
    if (!targetFileMeta && !linkPath.endsWith('.md')) {
        const withMd = resolvedPath + '.md';
        targetFileMeta = metadata.files[withMd];
    }

    if (!targetFileMeta) {
        // File not found - try to find similar files for suggestions
        const targetFilename = path.basename(linkPath, '.md');
        const suggestions = Object.keys(metadata.files)
            .filter((f) => {
                const basename = path.basename(f, '.md');
                return (
                    basename.toLowerCase().includes(targetFilename.toLowerCase()) ||
                    targetFilename.toLowerCase().includes(basename.toLowerCase())
                );
            })
            .slice(0, 3);

        return {
            valid: false,
            errorType: 'FILE_NOT_FOUND',
            details: `Target file not found: ${linkPath}`,
            resolvedPath,
            suggestions,
        };
    }

    // Validate anchor if present
    if (anchor) {
        if (!targetFileMeta.headings || targetFileMeta.headings.length === 0) {
            return {
                valid: false,
                errorType: 'ANCHOR_NOT_FOUND',
                details: `Target file has no headings`,
                suggestions: [],
            };
        }

        const anchorExists = targetFileMeta.headings.some(
            (h) => h.anchor === anchor
        );
        if (!anchorExists) {
            const availableAnchors = targetFileMeta.headings.map((h) => h.anchor);
            // Try to find similar anchors
            const similarAnchors = availableAnchors.filter((a) =>
                a.includes(anchor) || anchor.includes(a)
            );

            return {
                valid: false,
                errorType: 'ANCHOR_NOT_FOUND',
                details: `Anchor "#${anchor}" not found in ${linkPath}`,
                suggestions: similarAnchors.length > 0 ? similarAnchors : availableAnchors.slice(0, 5),
            };
        }
    }

    return { valid: true };
}

// ============================================================================
// MAIN VERIFICATION
// ============================================================================

/**
 * Verify all links in all documentation files.
 * Returns comprehensive validation results.
 */
function verifyAllLinks(metadata, docsRoot) {
    const errors = [];
    let totalLinks = 0;

    for (const [filepath, fileMeta] of Object.entries(metadata.files)) {
        try {
            const content = fs.readFileSync(fileMeta.fullPath, 'utf-8');
            const links = extractLinksFromContent(filepath, content);

            totalLinks += links.length;

            for (const link of links) {
                const result = validateLink(filepath, link, metadata, docsRoot);

                if (!result.valid) {
                    errors.push({
                        sourceFile: filepath,
                        line: link.line,
                        linkText: link.text,
                        linkHref: link.href,
                        errorType: result.errorType,
                        details: result.details,
                        suggestions: result.suggestions || [],
                    });
                }
            }
        } catch (err) {
            console.error(`⚠️  Error reading ${filepath}:`, err.message);
        }
    }

    return {
        valid: errors.length === 0,
        totalLinks,
        errorCount: errors.length,
        errors,
        summary: {
            totalFiles: Object.keys(metadata.files).length,
            totalLinks,
            brokenLinks: errors.length,
            validLinks: totalLinks - errors.length,
        },
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

export { verifyAllLinks, extractLinksFromContent, validateLink };

