import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
import { Popover } from '@spectrum-web-components/popover';
import type { Placement } from '@spectrum-web-components/overlay';
import type { CoachmarkItem } from './CoachmarkItem.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
/**
 * @element sp-coachmark
 * @fires primary - Announces that the "primary" button has been clicked.
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @slot cover-photo - This is the cover photo for Default and Quiet Coachmark
 * @slot heading - HTML content to be listed as the heading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot step-count - Override the default pagination delivery with your own internationalized content
 */
export declare class Coachmark extends Popover {
    static get styles(): CSSResultArray;
    item?: CoachmarkItem;
    placement: Placement;
    private content?;
    private shortcutKey?;
    modifierKeys?: string[];
    private source?;
    private mediaType?;
    hasAsset: boolean;
    asset?: 'file' | 'folder';
    currentStep?: number;
    totalSteps?: number;
    primaryCTA?: string;
    secondaryCTA?: string;
    private renderMedia;
    private renderModifier;
    private renderJoiner;
    private renderHeader;
    private renderContent;
    private handlePrimaryCTA;
    private handleSecondaryCTA;
    private renderSecondaryButton;
    private renderPrimaryButton;
    private renderSecondaryButtonMobile;
    private renderPrimaryButtonMobile;
    protected renderButtons(): TemplateResult;
    protected renderSteps: () => TemplateResult;
    protected renderActionMenu: () => TemplateResult;
    protected render(): TemplateResult;
}
