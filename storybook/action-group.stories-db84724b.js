import { s as spreadProps } from './lit-helpers-bb820419.js';
import './sp-action-group-ba39e0fa.js';
import './sp-action-button-91f1b102.js';
import './overlay-trigger-d0127dc2.js';
import './sp-tooltip-c485c478.js';
import './sp-icon-view-all-tags-9e368f39.js';
import './sp-icon-info-132b9a4b.js';
import { x } from './lit-html-126adc72.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './mutation-controller-81a30f7f.js';
import './lit-element-9354aa77.js';
import './sizedMixin-281e4c72.js';
import './define-element-43d4edd5.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './sp-icon-corner-triangle300-48f3695d.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './query-assigned-nodes-c8aaaadd.js';
import './state-0afa7555.js';
import './focusable-selectors-252ae36e.js';
import './ViewAllTags-0af463f4.js';
import './custom-tag-b5526d41.js';
import './Info-d70f219e.js';

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
const __namedExportsOrder = ['Default', 'selectsSingle', 'selectsMultiple', 'selectsMultipleWithTooltips', 'selectsMultipleControlled', 'iconsOnly', 'quietIconsOnly', 'compact', 'compactIconsOnly', 'compactQuietIconsOnly', 'vertical', 'verticalIconsOnly', 'verticalQuietIconsOnly', 'compactVertical', 'compactVerticalIconsOnly', 'compactQuietVerticalIconsOnly', 'justified', 'justifiedIconsOnly', 'compactJustifiedIconsOnly'];

export { Default, __namedExportsOrder, compact, compactIconsOnly, compactJustifiedIconsOnly, compactQuietIconsOnly, compactQuietVerticalIconsOnly, compactVertical, compactVerticalIconsOnly, actionGroup_stories as default, iconsOnly, justified, justifiedIconsOnly, quietIconsOnly, selectsMultiple, selectsMultipleControlled, selectsMultipleWithTooltips, selectsSingle, vertical, verticalIconsOnly, verticalQuietIconsOnly };
