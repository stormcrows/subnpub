const SubnPub = require("./index");
let p = null;

const genMockFnArray = N => [...Array(N || 0)].map((_, i) => jest.fn());

beforeEach(() => {
  p = SubnPub();
});

describe("subscribe", () => {
  it("should add particular function only once", () => {
    const s = jest.fn();
    p.subscribe(s);
    p.subscribe(s);
    p.subscribe(s);
    p.publish("TEST");

    expect(s).toHaveBeenCalledTimes(1);
  });

  it("should allow to add multiple subscribers", () => {
    const subscribers = genMockFnArray(313);
    p.subscribe(...subscribers);
    p.publish("TEST");

    subscribers.forEach(sub => expect(sub).toHaveBeenCalledTimes(1));
  });

  it("should allow to add an array subscribers", () => {
    const subscribers = genMockFnArray(233);
    p.subscribe(subscribers);
    p.publish("TEST");

    subscribers.forEach(sub => expect(sub).toHaveBeenCalledTimes(1));
  });
});

describe("publish", () => {
  it("should deliver to all subscribers", () => {
    const subscribers = genMockFnArray(123);
    subscribers.forEach(sub => p.subscribe(sub));

    p.publish("TEST1");
    p.publish("TEST2");
    p.publish("TEST3");

    subscribers.forEach(sub => expect(sub).toHaveBeenCalledTimes(3));
  });
});

describe("unsubscribe", () => {
  it("should remove subscription of particular function", () => {
    const s = jest.fn();
    p.subscribe(s);
    p.unsubscribe(s);
    p.publish("TEST");

    expect(s).toHaveBeenCalledTimes(0);
  });

  it("should allow to remove multiple subscribers", () => {
    const subscribers = genMockFnArray(500);
    p.subscribe(...subscribers);
    p.unsubscribe(...subscribers);
    p.publish("TEST");

    subscribers.forEach(sub => expect(sub).toHaveBeenCalledTimes(0));
  });

  it("should allow to remove an array of subscribers", () => {
    const subscribers = genMockFnArray(235);
    p.subscribe(subscribers);
    p.unsubscribe(subscribers);
    p.publish("TEST");

    subscribers.forEach(sub => expect(sub).toHaveBeenCalledTimes(0));
  });
});

describe("has", () => {
  it("should return false if function was never subscribed", () => {
    const s = jest.fn();
    expect(p.has(s)).toBeFalsy();
  });

  it("should return true for subscribed function", () => {
    const s = jest.fn();
    p.subscribe(s);

    expect(p.has(s)).toBeTruthy();
  });

  it("should return false for unsubscribed function", () => {
    const s = jest.fn();
    p.subscribe(s);
    p.unsubscribe(s);

    expect(p.has(s)).toBeFalsy();
  });
});

describe("length", () => {
  it("should return number of subscribers", () => {
    const N = 1000;
    for (let i = 0; i < N; ++i) {
      p.subscribe(() => {});
    }

    expect(p.length()).toBe(N);
  });
});

describe("reset", () => {
  it("should remove all subscribers", () => {
    const N = 45;
    for (let i = 0; i < N; ++i) {
      p.subscribe(() => {});
    }
    p.reset();

    expect(p.length()).toBe(0);
  });
});
