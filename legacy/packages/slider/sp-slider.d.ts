import './sp-slider-handle.js';
import { Slider } from './src/Slider.js';
declare global {
    interface HTMLElementTagNameMap {
        'sp-slider': Slider;
    }
}
