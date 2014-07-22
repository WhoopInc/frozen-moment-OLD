---
title: Is Same
version: 2.0.0
signature: |
  frozenMoment().isSame(FrozenMoment|String|Number|Date|Array);
  frozenMoment().isSame(FrozenMoment|String|Number|Date|Array, String);
---


Check if a frozenMoment is the same as another frozenMoment.

```javascript
frozenMoment('2010-10-20').isSame('2010-10-20'); // true
```

If you want to limit the granularity to a unit other than milliseconds, pass the units as the second parameter.

```javascript
frozenMoment('2010-10-20').isSame('2009-12-31', 'year'); // false
frozenMoment('2010-10-20').isSame('2010-01-01', 'year'); // true
frozenMoment('2010-10-20').isSame('2010-12-31', 'year'); // true
frozenMoment('2010-10-20').isSame('2011-01-01', 'year'); // false
```

Like `frozenMoment#isAfter` and `frozenMoment#isBefore`, any of the units of time that are supported for `frozenMoment#startOf` are supported for `frozenMoment#isSame`. Year, month, week, day, hour, minute, and second.

If nothing is passed to `frozenMoment#isSame`, it will default to the current time.

```javascript
frozenMoment().isSame(); // probably true, depending on how quickly the two frozenMoments are created
```
