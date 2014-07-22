---
title: UTC
version: 1.5.0
signature: |
  frozenMoment.build().utc();
---


Sets a flag on the original builder to internally use `Date#getUTC*` and `Date#setUTC*` instead of `Date#get*` and `Date#set*`.

```javascript
var a = frozenMoment.build([2011, 0, 1, 8]);
a.hours(); // 8 PST
a.utc();
a.hours(); // 16 UTC
```

See [frozenMoment.utc()](#/parsing/utc/) for more information on UTC mode.
