---
title: Local
version: 1.5.0
signature: |
  frozenMoment.build().local();
---


Sets a flag on the original builder to internally use `Date#get*` and `Date#set*` instead of `Date#getUTC*` and `Date#setUTC*`.

```javascript
var a = frozenMoment.build.utc([2011, 0, 1, 8]);
a.hours(); // 8 UTC
a.local();
a.hours(); // 0 PST
```

See [frozenMoment.utc()](#/parsing/utc/) for more information on UTC mode.
