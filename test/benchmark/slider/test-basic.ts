import '../../../lib/slider';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-slider
        value="50"
        step="1"
        min="0"
        max="100"
        label="Opacity"
        id="opacity-slider"
    />
`);
