---
title: Day of Week
version: 1.3.0
signature: |
  frozenMoment().day(Number|String);
  frozenMoment().days(Number|String);
---


Sets the day of the week.

This method can be used to set the day of the week, with Sunday as 0 and Saturday as 6.

If the range is exceeded, it will bubble up to other weeks.

```javascript
frozenMoment.build().day(-7); // last Sunday (0 - 7)
frozenMoment.build().day(7);  // next Sunday (0 + 7)
frozenMoment.build().day(10); // next Wednesday (3 + 7)
frozenMoment.build().day(24); // 3 Wednesdays from now (3 + 7 + 7 + 7)
```

**Note:** `FrozenMoment.build#date` is for the date of the month, and `FrozenMoment.build#day` is for the day of the week.

As of **2.1.0**, a week name is also supported. This is parsed in the builder's current locale.

```javascript
frozenMoment.build().day("Sunday");
frozenMoment.build().day("Monday");
```
