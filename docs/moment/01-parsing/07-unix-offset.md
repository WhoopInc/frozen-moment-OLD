---
title: Unix Offset (milliseconds)
version: 1.0.0
signature: |
  frozenMoment(Number);
  frozenMoment.build(Number);
---


Similar to `new Date(Number)`, you can create a FrozenMoment by passing an integer value representing the number of *milliseconds* since the Unix Epoch (Jan 1 1970 12AM UTC).

```javascript
var day = frozenMoment(1318781876406);
```

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
