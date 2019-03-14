/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// Borrowed from react-spectrum project

interface Scroll {
    top: number;
    left: number;
    [index: string]: number;
}

interface ContainerDimensions {
    width: number;
    height: number;
    scroll: Scroll;
    top: number;
    left: number;
    [index: string]: number | Scroll;
}

interface Offset {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
    [index: string]: number;
}

interface PlacementInfo {
    axis: string;
    crossAxis: string;
    crossPlacement: string;
    crossSize: string;
    size: string;
    placement: string;
}

interface Margins {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface Position {
    top: number;
    bottom: number;
    left: number;
    right: number;
    [index: string]: number;
}

interface PossiblePosition {
    top: number | null;
    bottom: number | null;
    left: number | null;
    right: number | null;
    [index: string]: number | null;
}

interface ParsedPlacementCache {
    [propName: string]: PlacementInfo;
}

interface DirectionMap {
    left: string;
    top: string;
    right: string;
    bottom: string;
    [index: string]: string;
}

interface OrientationMap {
    top: string;
    left: string;
    [index: string]: string;
}

export interface PositionResult {
    arrowOffsetLeft: number;
    arrowOffsetTop: number;
    maxHeight: number;
    placement: string;
    positionLeft: number;
    positionTop: number;
}

const AXIS: DirectionMap = {
    bottom: 'top',
    left: 'left',
    right: 'left',
    top: 'top',
};

const FLIPPED_DIRECTION: DirectionMap = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
};

const CROSS_AXIS: OrientationMap = {
    left: 'top',
    top: 'left',
};

const AXIS_SIZE: OrientationMap = {
    left: 'width',
    top: 'height',
};

const PARSED_PLACEMENT_CACHE: ParsedPlacementCache = {};

function getContainerDimensions(
    containerDOMNode: Element
): ContainerDimensions {
    let width;
    let height;
    let top = 0;
    let left = 0;
    const scroll: Scroll = { top: 0, left: 0 };

    if (containerDOMNode.tagName === 'BODY') {
        width = window.innerWidth;
        height = window.innerHeight;

        if (containerDOMNode.ownerDocument) {
            scroll.top =
                containerDOMNode.ownerDocument.documentElement.scrollTop;
            scroll.left =
                containerDOMNode.ownerDocument.documentElement.scrollLeft;
        } else {
            scroll.top = containerDOMNode.scrollTop;
            scroll.left = containerDOMNode.scrollLeft;
        }
    } else {
        ({
            width,
            height,
            top,
            left,
        } = containerDOMNode.getBoundingClientRect() as DOMRect);
        scroll.top = containerDOMNode.scrollTop;
        scroll.left = containerDOMNode.scrollLeft;
    }

    return { width, height, scroll, top, left };
}

function getDelta(
    axis: string,
    offset: number,
    size: number,
    containerDimensions: ContainerDimensions,
    padding: number
): number {
    const containerScroll = containerDimensions.scroll[axis];
    const containerHeight: number = containerDimensions[
        AXIS_SIZE[axis]
    ] as number;

    const startEdgeOffset = offset - padding - containerScroll;
    const endEdgeOffset: number = offset + padding - containerScroll + size;

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
    flipContainerDimensions: ContainerDimensions,
    containerOffsetWithBoundary: Offset
): boolean {
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

function getMargins(node: Element): Margins {
    const style = window.getComputedStyle(node);
    return {
        bottom: parseInt(style.marginBottom as string, 10) || 0,
        left: parseInt(style.marginLeft as string, 10) || 0,
        right: parseInt(style.marginRight as string, 10) || 0,
        top: parseInt(style.marginTop as string, 10) || 0,
    };
}

function parsePlacement(input: string): PlacementInfo {
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
    childOffset: Offset,
    containerDimensions: ContainerDimensions,
    overlaySize: Offset,
    placementInfo: PlacementInfo,
    offset: number,
    crossOffset: number
): Position {
    const {
        axis,
        crossAxis,
        crossPlacement,
        crossSize,
        size,
        placement,
    } = placementInfo;

    const position: Position = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    };

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
            ? childOffset[axis] - overlaySize[size] - offset
            : childOffset[axis] + childOffset[size] + offset;

    return position;
}

export function calculatePositionInternal(
    placementInput: string,
    containerDimensions: ContainerDimensions,
    childOffset: Offset,
    overlaySize: Offset,
    margins: Margins,
    padding: number,
    flip: boolean,
    boundaryDimensions: ContainerDimensions,
    containerOffsetWithBoundary: Offset,
    offset: number,
    crossOffset: number
): PositionResult {
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
        const flippedAxis = flippedPlacementInfo.axis;
        const flippedSize = flippedPlacementInfo.size;

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

    const arrowPosition: PossiblePosition = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    arrowPosition[crossAxis] =
        childOffset[crossSize] > overlaySize[crossSize]
            ? null
            : childOffset[crossAxis] -
              position[crossAxis] +
              childOffset[crossSize] / 2;

    return {
        arrowOffsetLeft: arrowPosition.left || 0,
        arrowOffsetTop: arrowPosition.top || 0,
        maxHeight,
        placement: placementInfo.placement,
        positionLeft: position.left || 0,
        positionTop: position.top || 0,
    };
}

function getShadowPosition(
    target: HTMLElement,
    container: HTMLElement
): Offset {
    const targetPosition = target.getBoundingClientRect() as Offset;
    const containerPosition = container.getBoundingClientRect() as Offset;
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
    overlayNode: HTMLElement,
    target: HTMLElement,
    container: HTMLElement,
    padding: number,
    flip: boolean,
    boundariesElement: HTMLElement,
    offset: number,
    crossOffset: number
): PositionResult {
    const isBodyContainer = container.tagName === 'BODY';
    const childOffset = isBodyContainer
        ? (target.getBoundingClientRect() as Offset)
        : (getShadowPosition(target, container) as Offset);

    if (!isBodyContainer) {
        childOffset.top += parseInt(target.style.marginTop as string, 10) || 0;
        childOffset.left +=
            parseInt(target.style.marginLeft as string, 10) || 0;
    }

    const overlaySize = overlayNode.getBoundingClientRect() as Offset;
    const margins = getMargins(overlayNode);
    overlaySize.width += margins.left + margins.right;
    overlaySize.height += margins.top + margins.bottom;

    const containerDimensions = getContainerDimensions(container);
    const boundaryContainer = container;
    const boundaryDimensions = getContainerDimensions(boundaryContainer);
    const containerOffsetWithBoundary =
        boundaryContainer.tagName === 'BODY'
            ? (container.getBoundingClientRect() as Offset)
            : (getShadowPosition(container, boundaryContainer) as Offset);
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
