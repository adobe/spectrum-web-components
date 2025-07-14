export type DescribedNode = {
    name: string;
    description: string;
};
export declare const findDescribedNode: (name: string, description: string, debug?: boolean) => Promise<void>;
