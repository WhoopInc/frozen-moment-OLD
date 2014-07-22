---
title: Minimum
version: 2.7.0
signature: |
  frozenMoment.min(Moment[,Moment...]);
---

Returns the minimum (most distant past) of the given frozenMoment instances.

For example:
```javascript
var a = frozenMoment.build().subtract(1, 'day').freeze();
var b = frozenMoment.build().add(1, 'day').freeze();
frozenMoment.min(a, b);  // a
```

With no arguments the function returns a frozenMoment instance with the current time.
