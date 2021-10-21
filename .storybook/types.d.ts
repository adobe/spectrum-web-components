import { TemplateResult } from '@iliad-ui/base';

export interface Story<T> {
    (args?: T): TemplateResult;
    args: Partial<T>;
}
