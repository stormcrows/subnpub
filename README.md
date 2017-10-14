# subnpub

[![CircleCI](https://circleci.com/gh/stormcrows/subnpub/tree/master.svg?style=svg)](https://circleci.com/gh/stormcrows/subnpub/tree/master)

Minimal implementation of publish/subscribe pattern

## USAGE

```javascript
const SubNPub = require("subnpub");
const snp = SubNPub();

const fn1 = str => `1-Called Me with: ${str}`;
const fn2 = str => `2-Called Me with: ${str}`;
const fn3 = str => `3-Called Me with: ${str}`;

// subscribe enforces uniqueness
snp.subscribe(fn1);
// or:
snp.subscribe(fn1, fn2, fn3);
// or:
snp.subscribe([fn1, fn2, fn3]);


snp.publish("test"); // dispatches argument to all subscribers

snp.has(fn1); // true

snp.length(); // 3


snp.unsubscribe(fn1); // removes subscriber
// or:
snp.unsubscribe(fn1, fn2, fn3);
// or:
snp.unsubscribe([fn1, fn2, fn3]);

snp.reset(); // removes all subscribers
```
