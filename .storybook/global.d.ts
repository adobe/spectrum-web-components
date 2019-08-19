declare module '@storybook/polymer' {
    export function addDecorator(decorator: StoryDecorator): void;
    export function addParameters(parameters: DecoratorParameters): void;
    export function clearDecorators(): void;
    export function configure(fn: () => void, module: NodeModule): void;
    export function setAddon(addon: object): void;
    export function storiesOf(name: string, module: NodeModule): Story;
    export function storiesOf<T>(name: string, module: NodeModule): Story & T;
    export function forceReRender(): void;
}
