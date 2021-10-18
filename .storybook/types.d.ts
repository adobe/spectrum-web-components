import { TemplateResult } from '@lliad-ui/base';

export interface Story<T> {
    (args?: T): TemplateResult;
    args: Partial<T>;
}
