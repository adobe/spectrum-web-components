import '../../../lib/banner';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-banner type="info">
        <div slot="header">Info Text</div>
        <div slot="content">Info Content</div>
    </sp-banner>
`);
