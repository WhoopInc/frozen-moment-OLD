---
title: Day of Week (Locale Aware)
version: 2.1.0
signature: |
  frozenMoment().weekday(Number);
---


Sets the day of the week according to the locale.

If the locale assigns Monday as the first day of the week, `frozenMoment.build().weekday(0)` will be Monday.
If Sunday is the first day of the week, `frozenMoment.build().weekday(0)` will be Sunday.

As with `frozenMoment.build#day`, if the range is exceeded, it will bubble up to other weeks.

```javascript
// when Monday is the first day of the week
frozenMoment.build().weekday(-7); // last Monday
frozenMoment.build().weekday(7); // next Monday
// when Sunday is the first day of the week
frozenMoment.build().weekday(-7); // last Sunday
frozenMoment.build().weekday(7); // next Sunday
```
