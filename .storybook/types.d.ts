import { TemplateResult } from '@future-ui/base';

export interface Story<T> {
    (args?: T): TemplateResult;
    args: Partial<T>;
}
