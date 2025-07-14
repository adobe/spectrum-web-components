import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { LitVirtualizer } from '@lit-labs/virtualizer/LitVirtualizer.js';
import { GridController } from './GridController.js';
/**
 * @element sp-grid
 *
 * @fires change - Announces that the value of `selected` has changed
 */
export declare class Grid extends LitVirtualizer {
    static get styles(): CSSResultArray;
    private __gridPart;
    focusableSelector: string;
    gap: `${'0' | `${number}px`}`;
    padding: `${'0' | `${number}px`}` | undefined;
    items: Record<string, unknown>[];
    itemSize: {
        width: number;
        height: number;
    };
    selected: Record<string, unknown>[];
    gridController: GridController<HTMLElement>;
    protected handleChange(event: Event): void;
    createRenderRoot(): this;
    render(): TemplateResult<1>;
    protected update(changes: PropertyValues<this>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
