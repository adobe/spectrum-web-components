import './components/layout.js';
declare global {
    interface Window {
        spAlert(el: HTMLElement, message: string): void;
    }
}
