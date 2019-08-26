import '../../../lib/dropdown';
import '../../../lib/menu';
import '../../../lib/menu-item';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-dropdown>
        Select a Country with a very long label, too long in fact
        <sp-menu slot="options">
            <sp-menu-item>
                Deselect
            </sp-menu-item>
            <sp-menu-item>
                Select Inverse
            </sp-menu-item>
            <sp-menu-item>
                Feather...
            </sp-menu-item>
            <sp-menu-item>
                Select and Mask...
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Save Selection
            </sp-menu-item>
            <sp-menu-item disabled>
                Make Work Path
            </sp-menu-item>
        </sp-menu>
    </sp-dropdown>
`);
