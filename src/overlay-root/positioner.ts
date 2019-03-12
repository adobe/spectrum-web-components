import { getCss, ownerDocument, query } from 'dom-helpers';
import getOffset from 'dom-helpers/query/offset';
import getPosition from 'dom-helpers/query/position';
import getScrollLeft from 'dom-helpers/query/scrollLeft';
import getScrollTop from 'dom-helpers/query/scrollTop';

import calculatePosition from './calculate-position';

const defaultOptions: IOptions = {
    containerPadding: 10,
    crossOffset: 0,
    flip: true,
    offset: 0,
    placement: 'left',
};

interface IOptions {
    containerPadding: number;
    crossOffset: number;
    flip: boolean;
    offset: number;
    placement: string;
}

export default class Positioner {
    constructor(target: Node, relativeElement: Node, container: Node) {
        this.target = target;
        this.relativeElement = relativeElement;
        this.container = container;
    }

    public calculatePosition(options: IOptions) {
        const positionOptions = { ...defaultOptions, ...options };
        return calculatePosition(
            positionOptions.placement,
            this.relativeElement,
            this.target,
            this.container,
            positionOptions.containerPadding,
            positionOptions.flip,
            () => this.boundariesElement,
            positionOptions.offset,
            positionOptions.crossOffset
        );
    }

    public updatePosition(options: IOptions) {
        if (this.relativeElement == null) {
            return;
        }
        const position = this.calculatePosition(options);
        return position;
    }

    public get boundariesElement() {
        if (this.target != null) {
            return ownerDocument(this.target).body;
        }
        return document.body;
    }
}
