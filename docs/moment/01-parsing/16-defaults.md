---
title: Defaults
version: 2.2.1
signature: |
  frozenMoment("15", "hh")
  frozenMoment.build("15", "hh")
---


You can create a FrozenMoment object specifying only some of the units, and the rest
will be defaulted to the current day, month or year, or 0 for hours, minutes,
seconds and milliseconds.

Defaulting to now, when nothing is passed:
```javascript
frozenMoment();  // current date and time
```

Defaulting to today, when only hours, minutes, seconds and milliseconds are passed:
```javasript
frozenMoment(5, "HH");  // today, 5:00:00.000
frozenMoment({hour: 5});  // today, 5:00:00.000
frozenMoment({hour: 5, minute: 10});  // today, 5:10.00.000
frozenMoment({hour: 5, minute: 10, seconds: 20});  // today, 5:10.20.000
frozenMoment({hour: 5, minute: 10, seconds: 20, milliseconds: 300});  // today, 5:10.20.300
```

Defaulting to this month and year, when only days and smaller units are passed:
```javascript
frozenMoment(5, "DD");  // this month, 5th day-of-month
frozenMoment("4 05:06:07", "DD hh:mm:ss");  // this month, 4th day-of-month, 05:06:07.000
```

Defaulting to this year, if year is not specified:
```javascript
frozenMoment(3, "MM");  // this year, 3th month (April)
frozenMoment("Apr 4 05:06:07", "MMM DD hh:mm:ss");  // this year, 5th April, 05:06:07.000
```
