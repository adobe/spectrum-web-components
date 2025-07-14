import { Dropzone } from './src/Dropzone.js';
declare global {
    interface HTMLElementTagNameMap {
        'sp-dropzone': Dropzone;
    }
}
