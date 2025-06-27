import fs from 'fs';

function parseTokens(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /--([a-zA-Z0-9-_]+):\s*([^;]+);/g;
    const tokens = {};
    let match;
    while ((match = regex.exec(content)) !== null) {
        tokens[`--${match[1]}`] = match[2].trim();
    }
    return tokens;
}

function compareTokens(tokensA, tokensB) {
    const allKeys = new Set([...Object.keys(tokensA), ...Object.keys(tokensB)]);
    const diffs = [];
    for (const key of allKeys) {
        if (tokensA[key] !== tokensB[key]) {
            diffs.push({
                token: key,
                old: tokensA[key] || '(missing)',
                new: tokensB[key] || '(missing)',
            });
        }
    }
    return diffs;
}

// Usage: node compare-tokens-md.js path/to/old.css path/to/new.css
const [, , oldFile, newFile] = process.argv;
if (!oldFile || !newFile) {
    console.error(
        'Usage: node compare-tokens-md.js path/to/old.css path/to/new.css'
    );
    process.exit(1);
}

const oldTokens = parseTokens(oldFile);
const newTokens = parseTokens(newFile);
const diffs = compareTokens(oldTokens, newTokens);

if (diffs.length === 0) {
    console.log('No differences found.');
    process.exit(0);
}

console.log('| Token | Old Value | New Value |');
console.log('|-------|-----------|-----------|');
diffs.forEach((diff) => {
    // Escape pipe characters for Markdown
    const oldVal = diff.old.replace(/\|/g, '\\|');
    const newVal = diff.new.replace(/\|/g, '\\|');
    console.log(`| \`${diff.token}\` | \`${oldVal}\` | \`${newVal}\` |`);
});
