---
title: End of Time
version: 1.7.0
signature: |
  frozenMoment().endOf(String);
---


Mutates the original builder by setting it to the end of a unit of time.

This is the same as `frozenMoment.build#startOf`, only instead of setting to the start of a unit of time, it sets to the end of a unit of time.

```javascript
frozenMoment.build().endOf("year"); // set the moment to 12-31 11:59:59.999 pm this year
```

As of version **2.0.0**, `frozenMoment#endOf('day')` replaced `frozenMoment#eod`.

**Note:** `frozenMoment#endOf('week')` was added in version **2.0.0**.

As of version **2.1.0**, `frozenMoment#endOf('week')` uses the locale aware week start day.
