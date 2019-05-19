// A loader to convert css into a Typescript module that
// exports a default CSSResult containing the compiled CSS

const { stripIndent } = require('common-tags');

module.exports = function loader(source) {
    const code = stripIndent`
        import { css } from 'lit-element';
        const styles = css\`
            ${source}
        \`;
        export default styles;
    `;
    return code;
};
