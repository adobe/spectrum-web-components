// A loader to convert css into a Typescript module that
// exports a default CSSResult containing the compiled CSS

const path = require('path');
const { stripIndent } = require('common-tags');

const filenameToOutputFilename = (filename) => {
    const dirName = path.dirname(filename);
    const baseName = path.basename(filename);
    return path.join(dirName, `${baseName}.ts`);
};

const loaderUtils = require('loader-utils');

module.exports = function loader(content, ...rest) {
    const filename = this.resourcePath;
    const outputFilename = filenameToOutputFilename(filename);
    // wrap the file in css literal
    const code = stripIndent`
        import { css } from 'lit-element';
        const styles = css\`
            ${content}
        \`;
        export default styles;
    `;
    const url = loaderUtils.interpolateName(this, outputFilename, {
        content: code,
    });
    this.emitFile(url, code);
    return code;
};
