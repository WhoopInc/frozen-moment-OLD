---
title: Set
version: 2.2.1
signature: |
  frozenMoment().set('year', 2013);
  frozenMoment().set('month', 3);  // April
  frozenMoment().set('date', 1);
  frozenMoment().set('hour', 13);
  frozenMoment().set('minute', 20);
  frozenMoment().set('second', 30);
  frozenMoment().set('millisecond', 123);
---


String setter. In general:

```javascript
frozenMoment.build().set(unit, value)  // same as frozenMoment.build()[unit](value)
```

Units are case insensitive, and support plural and short forms: year (years,
y), month (months, M), date (dates, D), hour (hours, h), minute (minutes, m),
second (seconds, s), millisecond (milliseconds, ms).
