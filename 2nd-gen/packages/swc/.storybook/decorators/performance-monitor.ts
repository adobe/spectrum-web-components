/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Web-components-compatible performance monitoring decorator for Storybook.
 *
 * Implements metric collection using web platform APIs and communicates
 * with the @github-ui/storybook-addon-performance-panel manager panel
 * via Storybook's channel API.
 *
 * React Profiler metrics are not available since stories are web components.
 */

import type { DecoratorFunction, StoryContext } from '@storybook/types';
import { addons } from 'storybook/preview-api';

const ADDON_ID = 'primer-performance-monitor';
const PERF_EVENTS = {
  METRICS_UPDATE: `${ADDON_ID}/metrics-update`,
  RESET: `${ADDON_ID}/reset`,
  REQUEST_METRICS: `${ADDON_ID}/request-metrics`,
  INSPECT_ELEMENT: `${ADDON_ID}/inspect-element`,
};

const FRAME_TIME_60FPS = 16.67;
const DROPPED_FRAME_MULTIPLIER = 2;
const SPARKLINE_HISTORY_SIZE = 30;
const UPDATE_INTERVAL_MS = 50;
const SPARKLINE_SAMPLE_INTERVAL_MS = 200;

function computeAverage(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

function computeP95(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length * 0.95)] ?? 0;
}

function addToWindow(arr: number[], value: number, maxSize: number): void {
  arr.push(value);
  if (arr.length > maxSize) {
    arr.shift();
  }
}

interface Interaction {
  type: string;
  duration: number;
  inputDelay: number;
  processingTime: number;
  presentationDelay: number;
  target: string;
  timestamp: number;
}

/**
 * Lightweight metric collector using web platform APIs.
 * Collects frame timing, input latency, long tasks, layout shifts, and memory.
 */
class WebComponentMetricsCollector {
  private rafId: number | null = null;
  private lastFrameTime = 0;
  private frameTimes: number[] = [];
  private maxFrameTime = 0;
  private droppedFrames = 0;

  private fpsHistory: number[] = [];
  private frameTimeHistory: number[] = [];
  private memoryHistory: number[] = [];

  private longTasks = 0;
  private longestTask = 0;
  private totalBlockingTime = 0;
  private longTaskObserver: PerformanceObserver | null = null;

  private layoutShiftScore = 0;
  private layoutShiftCount = 0;
  private sessionCLS = 0;
  private layoutShiftObserver: PerformanceObserver | null = null;

  private baselineMemoryMB: number | null = null;
  private lastMemoryMB: number | null = null;
  private peakMemoryMB: number | null = null;

  private inputLatencies: number[] = [];
  private maxInputLatency = 0;
  private interactionCount = 0;
  private inpMs = 0;
  private eventTimingSupported = false;
  private eventTimingObserver: PerformanceObserver | null = null;
  private interactionMap = new Map<number, number>();
  private firstInputDelay: number | null = null;
  private firstInputType: string | null = null;
  private lastInteraction: Interaction | null = null;
  private slowestInteraction: Interaction | null = null;

  private loafSupported = false;
  private loafCount = 0;
  private loafObserver: PerformanceObserver | null = null;
  private totalLoafBlockingDuration = 0;
  private longestLoafDuration = 0;
  private longestLoafBlockingDuration = 0;
  private loafDurations: number[] = [];

  private domElements: number | null = null;
  private containerObserver: MutationObserver | null = null;

  start(): void {
    this.startRAFLoop();
    this.startLongTaskObserver();
    this.startLayoutShiftObserver();
    this.startEventTimingObserver();
    this.startLoafObserver();
    this.sampleMemory();
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.longTaskObserver?.disconnect();
    this.longTaskObserver = null;
    this.layoutShiftObserver?.disconnect();
    this.layoutShiftObserver = null;
    this.eventTimingObserver?.disconnect();
    this.eventTimingObserver = null;
    this.loafObserver?.disconnect();
    this.loafObserver = null;
    this.containerObserver?.disconnect();
    this.containerObserver = null;
  }

  reset(): void {
    this.frameTimes = [];
    this.maxFrameTime = 0;
    this.droppedFrames = 0;
    this.fpsHistory = [];
    this.frameTimeHistory = [];
    this.memoryHistory = [];
    this.longTasks = 0;
    this.longestTask = 0;
    this.totalBlockingTime = 0;
    this.layoutShiftScore = 0;
    this.layoutShiftCount = 0;
    this.sessionCLS = 0;
    this.inputLatencies = [];
    this.maxInputLatency = 0;
    this.interactionCount = 0;
    this.inpMs = 0;
    this.interactionMap.clear();
    this.firstInputDelay = null;
    this.firstInputType = null;
    this.lastInteraction = null;
    this.slowestInteraction = null;
    this.loafCount = 0;
    this.totalLoafBlockingDuration = 0;
    this.longestLoafDuration = 0;
    this.longestLoafBlockingDuration = 0;
    this.loafDurations = [];
    this.baselineMemoryMB = this.lastMemoryMB;
    this.peakMemoryMB = this.lastMemoryMB;
  }

  observeContainer(container: HTMLElement): () => void {
    let countTimeout: ReturnType<typeof setTimeout> | null = null;
    const countElements = () => {
      this.domElements = container.querySelectorAll('*').length;
    };
    countElements();
    this.containerObserver = new MutationObserver(() => {
      if (countTimeout) {
        return;
      }
      countTimeout = setTimeout(() => {
        countElements();
        countTimeout = null;
      }, 500);
    });
    this.containerObserver.observe(container, {
      childList: true,
      subtree: true,
    });
    return () => {
      this.containerObserver?.disconnect();
      if (countTimeout) {
        clearTimeout(countTimeout);
      }
    };
  }

  updateSparklineData(): void {
    this.sampleMemory();
    if (this.frameTimes.length > 0) {
      const avg = computeAverage(this.frameTimes);
      const fps = Math.round(1000 / avg);
      addToWindow(this.fpsHistory, fps, SPARKLINE_HISTORY_SIZE);
      addToWindow(this.frameTimeHistory, avg, SPARKLINE_HISTORY_SIZE);
    }
  }

  computeMetrics(): Record<string, unknown> {
    const avgFrameTime = computeAverage(this.frameTimes);
    const fps = avgFrameTime > 0 ? Math.round(1000 / avgFrameTime) : 0;
    const avgInputLatency = computeAverage(this.inputLatencies);
    const memoryDeltaMB =
      this.lastMemoryMB !== null && this.baselineMemoryMB !== null
        ? Math.round((this.lastMemoryMB - this.baselineMemoryMB) * 10) / 10
        : null;

    const frameStability =
      this.frameTimes.length > 1
        ? Math.round(
            (1 -
              Math.min(
                1,
                this.frameTimes.reduce(
                  (sum, t, i, a) =>
                    i > 0 ? sum + Math.abs(t - a[i - 1]) : sum,
                  0
                ) /
                  (this.frameTimes.length * FRAME_TIME_60FPS)
              )) *
              100
          )
        : 100;

    return {
      fps,
      frameTime: Math.round(avgFrameTime * 10) / 10,
      maxFrameTime: Math.round(this.maxFrameTime * 10) / 10,
      droppedFrames: this.droppedFrames,
      frameJitter: 0,
      frameStability,
      inputLatency: Math.round(avgInputLatency * 10) / 10,
      maxInputLatency: Math.round(this.maxInputLatency * 10) / 10,
      inputJitter: 0,
      eventTimingSupported: this.eventTimingSupported,
      interactionCount: this.interactionCount,
      inpMs: this.inpMs,
      firstInputDelay: this.firstInputDelay,
      firstInputType: this.firstInputType,
      lastInteraction: this.lastInteraction,
      slowestInteraction: this.slowestInteraction,
      interactionsByType: {},
      paintTime: 0,
      maxPaintTime: 0,
      paintCount: 0,
      paintJitter: 0,
      memoryUsedMB: this.lastMemoryMB,
      memoryDeltaMB,
      peakMemoryMB: this.peakMemoryMB,
      gcPressure: 0,
      fpsHistory: [...this.fpsHistory],
      frameTimeHistory: [...this.frameTimeHistory],
      memoryHistory: [...this.memoryHistory],
      longTasks: this.longTasks,
      longestTask: this.longestTask,
      totalBlockingTime: Math.round(this.totalBlockingTime),
      loafSupported: this.loafSupported,
      loafCount: this.loafCount,
      totalLoafBlockingDuration: this.totalLoafBlockingDuration,
      longestLoafDuration: this.longestLoafDuration,
      longestLoafBlockingDuration: this.longestLoafBlockingDuration,
      avgLoafDuration:
        this.loafDurations.length > 0
          ? Math.round(computeAverage(this.loafDurations))
          : 0,
      p95LoafDuration: computeP95(this.loafDurations),
      loafsWithScripts: 0,
      lastLoaf: null,
      worstLoaf: null,
      styleWrites: 0,
      thrashingScore: 0,
      layoutShiftScore: this.layoutShiftScore,
      layoutShiftCount: this.layoutShiftCount,
      currentSessionCLS: this.sessionCLS,
      forcedReflowCount: 0,
      domMutationsPerFrame: 0,
      cssVarChanges: 0,
      domElements: this.domElements,
      scriptEvalTime: 0,
      eventListenerCount: 0,
      observerCount: 0,
      compositorLayers: null,
      elementTimingSupported: false,
      elementTimingCount: 0,
      largestElementRenderTime: 0,
      elementTimings: [],
    };
  }

  private startRAFLoop(): void {
    this.lastFrameTime = performance.now();
    const loop = (now: number) => {
      const delta = now - this.lastFrameTime;
      if (delta > 0 && delta < 1000) {
        this.frameTimes.push(delta);
        if (this.frameTimes.length > 60) {
          this.frameTimes.shift();
        }
        if (delta > this.maxFrameTime) {
          this.maxFrameTime = delta;
        }
        if (delta > FRAME_TIME_60FPS * DROPPED_FRAME_MULTIPLIER) {
          this.droppedFrames++;
        }
      }
      this.lastFrameTime = now;
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private startLongTaskObserver(): void {
    try {
      if (
        typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes?.includes('longtask')
      ) {
        return;
      }
      this.longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.longTasks++;
          if (entry.duration > this.longestTask) {
            this.longestTask = entry.duration;
          }
          if (entry.duration > 50) {
            this.totalBlockingTime += entry.duration - 50;
          }
        }
      });
      this.longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {
      /* unsupported */
    }
  }

  private startLayoutShiftObserver(): void {
    try {
      if (
        typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes?.includes('layout-shift')
      ) {
        return;
      }
      this.layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lsEntry = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!lsEntry.hadRecentInput) {
            this.layoutShiftScore += lsEntry.value;
            this.layoutShiftCount++;
            this.sessionCLS += lsEntry.value;
          }
        }
      });
      this.layoutShiftObserver.observe({
        type: 'layout-shift',
        buffered: true,
      });
    } catch {
      /* unsupported */
    }
  }

  private startEventTimingObserver(): void {
    try {
      if (
        typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes?.includes('event')
      ) {
        return;
      }
      this.eventTimingSupported = true;
      this.eventTimingObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const evt = entry as PerformanceEntry & {
            interactionId: number;
            processingStart: number;
            processingEnd: number;
            duration: number;
            name: string;
            target: Element | null;
          };
          if (!evt.interactionId) {
            continue;
          }

          const duration = evt.duration;
          const inputDelay = evt.processingStart - evt.startTime;
          const processingTime = evt.processingEnd - evt.processingStart;
          const presentationDelay =
            evt.startTime + duration - evt.processingEnd;

          const existing = this.interactionMap.get(evt.interactionId) ?? 0;
          if (duration > existing) {
            this.interactionMap.set(evt.interactionId, duration);
          }

          this.interactionCount = this.interactionMap.size;
          const durations = [...this.interactionMap.values()].sort(
            (a, b) => b - a
          );
          this.inpMs =
            durations.length > 0
              ? (durations[
                  Math.min(
                    durations.length - 1,
                    Math.floor(durations.length * 0.02)
                  )
                ] ?? 0)
              : 0;

          this.inputLatencies.push(inputDelay);
          if (this.inputLatencies.length > 30) {
            this.inputLatencies.shift();
          }
          if (inputDelay > this.maxInputLatency) {
            this.maxInputLatency = inputDelay;
          }

          if (this.firstInputDelay === null) {
            this.firstInputDelay = inputDelay;
            this.firstInputType = evt.name;
          }

          const targetSelector = evt.target
            ? evt.target.id
              ? `#${evt.target.id}`
              : evt.target.tagName.toLowerCase()
            : 'unknown';

          const interaction: Interaction = {
            type: evt.name,
            duration,
            inputDelay: Math.round(inputDelay * 10) / 10,
            processingTime: Math.round(processingTime * 10) / 10,
            presentationDelay: Math.round(presentationDelay * 10) / 10,
            target: targetSelector,
            timestamp: evt.startTime,
          };

          this.lastInteraction = interaction;
          if (
            !this.slowestInteraction ||
            duration > this.slowestInteraction.duration
          ) {
            this.slowestInteraction = interaction;
          }
        }
      });
      this.eventTimingObserver.observe({
        type: 'event',
        buffered: true,
        durationThreshold: 16,
      } as PerformanceObserverInit);
    } catch {
      /* unsupported */
    }
  }

  private startLoafObserver(): void {
    try {
      if (
        typeof PerformanceObserver === 'undefined' ||
        !PerformanceObserver.supportedEntryTypes?.includes(
          'long-animation-frame'
        )
      ) {
        return;
      }
      this.loafSupported = true;
      this.loafObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const loaf = entry as PerformanceEntry & {
            blockingDuration: number;
          };
          this.loafCount++;
          this.loafDurations.push(loaf.duration);
          this.totalLoafBlockingDuration += loaf.blockingDuration;
          if (loaf.duration > this.longestLoafDuration) {
            this.longestLoafDuration = loaf.duration;
          }
          if (loaf.blockingDuration > this.longestLoafBlockingDuration) {
            this.longestLoafBlockingDuration = loaf.blockingDuration;
          }
        }
      });
      this.loafObserver.observe({
        type: 'long-animation-frame',
        buffered: true,
      });
    } catch {
      this.loafSupported = false;
    }
  }

  private sampleMemory(): void {
    const perf = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
      };
    };
    if (!perf.memory) {
      return;
    }
    const mb = Math.round((perf.memory.usedJSHeapSize / 1048576) * 10) / 10;
    this.lastMemoryMB = mb;
    if (this.baselineMemoryMB === null) {
      this.baselineMemoryMB = mb;
    }
    if (this.peakMemoryMB === null || mb > this.peakMemoryMB) {
      this.peakMemoryMB = mb;
    }
    addToWindow(this.memoryHistory, mb, SPARKLINE_HISTORY_SIZE);
  }
}

let activeCollector: WebComponentMetricsCollector | null = null;
let metricsIntervalId: ReturnType<typeof setInterval> | null = null;
let sparklineIntervalId: ReturnType<typeof setInterval> | null = null;
let containerCleanup: (() => void) | null = null;
let channelListenersCleanup: (() => void) | null = null;

function stopCollector(): void {
  if (metricsIntervalId !== null) {
    clearInterval(metricsIntervalId);
    metricsIntervalId = null;
  }
  if (sparklineIntervalId !== null) {
    clearInterval(sparklineIntervalId);
    sparklineIntervalId = null;
  }
  containerCleanup?.();
  containerCleanup = null;
  channelListenersCleanup?.();
  channelListenersCleanup = null;
  activeCollector?.stop();
  activeCollector = null;
}

function startCollector(): void {
  stopCollector();

  const collector = new WebComponentMetricsCollector();
  activeCollector = collector;
  collector.start();

  const channel = addons.getChannel();

  const handleRequestMetrics = () => {
    channel.emit(PERF_EVENTS.METRICS_UPDATE, collector.computeMetrics());
  };
  const handleReset = () => {
    collector.reset();
  };
  const handleInspectElement = (selector: string) => {
    if (!selector || selector === 'unknown') {
      return;
    }
    try {
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch {
      /* invalid selector */
    }
  };

  channel.on(PERF_EVENTS.REQUEST_METRICS, handleRequestMetrics);
  channel.on(PERF_EVENTS.RESET, handleReset);
  channel.on(PERF_EVENTS.INSPECT_ELEMENT, handleInspectElement);

  channelListenersCleanup = () => {
    channel.off(PERF_EVENTS.REQUEST_METRICS, handleRequestMetrics);
    channel.off(PERF_EVENTS.RESET, handleReset);
    channel.off(PERF_EVENTS.INSPECT_ELEMENT, handleInspectElement);
  };

  metricsIntervalId = setInterval(() => {
    channel.emit(PERF_EVENTS.METRICS_UPDATE, collector.computeMetrics());
  }, UPDATE_INTERVAL_MS);

  sparklineIntervalId = setInterval(() => {
    collector.updateSparklineData();
  }, SPARKLINE_SAMPLE_INTERVAL_MS);

  requestAnimationFrame(() => {
    const root = document.getElementById('storybook-root');
    if (root) {
      containerCleanup = collector.observeContainer(root);
    }
  });
}

export const withPerformanceMonitor: DecoratorFunction = (
  storyFn,
  context: StoryContext
) => {
  if (context.parameters?.performancePanel?.disable) {
    return storyFn();
  }

  startCollector();
  return storyFn();
};
