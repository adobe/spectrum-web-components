"use strict";
export const dependencyManagerLoadedSymbol = Symbol(
  "dependency manager loaded"
);
export class DependencyManagerController {
  constructor(host) {
    this.dependencies = {};
    this._loaded = false;
    this.host = host;
  }
  /**
   * Whether all of the provided dependencies have been registered.
   * This will be `false` when no dependencies have been listed for management.
   * Changes to this value will trigger `requestUpdate()` on the host.
   */
  get loaded() {
    return this._loaded;
  }
  set loaded(loaded) {
    if (loaded === this.loaded) return;
    this._loaded = loaded;
    this.host.requestUpdate(dependencyManagerLoadedSymbol, !this.loaded);
  }
  /**
   * Submit a custom element tag name to be managed as a dependency.
   *
   * @param dependency {string} - the custom element tag to manage
   * @param alreadyLoaded {boolean} - force the managemented custom element to be listed as loaded
   */
  add(dependency, alreadyLoaded) {
    const loaded = !!alreadyLoaded || !!customElements.get(dependency) || this.dependencies[dependency];
    if (!loaded) {
      customElements.whenDefined(dependency).then(() => {
        this.add(dependency, true);
      });
    }
    this.dependencies = {
      ...this.dependencies,
      [dependency]: loaded
    };
    this.loaded = Object.values(this.dependencies).every(
      (loaded2) => loaded2
    );
  }
}
//# sourceMappingURL=DependencyManger.dev.js.map
