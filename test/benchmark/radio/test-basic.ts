import '../../../lib/radio';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-radio value="first" checked>Option 1</sp-radio>
    <sp-radio value="second">Option 2</sp-radio>
    <sp-radio value="third" autofocus>Option 3</sp-radio>
    <sp-radio value="fourth" disabled>Option 4</sp-radio>
`);
