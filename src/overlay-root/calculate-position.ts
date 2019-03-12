// Borrowed from react-spectrum project

import { ownerDocument } from 'dom-helpers';
import getOffset from 'dom-helpers/query/offset';
import getPosition from 'dom-helpers/query/position';
import getScrollLeft from 'dom-helpers/query/scrollLeft';
import getScrollTop from 'dom-helpers/query/scrollTop';
import getCss from 'dom-helpers/style';

import getContains from 'dom-helpers/query/contains';

const AXIS = {
    bottom: 'top',
    left: 'left',
    right: 'left',
    top: 'top',
};

const FLIPPED_DIRECTION = {
    bottom: 'top',
    left: 'left',
    right: 'left',
    top: 'top',
};

const CROSS_AXIS = {
    left: 'top',
    top: 'left',
};

const AXIS_SIZE = {
    left: 'width',
    top: 'height',
};

interface IScroll {
    top?: number;
    left?: number;
}

interface IContainerDimensions {
    width: number;
    height: number;
    scroll: IScroll;
    top: number;
    left: number;
}

interface IOffset {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
}

interface IPlacementInfo {
    axis: string;
    crossAxis: string;
    crossPlacement: string;
    crossSize: number;
    size: number;
    placement: string;
}

interface IMargins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

const PARSED_PLACEMENT_CACHE = {};

function getContainerDimensions(containerDOMNode: Node) {
    let width;
    let height;
    let top = 0;
    let left = 0;
    const scroll: IScroll = {};

    if (containerDOMNode.tagName === 'BODY') {
        width = window.innerWidth;
        height = window.innerHeight;

        scroll.top =
            getScrollTop(ownerDocument(containerDOMNode).documentElement) ||
            getScrollTop(containerDOMNode);
        scroll.left =
            getScrollLeft(ownerDocument(containerDOMNode).documentElement) ||
            getScrollLeft(containerDOMNode);
    } else {
        ({ width, height, top, left } = getOffset(containerDOMNode));
        scroll.top = getScrollTop(containerDOMNode);
        scroll.left = getScrollLeft(containerDOMNode);
    }

    return { width, height, scroll, top, left };
}

function getDelta(
    axis: string,
    offset: number,
    size: number,
    containerDimensions: IContainerDimensions,
    padding: number
) {
    const containerScroll = containerDimensions.scroll[axis];
    const containerHeight = containerDimensions[AXIS_SIZE[axis]];

    const startEdgeOffset = offset - padding - containerScroll;
    const endEdgeOffset = offset + padding - containerScroll + size;

    if (startEdgeOffset < 0) {
        return -startEdgeOffset;
    } else if (endEdgeOffset > containerHeight) {
        return Math.max(containerHeight - endEdgeOffset, -startEdgeOffset);
    } else {
        return 0;
    }
}

function shouldFlip(
    axis: string,
    offset: number,
    size: number,
    padding: number,
    placement: string,
    flipContainerDimensions: IContainerDimensions,
    containerOffsetWithBoundary: number
) {
    const containerScroll = flipContainerDimensions.scroll[axis];
    const containerHeight = flipContainerDimensions[AXIS_SIZE[axis]];

    const startEdgeOffset =
        containerOffsetWithBoundary[axis] + offset - padding - containerScroll;
    const endEdgeOffset =
        containerOffsetWithBoundary[axis] +
        offset +
        padding -
        containerScroll +
        size;

    if (startEdgeOffset < 0 && (placement === 'top' || placement === 'left')) {
        return true;
    } else if (
        endEdgeOffset > containerHeight &&
        (placement === 'bottom' || placement === 'right')
    ) {
        return true;
    } else {
        return false;
    }
}

function getMargins(node: Node): IMargins {
    const style = window.getComputedStyle(node);
    return {
        bottom: parseInt(style.marginBottom, 10) || 0,
        left: parseInt(style.marginLeft, 10) || 0,
        right: parseInt(style.marginRight, 10) || 0,
        top: parseInt(style.marginTop, 10) || 0,
    };
}

function parsePlacement(input) {
    if (PARSED_PLACEMENT_CACHE[input]) {
        return PARSED_PLACEMENT_CACHE[input];
    }
    const [placement] = input.split(' ');
    let [, crossPlacement] = input.split(' ');
    const axis = AXIS[placement] || 'right';
    const crossAxis = CROSS_AXIS[axis];

    if (!AXIS[crossPlacement]) {
        crossPlacement = 'center';
    }

    const size = AXIS_SIZE[axis];
    const crossSize = AXIS_SIZE[crossAxis];
    PARSED_PLACEMENT_CACHE[input] = {
        axis,
        crossAxis,
        crossPlacement,
        crossSize,
        placement,
        size,
    };
    return PARSED_PLACEMENT_CACHE[input];
}

function computePosition(
    childOffset: IOffset,
    containerDimensions: IContainerDimensions,
    overlaySize: IOffset,
    placementInfo: IPlacementInfo,
    offset: number,
    crossOffset: number
) {
    const {
        axis,
        crossAxis,
        crossPlacement,
        crossSize,
        size,
        placement,
    } = placementInfo;
    const position = {};

    position[crossAxis] = childOffset[crossAxis] + crossOffset;
    if (crossPlacement === 'center') {
        position[crossAxis] +=
            (childOffset[crossSize] - overlaySize[crossSize]) / 2;
    } else if (crossPlacement !== crossAxis) {
        position[crossAxis] += childOffset[crossSize] - overlaySize[crossSize];
    }

    // Ensure overlay sticks to target(ignore for overlays smaller than target)
    if (childOffset[crossSize] < overlaySize[crossSize]) {
        const positionForPositiveSideOverflow = Math.min(
            position[crossAxis],
            childOffset[crossAxis]
        );
        position[crossAxis] = Math.max(
            positionForPositiveSideOverflow,
            childOffset[crossAxis] -
                overlaySize[crossSize] +
                childOffset[crossSize]
        );
    }

    position[axis] =
        placement === axis
            ? (position[axis] = childOffset[axis] - overlaySize[size] + offset)
            : (position[axis] = childOffset[axis] + childOffset[size] + offset);

    return position;
}

export function calculatePositionInternal(
    placementInput: string,
    containerDimensions: IContainerDimensions,
    childOffset: IOffset,
    overlaySize: number,
    margins: IMargins,
    padding: number,
    flip: boolean,
    boundaryDimensions: IContainerDimensions,
    containerOffsetWithBoundary: IOffset,
    offset: number,
    crossOffset: number
) {
    let placementInfo = parsePlacement(placementInput);
    const {
        axis,
        size,
        crossAxis,
        crossSize,
        placement,
        crossPlacement,
    } = placementInfo;
    let position = computePosition(
        childOffset,
        containerDimensions,
        overlaySize,
        placementInfo,
        offset,
        crossOffset
    );
    let normalizedOffset = offset;

    // First check if placement should be flipped
    if (
        flip &&
        shouldFlip(
            axis,
            position[axis],
            overlaySize[size],
            padding,
            placement,
            boundaryDimensions,
            containerOffsetWithBoundary
        )
    ) {
        const flippedPlacementInfo = parsePlacement(
            `${FLIPPED_DIRECTION[placement]} ${crossPlacement}`
        );
        const { flippedAxis, flippedSize } = flippedPlacementInfo;
        const flippedPosition = computePosition(
            childOffset,
            containerDimensions,
            overlaySize,
            flippedPlacementInfo,
            -1 * offset,
            crossOffset
        );

        // Check if flipped placement has enough space otherwise flip is not possible
        if (
            !shouldFlip(
                flippedAxis,
                flippedPosition[flippedAxis],
                overlaySize[flippedSize],
                padding,
                FLIPPED_DIRECTION[placement],
                boundaryDimensions,
                containerOffsetWithBoundary
            )
        ) {
            placementInfo = flippedPlacementInfo;
            position = flippedPosition;
            normalizedOffset = -1 * offset;
        }
    }

    let delta = getDelta(
        crossAxis,
        position[crossAxis],
        overlaySize[crossSize],
        boundaryDimensions,
        padding
    );
    position[crossAxis] += delta;

    const maxHeight = Math.max(
        0,
        boundaryDimensions.height +
            boundaryDimensions.top +
            boundaryDimensions.scroll.top -
            containerOffsetWithBoundary.top -
            position.top -
            margins.top -
            margins.bottom -
            padding
    );
    overlaySize.height = Math.min(overlaySize.height, maxHeight);

    position = computePosition(
        childOffset,
        containerDimensions,
        overlaySize,
        placementInfo,
        normalizedOffset,
        crossOffset
    );
    delta = delta = getDelta(
        crossAxis,
        position[crossAxis],
        overlaySize[crossSize],
        boundaryDimensions,
        padding
    );

    position[crossAxis] += delta;

    const arrowPosition = {};
    arrowPosition[crossAxis] =
        childOffset[crossSize] > overlaySize[crossSize]
            ? null
            : childOffset[crossAxis] -
              position[crossAxis] +
              childOffset[crossSize] / 2;

    return {
        arrowOffsetLeft: arrowPosition.left,
        arrowOffsetTop: arrowPosition.top,
        maxHeight,
        placement: placementInfo.placement,
        positionLeft: position.left,
        positionTop: position.top,
    };
}

function getShadowPosition(target: HTMLElement, container: HTMLElement) {
    const targetPosition = target.getBoundingClientRect();
    const containerPosition = container.getBoundingClientRect();
    return {
        bottom: targetPosition.bottom - containerPosition.bottom,
        height: targetPosition.height,
        left: targetPosition.left - containerPosition.left,
        right: targetPosition.right - containerPosition.right,
        top: targetPosition.top - containerPosition.top,
        width: targetPosition.width,
        x: targetPosition.x,
        y: targetPosition.y,
    };
}

export default function calculatePosition(
    placementInput: string,
    overlayNode: Node,
    target: Node,
    container: Node,
    padding: number,
    flip: boolean,
    boundariesElement: HTMLElement,
    offset: number,
    crossOffset: number
) {
    const isBodyContainer = container.tagName === 'BODY';
    const childOffset = isBodyContainer
        ? target.getBoundingClientRect().toJSON()
        : getShadowPosition(target, container);

    if (!isBodyContainer) {
        childOffset.top += parseInt(getCss(target, 'marginTop'), 10) || 0;
        childOffset.left += parseInt(getCss(target, 'marginLeft'), 10) || 0;
    }

    const overlaySize = overlayNode.getBoundingClientRect().toJSON(); // getOffset(overlayNode);
    const margins = getMargins(overlayNode);
    overlaySize.width += margins.left + margins.right;
    overlaySize.height += margins.top + margins.bottom;

    const containerDimensions = getContainerDimensions(container);
    const boundaryContainer =
        boundariesElement === 'container' ? container : boundariesElement();
    const boundaryDimensions = getContainerDimensions(boundaryContainer);
    const containerOffsetWithBoundary =
        boundaryContainer.tagName === 'BODY'
            ? getOffset(container)
            : getPosition(container, boundaryContainer);
    return calculatePositionInternal(
        placementInput,
        containerDimensions,
        childOffset,
        overlaySize,
        margins,
        padding,
        flip,
        boundaryDimensions,
        containerOffsetWithBoundary,
        offset,
        crossOffset
    );
}
