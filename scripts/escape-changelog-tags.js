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
