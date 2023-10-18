import { A } from './lit-html-126adc72.js';
import { c as c$1 } from './async-directive-e6357bae.js';
import { e } from './directive-2bb7789e.js';

class SpreadPropsDirective extends c$1 {
  constructor() {
    super(...arguments);
    this.prevData = {};
  }
  render(_spreadData) {
    return A;
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
    if (!data)
      return;
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
    if (!prevData)
      return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        element[key] = void 0;
      }
    }
  }
}
const spreadProps = e(SpreadPropsDirective);

export { spreadProps as s };
