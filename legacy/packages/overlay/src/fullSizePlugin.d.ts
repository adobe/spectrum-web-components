import { MiddlewareArguments, MiddlewareReturn } from '@floating-ui/dom';
export declare const fullSize: (options?: {
    padding: number;
}) => {
    name: string;
    fn(middlewareArguments: MiddlewareArguments): Promise<MiddlewareReturn & {
        data: {
            availableWidth: number;
            availableHeight: number;
        };
    }>;
};
