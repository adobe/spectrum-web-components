import { replaceInFile } from 'replace-in-file';

// make sure inline tags are escaped
const tagOptions = {
    files: '.changeset/*.md',
    from: /`?(<[a-zA-Z]+(-[a-zA-Z]+)*>)`?/g,
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
//make sure we don't escape tags in code snippets
const codeOptions = {
    files: '.changeset/*.md',
    from: /(`{3,})([A-Za-z]{0,4}\n)([^`]*)`(<\w+(?:-\w+)*>)`([^`]*)/g, // (`{3,})([A-Za-z]{0,4}\n)([^`]*)`(<\w+(-\w+)*>)`{1}
    to: '$1$2$3$4$5',
};
try {
    const results = await replaceInFile(codeOptions);
    console.log('Do not escape code snippet tags in .changeset/*.md:', results);
} catch (error) {
    console.error(
        'Error occurred avoiding code snippet tags in .changeset/*.md:',
        error
    );
}
