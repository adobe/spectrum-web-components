import { Tray } from './src/Tray.js';
declare global {
    interface HTMLElementTagNameMap {
        'sp-tray': Tray;
    }
}
