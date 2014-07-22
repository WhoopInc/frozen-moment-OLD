---
title: Date
version: 1.0.0
signature: |
  frozenMoment(Date);
  frozenMoment.build(Date);
---


You can create a `FrozenMoment` with a pre-existing native Javascript `Date` object.

```javascript
var day = new Date(2011, 9, 16);
var dayWrapper = frozenMoment(day);
```

This clones `Date` object; further changes to the `Date` won't affect the `FrozenMoment`, and vice-versa.

This is the fastest way to get a FrozenMoment wrapper.

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
