import './sp-menu-aukB87hm.js';
import './sp-popover-jafHnpZt.js';
import './sp-action-menu-uc15JKgb.js';
import './sp-menu-item-BnuqroME.js';
import './sp-menu-divider-IXmQjkt_.js';
import './sp-menu-group-3Mvqxw6r.js';
import './sp-icon-34kpoGCA.js';
import './sp-icon-checkmark-circle-gh3q3zGC.js';
import './sp-icon-share-HoPQoVPz.js';
import './sp-icon-show-menu-gBQdUEup.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-D9_yg9Lr.js';
import './define-element-s04w2teA.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './sp-action-button-yJ_5Ao_n.js';
import './sp-icon-corner-triangle300-XX4Nm8CT.js';
import './CornerTriangle300-wDtTC9xD.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './sp-icon-more-xai1q3s_.js';
import './More-RXlxfRbl.js';
import './custom-tag-JXLWq-Sj.js';
import './Picker-C-8dV5AK.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './sp-icon-alert-CNIIZm3E.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './state-BSEind79.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './divider.css-w129hLpK.js';
import './CheckmarkCircle-N2jki7Pe.js';
import './Share-9XORtjdK.js';
import './ShowMenu-Yp5aHsEW.js';

var menu_stories = {
  component: "sp-menu",
  title: "Menu"
};
const Default = () => {
  return x`
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const singleSelect = () => {
  return x`
        <sp-menu
            selects="single"
            @change=${({
    target: { value }
  }) => {
    navigator.clipboard.writeText(value);
  }}
        >
            <sp-menu-item selected>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu
                selects="single"
                @change=${({
    target: { value }
  }) => {
    navigator.clipboard.writeText(value);
  }}
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item selected>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const multipleSelect = () => {
  return x`
        <sp-menu selects="multiple">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu selects="multiple">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item selected>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const controlled = () => {
  const forceSelection = (event) => {
    event.target.updateComplete.then(() => {
      event.target.selected = ["Select and Mask..."];
    });
  };
  return x`
        <p>
            This Menu will default to a
            <code>selected</code>
            value of
            <code>[ 'Feather...', 'Save Selection' ]</code>
            but then on any subsequent interaction be forced to a
            <code>selected</code>
            value of
            <code>[ 'Select and Mask...' ]</code>
            .
        </p>
        <sp-menu selects="multiple" @change=${forceSelection}>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    `;
};
controlled.swc_vrt = {
  skip: true
};
const menuItemWithDescription = () => {
  return x`
        <sp-menu>
            <sp-menu-item>
                <sp-icon-export slot="icon"></sp-icon-export>
                Quick export
                <span slot="description">Share a snapshot</span>
            </sp-menu-item>
            <sp-menu-item>
                <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                Open a copy
                <span slot="description">Illustrator for iPad</span>
            </sp-menu-item>
            <sp-menu-item>
                <sp-icon-share slot="icon"></sp-icon-share>
                Share link
                <span slot="description">Enable comments and download</span>
            </sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu selects="multiple">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>
                    Select Inverse
                    <span slot="description">Enable inverse selection</span>
                </sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item selected>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>
                    Make Work Path
                    <span slot="description">Create a reusable work path</span>
                </sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const selectsWithIcons = () => {
  return x`
        <sp-popover open>
            <sp-menu selects="single">
                <sp-menu-item>
                    <sp-icon-export slot="icon"></sp-icon-export>
                    Quick export
                </sp-menu-item>
                <sp-menu-item selected>
                    <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                    Open a copy
                </sp-menu-item>
                <sp-menu-item>
                    <sp-icon-share slot="icon"></sp-icon-share>
                    Share link
                    <span slot="description">Enable comments and download</span>
                </sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};
const headersAndIcons = () => {
  return x`
        <sp-popover open>
            <sp-menu selects="single">
                <sp-menu-group>
                    <span slot="header">Section Heading</span>
                    <sp-menu-item>Action 1</sp-menu-item>
                    <sp-menu-item>Action 2</sp-menu-item>
                    <sp-menu-item>Action 3</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group>
                    <span slot="header">Section Heading</span>
                    <sp-menu-item>
                        <sp-icon-checkmark-circle
                            slot="icon"
                        ></sp-icon-checkmark-circle>
                        Save
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        <sp-icon-checkmark-circle
                            slot="icon"
                        ></sp-icon-checkmark-circle>
                        Download
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        <sp-icon-checkmark-circle
                            slot="icon"
                        ></sp-icon-checkmark-circle>
                        Share link
                        <span slot="description">Enable comments</span>
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};
headersAndIcons.storyName = "Headers and Icons";
const Selected = () => {
  return x`
        <sp-popover open style="width: 200px;">
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">San Francisco</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">Oakland</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};
const MenuGroupSelects = () => {
  return x`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="single">
                <sp-menu-group selects="inherit">
                    <span slot="header">One of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item>Cedar Riverside</sp-menu-item>
                    <sp-menu-item>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item selected>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">Or of these</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="multiple">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item selected>South of Market</sp-menu-item>
                    <sp-menu-item selected>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};
const selectedOffPage = () => {
  return x`
        <p style="height: 100vh; padding-bottom: 50px;">
            In this example the \`&lt;sp-menu-item selected&gt;\` element is off
            the visible page by default, but does not alter the page scroll on
            load.
        </p>
        <sp-menu>
            <sp-menu-item selected style="padding-bottom: 50px;">
                My best friend's mom's house in the burbs just off Silverado
                street
            </sp-menu-item>
        </sp-menu>
    `;
};
const MenuGroupSelectsMultiple = () => {
  return x`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="multiple">
                <sp-menu-group selects="inherit">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item selected>Cedar Riverside</sp-menu-item>
                    <sp-menu-item selected>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">And these, too</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item selected>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group>
                    <span slot="header">None of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};
const __namedExportsOrder = ['Default', 'singleSelect', 'multipleSelect', 'controlled', 'menuItemWithDescription', 'selectsWithIcons', 'headersAndIcons', 'Selected', 'MenuGroupSelects', 'selectedOffPage', 'MenuGroupSelectsMultiple'];

export { Default, MenuGroupSelects, MenuGroupSelectsMultiple, Selected, __namedExportsOrder, controlled, menu_stories as default, headersAndIcons, menuItemWithDescription, multipleSelect, selectedOffPage, selectsWithIcons, singleSelect };
