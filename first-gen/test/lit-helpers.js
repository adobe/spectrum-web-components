"use strict";
import { nothing } from "lit/html.js";
import { AsyncDirective, directive } from "lit/async-directive.js";
class SpreadDirective extends AsyncDirective {
  constructor() {
    super(...arguments);
    this.prevData = {};
  }
  render(_spreadData) {
    return nothing;
  }
  update(part, [spreadData]) {
    var _a;
    if (this.element !== part.element) {
      this.element = part.element;
    }
    this.host = ((_a = part.options) == null ? void 0 : _a.host) || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }
  apply(data) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      const name = key.slice(1);
      switch (key[0]) {
        case "@":
          const prevHandler = prevData[key];
          if (prevHandler) {
            element.removeEventListener(
              name,
              this,
              value
            );
          }
          element.addEventListener(
            name,
            this,
            value
          );
          break;
        case ".":
          element[name] = value;
          break;
        case "?":
          if (value) {
            element.setAttribute(name, "");
          } else {
            element.removeAttribute(name);
          }
          break;
        default:
          if (value != null) {
            element.setAttribute(key, String(value));
          } else {
            element.removeAttribute(key);
          }
          break;
      }
    }
  }
  groom(data) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        switch (key[0]) {
          case "@":
            const value = prevData[key];
            element.removeEventListener(
              key.slice(1),
              this,
              value
            );
            break;
          case ".":
            element[key.slice(1)] = void 0;
            break;
          case "?":
            element.removeAttribute(key.slice(1));
            break;
          default:
            element.removeAttribute(key);
            break;
        }
      }
    }
  }
  handleEvent(event) {
    const value = this.prevData[`@${event.type}`];
    if (typeof value === "function") {
      value.call(this.host, event);
    } else {
      value.handleEvent(event);
    }
  }
  disconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== "@") continue;
      const value = prevData[key];
      element.removeEventListener(
        key.slice(1),
        this,
        value
      );
    }
  }
  reconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== "@") continue;
      const value = prevData[key];
      element.addEventListener(
        key.slice(1),
        this,
        value
      );
    }
  }
}
export const spread = directive(SpreadDirective);
class SpreadPropsDirective extends AsyncDirective {
  constructor() {
    super(...arguments);
    this.prevData = {};
  }
  render(_spreadData) {
    return nothing;
  }
  update(part, [spreadData]) {
    var _a;
    if (this.element !== part.element) {
      this.element = part.element;
    }
    this.host = ((_a = part.options) == null ? void 0 : _a.host) || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }
  apply(data) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      element[key] = value;
    }
  }
  groom(data) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        element[key] = void 0;
      }
    }
  }
}
export const spreadProps = directive(SpreadPropsDirective);
//# sourceMappingURL=lit-helpers.js.map
