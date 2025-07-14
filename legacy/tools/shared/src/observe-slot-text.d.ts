import { ReactiveElement } from '@spectrum-web-components/base';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface SlotTextObservingInterface {
    slotHasContent: boolean;
    manageTextObservedSlot(): void;
}
export declare function ObserveSlotText<T extends Constructor<ReactiveElement>>(constructor: T, slotName?: string, excludedSelectors?: string[]): T & Constructor<SlotTextObservingInterface>;
export {};
