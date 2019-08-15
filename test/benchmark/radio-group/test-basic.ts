import '../../../lib/radio-group';
import '../../../lib/radio';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-radio-group id="test-default">
        <sp-radio value="first" checked>Option 1</sp-radio>
        <sp-radio value="second">Option 2</sp-radio>
        <sp-radio value="third">Option 3</sp-radio>
    </sp-radio-group>
`);
