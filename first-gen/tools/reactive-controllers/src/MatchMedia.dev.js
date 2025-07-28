"use strict";
export const DARK_MODE = "(prefers-color-scheme: dark)";
export const IS_MOBILE = "(max-width: 743px) and (hover: none) and (pointer: coarse)";
export class MatchMediaController {
  constructor(host, query) {
    this.key = Symbol("match-media-key");
    this.matches = false;
    this.host = host;
    this.host.addController(this);
    this.media = window.matchMedia(query);
    this.matches = this.media.matches;
    this.onChange = this.onChange.bind(this);
    host.addController(this);
  }
  hostConnected() {
    var _a;
    (_a = this.media) == null ? void 0 : _a.addEventListener("change", this.onChange);
  }
  hostDisconnected() {
    var _a;
    (_a = this.media) == null ? void 0 : _a.removeEventListener("change", this.onChange);
  }
  onChange(event) {
    if (this.matches === event.matches) return;
    this.matches = event.matches;
    this.host.requestUpdate(this.key, !this.matches);
  }
}
//# sourceMappingURL=MatchMedia.dev.js.map
