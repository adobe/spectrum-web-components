import { IconsLarge } from './icons-large';
import { IconsMedium } from './icons-medium';
export * from './icons-large';
export * from './icons-medium';
declare global {
    interface HTMLElementTagNameMap {
        'sp-icons-large': IconsLarge;
        'sp-icons-medium': IconsMedium;
    }
}
