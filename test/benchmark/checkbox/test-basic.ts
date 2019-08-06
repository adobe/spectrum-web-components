import '../../../lib/checkbox';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-checkbox id="checkbox0" tabindex="5">
        Component
    </sp-checkbox>
`);
