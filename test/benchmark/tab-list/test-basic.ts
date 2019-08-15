import '../../../lib/tab-list';
import '../../../lib/tab';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-tab-list selected="first">
        <sp-tab label="Tab 1" value="first" tabindex="1"></sp-tab>
        <sp-tab label="Tab 2" value="second" tabindex="2"></sp-tab>
        <sp-tab label="Tab 3" value="third" tabindex="3"></sp-tab>
    </sp-tab-list>
`);
