import { TemplateResult } from '@spectrum-web-components/base';

export interface Story<T> {
    (args?: T): TemplateResult;
    args: Partial<T>;
}
