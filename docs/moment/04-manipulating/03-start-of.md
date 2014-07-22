---
title: Start of Time
version: 1.7.0
signature: |
  frozenMoment().startOf(String);
---


Mutates the original builder by setting it to the start of a unit of time.

```javascript
frozenMoment.build().startOf('year');    // set to January 1st, 12:00 am this year
frozenMoment.build().startOf('month');   // set to the first of this month, 12:00 am
frozenMoment.build().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
frozenMoment.build().startOf('week');    // set to the first day of this week, 12:00 am
frozenMoment.build().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
frozenMoment.build().startOf('day');     // set to 12:00 am today
frozenMoment.build().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
frozenMoment.build().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
frozenMoment.build().startOf('second');  // same as frozenMoment.build().milliseconds(0);
```

These shortcuts are essentially the same as the following.

```javascript
frozenMoment.build().startOf('year');
frozenMoment.build().month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
```

```javascript
frozenMoment.build().startOf('hour');
frozenMoment.build().minutes(0).seconds(0).milliseconds(0)
```

As of version **2.0.0**, `frozenMoment#startOf('day')` replaced `frozenMoment#sod`.

**Note:** `frozenMoment#startOf('week')` was added in version **2.0.0**.

As of version **2.1.0**, `frozenMoment#startOf('week')` uses the locale aware week start day.

**Note:** `frozenMoment#startOf('isoWeek')` was added in version **2.2.0**.
