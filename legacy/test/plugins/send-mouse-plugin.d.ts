import type { Page } from 'playwright';
export type Step = {
    type: 'move' | 'down' | 'up' | 'click' | 'wheel';
    position?: [number, number];
    options?: {
        button?: 'left' | 'right' | 'middle';
        delay?: number;
    };
};
export declare function sendMousePlugin(): {
    name: string;
    executeCommand({ command, session, payload, }: {
        payload: {
            steps: Step[];
        };
        command: string;
        session: {
            id: string;
            browser: {
                type: string;
                getPage: (id: string) => Page;
            };
        };
    }): Promise<any>;
};
