---
title: Is Before
version: 2.0.0
signature: |
  frozenMoment().isBefore(FrozenMoment|String|Number|Date|Array);
  frozenMoment().isBefore(FrozenMoment|String|Number|Date|Array, String);
---


Check if a frozenMoment is before another frozenMoment.

```javascript
frozenMoment('2010-10-20').isBefore('2010-10-21'); // true
```

If you want to limit the granularity to a unit other than milliseconds, pass the units as the second parameter.

```javascript
frozenMoment('2010-10-20').isBefore('2010-12-31', 'year'); // false
frozenMoment('2010-10-20').isBefore('2011-01-01', 'year'); // true
```

Like `frozenMoment#isAfter` and `frozenMoment#isSame`, any of the units of time that are supported for `frozenMoment#startOf` are supported for `frozenMoment#isBefore`. Year, month, week, day, hour, minute, and second.

If nothing is passed to `frozenMoment#isBefore`, it will default to the current time.

*NOTE*: `frozenMoment().isBefore()` (with no arguments) has undefined behavior and should not be used! If
the code runs quickly, the initially created frozenMoment would be the same as the one
created in isBefore to perform the check, so the result would be `false`. But
if the code runs more slowly, it's possible that the frozenMoment created in isBefore will be
measurably after the one created in `frozenMoment()`, so the call would return
`true`.
