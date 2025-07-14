"use strict";
import { useFakeTimers } from "sinon";
import { OverlayTimer } from "@spectrum-web-components/overlay/src/overlay-timer.js";
import { expect } from "@open-wc/testing";
describe("Overlays timer", () => {
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });
  it("should resolve after warmup", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element = document.createElement("div");
    const promise = timer.openTimer(element);
    clock.next();
    expect(clock.now).to.equal(500);
    const cancelled = await promise;
    expect(cancelled).to.be.false;
  });
  it("should resolve true when cancelled", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element = document.createElement("div");
    const promise = timer.openTimer(element);
    clock.tick(10);
    timer.close(element);
    clock.next();
    const cancelled = await promise;
    expect(cancelled).to.be.true;
  });
  it("should resolve cancelled when opening new overlay", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const promise1 = timer.openTimer(element1);
    clock.tick(10);
    const promise2 = timer.openTimer(element2);
    clock.tick(10);
    let cancelled = await promise1;
    expect(cancelled).to.be.true;
    clock.next();
    cancelled = await promise2;
    expect(cancelled).to.be.false;
    expect(clock.now).to.equal(510);
  });
  it("should cooldown after closing overlay", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element = document.createElement("div");
    let promise = timer.openTimer(element);
    clock.next();
    timer.close(element);
    clock.next();
    expect(clock.now).to.equal(1e3);
    promise = timer.openTimer(element);
    clock.next();
    const cancelled = await promise;
    expect(cancelled).to.be.false;
    expect(clock.now).to.equal(1500);
  });
  it("should open overlay quickly when hot", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element = document.createElement("div");
    let promise = timer.openTimer(element);
    clock.next();
    timer.close(element);
    clock.tick(1);
    promise = timer.openTimer(element);
    clock.next();
    const cancelled = await promise;
    expect(cancelled).to.be.false;
    expect(clock.now).to.equal(501);
  });
  it("should cooldown after opening and closing overlay multiple times", async () => {
    const timer = new OverlayTimer({
      warmUpDelay: 500,
      coolDownDelay: 500
    });
    const element = document.createElement("div");
    let promise = timer.openTimer(element);
    clock.next();
    expect(clock.now).to.equal(500);
    timer.close(element);
    clock.tick(1);
    for (let i = 0; i < 10; i++) {
      const element2 = document.createElement("div");
      promise = timer.openTimer(element2);
      clock.next();
      const cancelled2 = await promise;
      expect(cancelled2).to.be.false;
      timer.close(element2);
      clock.tick(1);
    }
    clock.next();
    expect(clock.now).to.equal(1010);
    promise = timer.openTimer(element);
    clock.next();
    const cancelled = await promise;
    expect(cancelled).to.be.false;
    expect(clock.now).to.equal(1510);
  });
});
//# sourceMappingURL=overlay-timer.test.js.map
