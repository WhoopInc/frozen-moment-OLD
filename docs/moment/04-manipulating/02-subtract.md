---
title: Subtract
version: 1.0.0
signature: |
  frozenMoment().subtract(String, Number);
  frozenMoment().subtract(Number, String); // 2.0.0
  frozenMoment().subtract(String, String); // 2.7.0
  frozenMoment().subtract(Duration); // 1.6.0
  frozenMoment().subtract(Object);
---


Mutates the original builder by subtracting time.

This is exactly the same as `frozenMoment.build#add`, only instead of adding time, it subtracts time.

```javascript
frozenMoment.build().subtract(7, 'days');
```

As of version **2.7.0**, `subtract` supports numeric values (number of seconds, hours, days etc) to be specified in `String` form, for example:

```javascript
frozenMoment.build().subtract('1', 'seconds');
```

**NOTE**: Moment's `subtract(unit, value)` syntax is **not** supported. Use `subtract(value, unit)` instead -- it's easier to read and more consistent with the duration interface.
