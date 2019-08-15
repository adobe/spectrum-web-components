import '../../../lib/icon';
import { defineCustomElements } from '../../../lib/define';
import * as MediumIcons from '../../../lib/icons/icons-medium';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

defineCustomElements(...Object.values(MediumIcons));

const iconset = document.createElement('sp-icons-medium');
document.body.append(iconset);

measureFixtureCreation(html`
    <sp-icon size="xxs" name="ui:CheckmarkMedium"></sp-icon>
`);
