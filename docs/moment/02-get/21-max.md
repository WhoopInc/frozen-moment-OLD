---
title: Maximum
version: 2.7.0
signature: |
  frozenMoment.max(Moment[,Moment...]);
---

Returns the maximum (most distant future) of the given frozenMoment instances.

For example:
```javascript
var a = frozenMoment.build().subtract(1, 'day').freeze();
var b = frozenMoment.build().add(1, 'day').freeze();
frozenMoment.max(a, b);  // b
```

With no arguments the function returns a frozenMoment instance with the current time.
