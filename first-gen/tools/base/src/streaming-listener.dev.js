"use strict";
import { nothing } from "lit";
import { AsyncDirective, directive } from "lit/async-directive.js";
const defaultListener = [
  "",
  () => {
    return;
  }
];
class StreamingListenerDirective extends AsyncDirective {
  constructor() {
    super(...arguments);
    this.start = defaultListener;
    this.streamInside = defaultListener;
    this.end = defaultListener;
    this.streamOutside = defaultListener;
    this.state = "off";
    this.handleStart = (event) => {
      this.clearStream();
      this.callHandler(this.start[1], event);
      if (event.defaultPrevented) {
        return;
      }
      this.removeListeners();
      this.addListeners("on");
    };
    this.handleInside = (event) => {
      this.handleStream(this.streamInside[1], event);
    };
    this.handleEnd = (event) => {
      this.clearStream();
      this.callHandler(this.end[1], event);
      this.removeListeners();
      this.addListeners("off");
    };
    /* c8 ignore next 3 */
    this.handleOutside = (event) => {
      this.handleStream(this.streamOutside[1], event);
    };
  }
  /* c8 ignore next 4 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_configGroup) {
    return nothing;
  }
  update(part, [
    {
      start,
      end,
      streamInside = defaultListener,
      streamOutside = defaultListener
    }
  ]) {
    var _a;
    if (this.element !== part.element) {
      this.element = part.element;
      this.removeListeners();
    }
    this.host = ((_a = part.options) == null ? void 0 : _a.host) || this.element;
    this.start = start;
    this.end = end;
    this.streamInside = streamInside;
    this.streamOutside = streamOutside;
    this.addListeners();
  }
  addListeners(state) {
    this.state = state || this.state;
    if (this.state === "off") {
      this.addListener(this.streamOutside[0], this.handleOutside);
      this.addListener(this.start[0], this.handleStart);
    } else if (this.state === "on") {
      this.addListener(this.streamInside[0], this.handleInside);
      this.addListener(this.end[0], this.handleEnd);
    }
  }
  callHandler(value, event) {
    if (typeof value === "function") {
      value.call(this.host, event);
    } else {
      value.handleEvent(event);
    }
  }
  handleStream(value, event) {
    if (this.stream) {
      return;
    }
    this.callHandler(value, event);
    this.stream = requestAnimationFrame(() => {
      this.stream = void 0;
    });
  }
  clearStream() {
    if (this.stream != null) {
      cancelAnimationFrame(this.stream);
      this.stream = void 0;
    }
  }
  addListener(type, fn) {
    if (Array.isArray(type)) {
      type.map((eventName) => {
        this.element.addEventListener(eventName, fn);
      });
    } else {
      this.element.addEventListener(type, fn);
    }
  }
  removeListener(type, fn) {
    if (Array.isArray(type)) {
      type.map((eventName) => {
        this.element.removeEventListener(eventName, fn);
      });
    } else {
      this.element.removeEventListener(type, fn);
    }
  }
  removeListeners() {
    this.removeListener(this.start[0], this.handleStart);
    this.removeListener(this.streamInside[0], this.handleInside);
    this.removeListener(this.end[0], this.handleEnd);
    this.removeListener(this.streamOutside[0], this.handleOutside);
  }
  disconnected() {
    this.removeListeners();
  }
  /* c8 ignore next 3 */
  reconnected() {
    this.addListeners();
  }
}
export const streamingListener = directive(
  StreamingListenerDirective
);
//# sourceMappingURL=streaming-listener.dev.js.map
