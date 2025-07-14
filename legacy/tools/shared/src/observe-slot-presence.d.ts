import { ReactiveElement } from '@spectrum-web-components/base';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface SlotPresenceObservingInterface {
    slotContentIsPresent: boolean;
    getSlotContentPresence(selector: string): boolean;
    managePresenceObservedSlot(): void;
}
export declare function ObserveSlotPresence<T extends Constructor<ReactiveElement>>(constructor: T, lightDomSelector: string | string[]): T & Constructor<SlotPresenceObservingInterface>;
export {};
