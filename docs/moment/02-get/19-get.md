---
title: Get
version: 2.2.1
signature: |
  frozenMoment().get('year');
  frozenMoment().get('month');  // 0 to 11
  frozenMoment().get('date');
  frozenMoment().get('hour');
  frozenMoment().get('minute');
  frozenMoment().get('second');
  frozenMoment().get('millisecond');
---


String getter. In general

```javascript
frozenMoment().get(unit) === frozenMoment()[unit]()
```

Units are case insensitive, and support plural and short forms: year (years,
y), month (months, M), date (dates, D), hour (hours, h), minute (minutes, m),
second (seconds, s), millisecond (milliseconds, ms).
