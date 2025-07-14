import { Toast } from './src/Toast.js';
declare global {
    interface HTMLElementTagNameMap {
        'sp-toast': Toast;
    }
}
