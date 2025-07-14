import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-split-view
 *
 * @slot Two sibling elements to be sized by the element attritubes
 * @fires change - Announces the new position of the splitter
 */
export declare class SplitView extends SpectrumElement {
    static get styles(): CSSResultArray;
    controlledEl?: HTMLElement;
    vertical: boolean;
    resizable: boolean;
    collapsible: boolean;
    /** The minimum size of the primary pane */
    primaryMin: number;
    /** The maximum size of the primary pane */
    primaryMax: number;
    /**
     * The start size of the primary pane, can be a real pixel number|string, percentage or "auto"
     * For example: "100", "120px", "75%" or "auto" are valid values
     * @type {number | number + "px" | number + "%" | "auto"}
     * @attr
     */
    primarySize?: string;
    /** The minimum size of the secondary pane */
    secondaryMin: number;
    /** The maximum size of the secondary pane */
    secondaryMax: number;
    /** The current splitter position of split-view */
    splitterPos?: number;
    /** The current size of first pane of split-view */
    private firstPaneSize;
    label?: string;
    private enoughChildren;
    private viewSize;
    private paneSlot;
    private splitter;
    private offset;
    private minPos;
    private maxPos;
    private observer?;
    private rect?;
    private _splitterSize?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @private
     **/
    get splitterSize(): number;
    protected render(): TemplateResult;
    private controlledElIDApplied;
    private onContentSlotChange;
    private onPointerdown;
    private onPointermove;
    private onPointerup;
    private getOffset;
    private getPosition;
    private movePosition;
    private onKeydown;
    private checkResize;
    private updateMinMax;
    private updatePosition;
    private getLimitedPosition;
    private calcStartPos;
    private dispatchChangeEvent;
    protected willUpdate(changed: PropertyValues): void;
}
