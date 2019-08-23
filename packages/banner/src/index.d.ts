export * from './banner';
import { Banner } from './banner';
declare global {
    interface HTMLElementTagNameMap {
        'sp-banner': Banner;
    }
}
