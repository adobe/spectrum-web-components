declare module '@popperjs/core/lib/popper-lite' {
    export * from '@popperjs/core/dist/typescript/popper-lite';
    export * from '@popperjs/core/dist/typescript/types';
    export * from '@popperjs/core/dist/typescript/enums';
    export var defaultModifiers: Modifier[];
}

declare module '@popperjs/core/lib/modifiers/flip' {
    export * from '@popperjs/core/dist/typescript/modifiers/flip.d.ts';
}

declare module '@popperjs/core/lib/modifiers/preventOverflow' {
    export * from '@popperjs/core/dist/typescript/modifiers/preventOverflow.d.ts';
}
