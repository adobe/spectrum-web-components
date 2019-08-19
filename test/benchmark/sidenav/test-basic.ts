import {
    defineCustomElements,
    SideNav,
    SideNavItem,
    SideNavHeading,
} from '../../../lib';

defineCustomElements(SideNav, SideNavItem, SideNavHeading);
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-sidenav>
        <sp-sidenav-item value="Section 1" label="Section 1"></sp-sidenav-item>
        <sp-sidenav-item
            selected
            value="Section 2"
            label="Section 2"
        ></sp-sidenav-item>
        <sp-sidenav-heading label="CATEGORY 1">
            <sp-sidenav-item
                value="Section 3"
                label="Section 3"
            ></sp-sidenav-item>
            <sp-sidenav-item
                value="Section 4"
                label="Section 4"
            ></sp-sidenav-item>
        </sp-sidenav-heading>
    </sp-sidenav>
`);
