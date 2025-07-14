export interface SWCResizeObserverEntry {
    contentRect: DOMRectReadOnly;
}
export interface SWCResizeObserver {
    new (callback: SWCResizeObserverCallback): SWCResizeObserver;
    disconnect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
}
export interface WithSWCResizeObserver {
    ResizeObserver: SWCResizeObserver;
}
export type SWCResizeObserverCallback = (entries: SWCResizeObserverEntry[], observer: SWCResizeObserver) => void;
