/**
 * A timer to help with implementation of warnup/cooldown behavior as described here:
 * https://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance
 */
export declare class OverlayTimer {
    private warmUpDelay;
    private coolDownDelay;
    private isWarm;
    private cooldownTimeout?;
    private component?;
    private timeout;
    private promise?;
    private resolve?;
    constructor(options?: {
        warmUpDelay?: number;
        coolDownDelay?: number;
    });
    openTimer(component: HTMLElement): Promise<boolean>;
    close(component: HTMLElement): void;
    private resetCooldownTimer;
    private cancelCooldownTimer;
}
