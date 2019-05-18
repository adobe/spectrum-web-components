// A loader to convert css into a Typescript module that
// exports a default CSSResult containing the compiled CSS

const { getOptions } = require('loader-utils');
const _ = require('lodash');

const tsTemplate = _.template(`
import { css } from 'lit-element';
const styles = css\`
    <%= contents %>
\`;
export default styles;
`);

module.exports = function loader(source) {
    const code = tsTemplate({ contents: source });
    return code;
};
