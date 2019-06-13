import { LitElement } from 'lit-element';

export default class RouteComponent extends LitElement {
    location?: {
        baseUrl: string;
        params?: object;
        pathname: string;
    };
}
