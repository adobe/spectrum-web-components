import type { ReactiveElement } from 'lit';
export declare const dependencyManagerLoadedSymbol: unique symbol;
/**
 * Manage the availability of custom element dependencies of a host element
 * to gate render and functional behavior before and after their presence
 */
export declare class DependencyManagerController {
    private dependencies;
    private host;
    /**
     * Whether all of the provided dependencies have been registered.
     * This will be `false` when no dependencies have been listed for management.
     * Changes to this value will trigger `requestUpdate()` on the host.
     */
    get loaded(): boolean;
    private set loaded(value);
    private _loaded;
    constructor(host: ReactiveElement);
    /**
     * Submit a custom element tag name to be managed as a dependency.
     *
     * @param dependency {string} - the custom element tag to manage
     * @param alreadyLoaded {boolean} - force the managemented custom element to be listed as loaded
     */
    add(dependency: string, alreadyLoaded?: boolean): void;
}
