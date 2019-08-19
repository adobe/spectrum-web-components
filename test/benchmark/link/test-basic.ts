import '../../../lib/link';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-link href="test_url">Default Link</sp-link>
`);
