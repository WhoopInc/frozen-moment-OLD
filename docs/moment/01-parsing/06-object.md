---
title: Object
version: 2.2.1
signature: |
  frozenMoment({unit: value, ...});
  frozenMoment.build({unit: value, ...});
---


```javascript
frozenMoment({hour: 15, minute: 10});
frozenMoment({y: 2010, M: 3, d: 5, h: 15, m: 10, s: 3, ms: 123});
frozenMoment({year: 2010, month: 3, day: 5, hour: 15, minute: 10, second: 3, millisecond: 123});
frozenMoment({years: 2010, months: 3, days: 5, hours: 15, minutes: 10, seconds: 3, milliseconds: 123});
```

You can create a FrozenMoment object specifying some of the units in an object.
Omitted units are defaulted to 0 or current date/month/year.

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
