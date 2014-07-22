---
title: Unix Timestamp (seconds)
version: 1.6.0
signature: |
  frozenMoment.unix(Number)
  frozenMoment.build.unix(Number)
---


To create a FrozenMoment from a Unix timestamp (*seconds* since the Unix Epoch), use `frozenMoment.unix(Number)`.

```javascript
var day = frozenMoment.unix(1318781876);
```

This is implemented as `frozenMoment(timestamp * 1000)`, so partial seconds in the input timestamp are included.

```javascript
var day = frozenMoment.unix(1318781876.721);
```

This syntax can also be invoked as `frozenMoment.build.unix()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
