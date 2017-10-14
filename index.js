module.exports = () => {
  const list = [];

  return {
    subscribe: (...subscribers) => subscribeMany(list, flatten(subscribers)),

    unsubscribe: (...subscribers) =>
      unsubscribeMany(list, flatten(subscribers)),

    publish: msg => publish(msg, list),

    has: subscriber => has(subscriber, list),

    length: () => length(list),

    reset: () => reset(list)
  };
};

const flatten = arr => (Array.isArray(arr) ? [].concat.apply([], arr) : [arr]);

const subscribe = (s = () => {}, list) =>
  list.indexOf(s) === -1 && list.push(s);

const subscribeMany = (list, subscribers) =>
  subscribers.forEach(s => subscribe(s, list));

const unsubscribe = (s, list) => {
  const idx = list.indexOf(s);
  idx > -1 && list.splice(idx, 1);
};

const unsubscribeMany = (list, subscribers) =>
  subscribers.forEach(s => unsubscribe(s, list));

const publish = (msg, list) => list.forEach(s => s(msg));

const has = (s, list) => list.indexOf(s) > -1;

const length = list => list.length;

const reset = list => (list.length = 0);
