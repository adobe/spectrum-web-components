import { T } from './lit-html-COgVUehj.js';
import { f } from './async-directive-DF6rMZJ5.js';
import { e } from './directive-Bn5c4u4M.js';

class SpreadPropsDirective extends f {
  constructor() {
    super(...arguments);
    this.prevData = {};
  }
  render(_spreadData) {
    return T;
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
const spreadProps = e(SpreadPropsDirective);

export { spreadProps as s };
