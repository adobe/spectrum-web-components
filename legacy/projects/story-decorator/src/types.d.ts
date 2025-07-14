import { Color, Scale, SystemVariant } from '@spectrum-web-components/theme';
import { Locale } from './locales.js';
declare global {
    interface Window {
        __swc_hack_knobs__: {
            defaultSystemVariant: SystemVariant;
            defaultColor: Color;
            defaultScale: Scale;
            defaultDirection: 'ltr' | 'rtl';
            defaultReduceMotion: boolean;
            hcm: boolean;
            defaultLocale: Locale;
        };
    }
}
