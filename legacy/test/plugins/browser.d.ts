import type { Step } from './send-mouse-plugin.js';
/**
 * Call to the browser with instructions for interacting with the pointing
 * device while queueing cleanup of those commands after the test is run.
 */
export declare function sendMouse(options: {
    steps: Step[];
}): Promise<unknown>;
/**
 * Call to the browser with instructions for interacting with the pointing
 * device while queueing cleanup of those commands after the test is run.
 */
export declare function grantPermissions(options: string[]): Promise<unknown>;
