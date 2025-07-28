"use strict";
import {
  css,
  html,
  SpectrumElement
} from "@spectrum-web-components/base";
import "@spectrum-web-components/grid/sp-grid.js";
import "@spectrum-web-components/action-bar/sp-action-bar.js";
import "@spectrum-web-components/card/sp-card.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";
export default {
  title: "Grid",
  component: "sp-grid"
};
function generateItems(count) {
  const items = [];
  while (count) {
    count -= 1;
    items.unshift({ id: count });
  }
  return items;
}
const renderItem = (item, index, selected) => {
  return html`
        <sp-card
            toggles
            variant="quiet"
            heading="Card Heading ${item.id}"
            subheading="JPG Photo"
            style="contain: strict; padding: 1px;"
            value="card-${item.id}"
            .selected=${selected}
            key=${index}
            draggable="true"
            role="row"
            aria-selected=${selected}
            aria-rowindex=${index + 1}
            label="Card Heading ${item.id}"
        >
            <img
                alt=""
                slot="preview"
                src="https://picsum.photos/id/${item.id}/200/300"
                decoding="async"
            />
            <div slot="description">10/15/18</div>
            <div slot="footer">Footer</div>
            <sp-action-menu
                label="File actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
                <sp-tooltip slot="tooltip" self-managed placement="top">
                    Do stuff
                </sp-tooltip>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `;
};
const handleChange = (event) => {
  const actionbar = document.querySelector("sp-action-bar");
  const selected = document.querySelector(".selected");
  const ids = document.querySelector(".ids");
  actionbar.open = !!event.currentTarget.selected.length;
  actionbar.style.setProperty(
    "display",
    !!event.currentTarget.selected.length ? "flex" : "none"
  );
  selected.textContent = "" + event.currentTarget.selected.length;
  ids.textContent = `[${"" + event.currentTarget.selected.map((selection) => selection.id).join(", ")}]`;
};
const handleActionBarChange = (event) => {
  event.preventDefault();
  const grid = document.querySelector("sp-grid");
  const actionbar = document.querySelector("sp-action-bar");
  actionbar.open = false;
  grid.selected = [];
};
export const Default = () => {
  const items = generateItems(40);
  return html`
        <h1>
            <label for="first-input">
                Random before content that is focusable
            </label>
        </h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
            role="grid"
            aria-label="Select images"
            aria-multiselectable="true"
            aria-rowcount=${items.length}
            aria-colcount=${1}
        ></sp-grid>
        <sp-action-bar variant="fixed">
            <sp-checkbox
                style="margin-block-start: calc(var(--spectrum-checkbox-top-to-control-small) * -1);"
                @click=${handleActionBarChange}
                checked
            >
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet slot="buttons">
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>
            <label for="last-input">
                Random after content that is focusable
            </label>
        </h2>
        <input id="last-input" />
    `;
};
Default.swc_vrt = {
  skip: true
};
Default.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
export const sized = ({ gap, padding } = { gap: 10, padding: 10 }) => {
  const items = generateItems(1e3);
  function handleMediaChange() {
    let width = document.body.offsetWidth * 0.4;
    const height = 300;
    if (matchMedium.matches) {
      width = 300;
    } else if (matchLarge.matches) {
      width = 400;
    }
    document.querySelector("sp-grid").itemSize = {
      width,
      height
    };
  }
  const matchSmall = window.matchMedia("(max-width: 600px)");
  const matchMedium = window.matchMedia(
    "(min-width: 601px) and (max-width: 1200px)"
  );
  const matchLarge = window.matchMedia("(min-width: 1201px)");
  matchSmall.addEventListener("change", handleMediaChange);
  matchMedium.addEventListener("change", handleMediaChange);
  matchLarge.addEventListener("change", handleMediaChange);
  return html`
        <h1>Random before content that is focusable</h1>
        <input id="first-input" />
        <sp-grid
            @change=${handleChange}
            .items=${items}
            .focusableSelector=${"sp-card"}
            .renderItem=${renderItem}
            .itemSize=${{
    width: 200,
    height: 300
  }}
            .gap=${`${gap}px`}
            .padding=${`${padding}px`}
        ></sp-grid>
        <sp-action-bar variant="fixed" style="display: none">
            <sp-checkbox @click=${handleActionBarChange} checked>
                <span class="selected"></span>
                Selected
                <span class="ids"></span>
            </sp-checkbox>
            <sp-action-group quiet>
                <sp-action-button>
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-more slot="icon" label="More"></sp-icon-more>
                </sp-action-button>
            </sp-action-group>
        </sp-action-bar>
        <h2>Random after content that is focusable</h2>
        <input id="last-input" />
    `;
};
sized.args = {
  gap: 10,
  padding: 10
};
sized.argTypes = {
  gap: {
    name: "gap",
    type: { name: "number", required: false },
    description: "Spacing between items.",
    table: {
      type: { summary: "number" }
    },
    control: {
      type: "number"
    }
  },
  padding: {
    name: "padding",
    type: { name: "number", required: false },
    description: "Spacing around all items.",
    table: {
      type: { summary: "number" }
    },
    control: {
      type: "number"
    }
  }
};
sized.swc_vrt = {
  skip: true
};
sized.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
class MyParent extends SpectrumElement {
  render() {
    return html`
            <div class="child"><slot></slot></div>
        `;
  }
}
MyParent.styles = [
  css`
            :host {
                display: block;
                height: 100vh;
                overflow: hidden;
            }

            .child {
                height: 100%;
                overflow: scroll;
            }
        `
];
customElements.define("my-parent", MyParent);
export const scrollParentInAssignedSlot = () => {
  const items = generateItems(1e3);
  return html`
        <my-parent>
            <sp-grid
                .items=${items}
                .focusableSelector=${"sp-card"}
                .renderItem=${renderItem}
            ></sp-grid>
        </my-parent>
    `;
};
scrollParentInAssignedSlot.swc_vrt = {
  skip: true
};
scrollParentInAssignedSlot.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
//# sourceMappingURL=grid.stories.js.map
