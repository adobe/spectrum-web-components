import { LitElement } from 'lit-element';

export class RouteComponent extends LitElement {
    location?: {
        baseUrl: string;
        params?: object;
        pathname: string;
    };
}
