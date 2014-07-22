---
title: Is After
version: 2.0.0
signature: |
  frozenMoment().isAfter(FrozenMoment|String|Number|Date|Array);
  frozenMoment().isAfter(FrozenMoment|String|Number|Date|Array, String);
---


Check if a frozenMoment is after another frozenMoment.

```javascript
frozenMoment('2010-10-20').isAfter('2010-10-19'); // true
```

If you want to limit the granularity to a unit other than milliseconds, pass the units as the second parameter.

```javascript
frozenMoment('2010-10-20').isAfter('2010-01-01', 'year'); // false
frozenMoment('2010-10-20').isAfter('2009-12-31', 'year'); // true
```

Like `frozenMoment#isSame` and `frozenMoment#isBefore`, any of the units of time that are supported for `frozenMoment#startOf` are supported for `frozenMoment#isAfter`. Year, month, week, day, hour, minute, and second.

If nothing is passed to `frozenMoment#isAfter`, it will default to the current time.

```javascript
frozenMoment().isAfter(); // false
```
