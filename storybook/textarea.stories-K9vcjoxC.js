import './sp-textfield-em5zHX20.js';
import './sp-field-label-MGGfIObj.js';
import './sp-help-text-fgzTjtTp.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Textfield-DcG6jznK.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './define-element-s04w2teA.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sizedMixin-D9_yg9Lr.js';
import './base-STdhtiz1.js';
import './state-BSEind79.js';
import './query-JMOstM_r.js';
import './ElementResolution-TTOqkMM7.js';

var textarea_stories = {
  component: "sp-textfield",
  title: "Textarea"
};
const Default = () => {
  return x`
        <sp-textfield
            multiline
            label="Enter your life story"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\w\\s]+"
            required
            valid
            value="A valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            required
            valid
            value="A valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            required
            value="Not a valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            invalid
            required
            value="Not a valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
    `;
};
const quiet = () => x`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        autofocus
        multiline
        id="story"
        quiet
        placeholder="Enter your life story"
    ></sp-textfield>
`;
const grows = () => x`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        grows
        placeholder="Enter your life story"
    ></sp-textfield>
`;
const growsQuiet = () => x`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        grows
        quiet
        placeholder="Enter your life story"
    ></sp-textfield>
`;
const growsEmpty = () => x`
    <sp-field-label for="empty">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield
        multiline
        id="empty"
        grows
        placeholder="You can type here"
        autofocus
    >
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;
const growsWithLargeWords = () => x`
    <sp-field-label for="story">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed utperspiciatisundeomnisistenatuserrorsitvoluptatemaccusantiumdoloremquelaudantium,totamemaperiam, eaque ipsa quae ab illo inventore veritatis etquasiarchitectobeataevitaedictasuntexplicabo. Nemo enimipsamvoluptatemquiavoluptassitaspernaturautoditautfugitsedquiaconsequunturmagnidoloreseosquirationevoluptatemsequinesciunt."
        grows
        placeholder="Enter your life story"
    ></sp-textfield>
`;
const readonly = () => x`
    <sp-textfield
        multiline
        label="Enter your life story"
        value="A readonly textarea"
        readonly
        placeholder="Enter your life story"
    ></sp-textfield>
`;
const resizeControls = () => x`
    <sp-textfield
        multiline
        style="resize: none;"
        label="No resize control"
        placeholder="No resize control"
    ></sp-textfield>

    <sp-textfield
        multiline
        style="resize: vertical;"
        label="Vertical resize control"
        placeholder="Vertical resize control"
    ></sp-textfield>

    <sp-textfield
        multiline
        style="resize: horizontal;"
        label="Horizontal resize control"
        placeholder="Horizontal resize control"
    ></sp-textfield>
`;
const sized = () => x`
    <sp-field-label for="sized">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield
        multiline
        id="sized"
        placeholder="You can type here"
        autofocus
        style="width: 400px"
    >
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;
const with5Rows = () => x`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="predefinedRows"
        value="Line 1
Line 2
Line 3
Line 4
Line 5"
        placeholder="Enter your life story"
        rows="5"
    ></sp-textfield>
`;
const rowsDefeatsGrows = () => x`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        grows
        id="predefinedRows"
        value="Line 1
Line 2
Line 3
Line 4
Line 5"
        placeholder="Enter your life story"
        rows="3"
    ></sp-textfield>
`;
const with1Row = () => x`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="predefinedRows"
        value="Line 1"
        placeholder="Enter your life story"
        rows="1"
    ></sp-textfield>
`;
const __namedExportsOrder = ['Default', 'quiet', 'grows', 'growsQuiet', 'growsEmpty', 'growsWithLargeWords', 'readonly', 'resizeControls', 'sized', 'with5Rows', 'rowsDefeatsGrows', 'with1Row'];

export { Default, __namedExportsOrder, textarea_stories as default, grows, growsEmpty, growsQuiet, growsWithLargeWords, quiet, readonly, resizeControls, rowsDefeatsGrows, sized, with1Row, with5Rows };
