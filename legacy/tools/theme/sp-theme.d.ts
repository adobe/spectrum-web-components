import { Theme } from './src/Theme.js';
declare global {
    interface HTMLElementTagNameMap {
        'sp-theme': Theme;
    }
}
