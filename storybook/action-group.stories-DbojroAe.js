import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import './sp-action-group-B13QDRfi.js';
import './sp-action-button-DsNjWZwM.js';
import './overlay-trigger-DwDaLntS.js';
import './sp-tooltip-CuYNrF2w.js';
import './sp-icon-view-all-tags-Bbj5565V.js';
import './sp-icon-info-qGTcHj-l.js';
import './sp-action-menu-DWRpKQNS.js';
import './sp-menu-C8v97wTb.js';
import './sp-menu-item-8u7lqO6f.js';
import { x } from './lit-html-COgVUehj.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-Cgw04SVn.js';
import './define-element-DfDMCiEa.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-icon-corner-triangle300-BFQa-tNZ.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Fm5B4nA1.js';
import './ButtonBase-C7Ofi_KG.js';
import './like-anchor-BYGSHbJ7.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DH4iFM4s.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BtuI5sqC.js';
import './query-assigned-nodes-DAYI4epk.js';
import './state-Bu2qBYzT.js';
import './focusable-selectors-CUZEb4r9.js';
import './DependencyManger-Dpkh1Bse.js';
import './ViewAllTags-CXAQ2MQ6.js';
import './custom-tag-Diwq7nXX.js';
import './Info-CGVxk8Iv.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-icon-more-ed5g2Y4T.js';
import './More-C2yzfCOG.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-Cv9SU9tX.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-rjktYDjS.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-BytVFlW2.js';
import './MatchMedia-pSNe9kbs.js';
import './class-map-DdRvesrq.js';
import './style-map-DtKTc8KS.js';
import './when-DEJm_QN9.js';
import './spectrum-icon-checkmark.css-aJBgz3nt.js';
import './random-id-BST1Puzz.js';

var actionGroup_stories = {
  title: "Action Group",
  component: "sp-action-group",
  args: {
    compact: false,
    emphasized: false,
    justified: false,
    quiet: false,
    vertical: false,
    size: "m"
  },
  argTypes: {
    compact: {
      name: "compact",
      description: "Visually joins the buttons together to clarify their relationship to one another.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    emphasized: {
      name: "emphasized",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    justified: {
      name: "justified",
      description: "Aligns the action group items to use all the available space on that line.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    vertical: {
      name: "vertical",
      description: "Changes the orientation of the action group.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    size: {
      name: "size",
      description: "The size at which to display the action group.",
      type: { name: "string", required: true },
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "select",
        options: ["s", "m", "l", "xl"]
      }
    }
  }
};
function renderIconButtons(args) {
  return x`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
}
function renderButtons(args) {
  return x`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
}
function displaySelectionState() {
  const group = document.querySelector("sp-action-group");
  const selectedDiv = group.nextElementSibling;
  if (selectedDiv) {
    selectedDiv.textContent = `Selected: ${JSON.stringify(group.selected)}`;
  }
}
const Default = (args) => renderButtons(args);
const HasActionMenuAsChild = (args) => {
  return x`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button id="first">Button 1</sp-action-button>
            <sp-action-button id="second">Longer Button 2</sp-action-button>
            <sp-action-button id="third">Short 3</sp-action-button>
            <sp-action-menu label="More Actions" id="action-menu">
                <sp-menu-item id="first-menu-item">One</sp-menu-item>
                <sp-menu-item id="second-menu-item">Two</sp-menu-item>
                <sp-menu-item id="third-menu-item">Three</sp-menu-item>
                <sp-menu-item id="fourth-menu-item">
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item id="first-sub-menu-item">A</sp-menu-item>
                        <sp-menu-item selected id="second-sub-menu-item">
                            B
                        </sp-menu-item>
                        <sp-menu-item id="third-sub-menu-item">C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-group>
    `;
};
const selectsSingle = (args) => {
  requestAnimationFrame(displaySelectionState);
  return x`
        <sp-action-group
            ?compact=${args.compact}
            ?emphasized=${args.emphasized}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            ?vertical=${args.vertical}
            size=${args.size}
            label="Favorite Color"
            selects="single"
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button>Green</sp-action-button>
            <sp-action-button>Blue</sp-action-button>
            <sp-action-button selected>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};
const selectsMultiple = (args) => {
  requestAnimationFrame(displaySelectionState);
  return x`
        <sp-action-group
            ${spreadProps(args)}
            label="Favorite Colors"
            selects="multiple"
            size=${args.size}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button selected>Green</sp-action-button>
            <sp-action-button selected>Blue</sp-action-button>
            <sp-action-button>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};
const selectsMultipleWithTooltips = (args) => {
  return x`
        <sp-action-group
            ${spreadProps(args)}
            label="Favorite Color"
            selects="multiple"
            size=${args.size}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Blue</sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        <div>Selected:</div>
    `;
};
const selectsMultipleControlled = (args) => {
  requestAnimationFrame(displaySelectionState);
  return x`
        <sp-action-group
            ${spreadProps(args)}
            selects="multiple"
            .selected=${["donuts", "crepecakes"]}
            label="Favorite Dessert"
            size=${args.size}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <sp-action-button value="lavacakes">Lava Cakes</sp-action-button>
            <sp-action-button value="donuts">Donuts</sp-action-button>
            <sp-action-button value="crepecakes">Crepe Cake</sp-action-button>
            <sp-action-button value="fruittarts">Fruit Tarts</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};
const iconsOnly = (args) => renderIconButtons(args);
const quietIconsOnly = (args) => renderIconButtons(args);
quietIconsOnly.args = {
  quiet: true
};
const compact = (args) => renderButtons(args);
compact.args = {
  compact: true
};
const compactIconsOnly = (args) => renderIconButtons(args);
compactIconsOnly.args = {
  compact: true
};
const compactQuietIconsOnly = (args) => renderIconButtons(args);
compactQuietIconsOnly.args = {
  compact: true,
  quiet: true
};
const vertical = (args) => renderButtons(args);
vertical.args = {
  vertical: true
};
const verticalIconsOnly = (args) => renderIconButtons(args);
verticalIconsOnly.args = {
  vertical: true
};
const verticalQuietIconsOnly = (args) => renderIconButtons(args);
verticalQuietIconsOnly.args = {
  quiet: true,
  vertical: true
};
const compactVertical = (args) => renderButtons(args);
compactVertical.args = {
  compact: true,
  vertical: true
};
const compactVerticalIconsOnly = (args) => renderIconButtons(args);
compactVerticalIconsOnly.args = {
  compact: true,
  vertical: true
};
const compactQuietVerticalIconsOnly = (args) => renderIconButtons(args);
compactQuietVerticalIconsOnly.args = {
  compact: true,
  quiet: true,
  vertical: true
};
const justified = (args) => renderButtons(args);
justified.args = {
  justified: true
};
const justifiedIconsOnly = (args) => renderIconButtons(args);
justifiedIconsOnly.args = {
  justified: true
};
const compactJustifiedIconsOnly = (args) => renderIconButtons(args);
compactJustifiedIconsOnly.args = {
  compact: true,
  justified: true
};
const __namedExportsOrder = ['Default', 'HasActionMenuAsChild', 'selectsSingle', 'selectsMultiple', 'selectsMultipleWithTooltips', 'selectsMultipleControlled', 'iconsOnly', 'quietIconsOnly', 'compact', 'compactIconsOnly', 'compactQuietIconsOnly', 'vertical', 'verticalIconsOnly', 'verticalQuietIconsOnly', 'compactVertical', 'compactVerticalIconsOnly', 'compactQuietVerticalIconsOnly', 'justified', 'justifiedIconsOnly', 'compactJustifiedIconsOnly'];

export { Default, HasActionMenuAsChild, __namedExportsOrder, compact, compactIconsOnly, compactJustifiedIconsOnly, compactQuietIconsOnly, compactQuietVerticalIconsOnly, compactVertical, compactVerticalIconsOnly, actionGroup_stories as default, iconsOnly, justified, justifiedIconsOnly, quietIconsOnly, selectsMultiple, selectsMultipleControlled, selectsMultipleWithTooltips, selectsSingle, vertical, verticalIconsOnly, verticalQuietIconsOnly };
