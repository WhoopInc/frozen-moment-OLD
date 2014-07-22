---
title: ISO Day of Week
version: 2.1.0
signature: |
  frozenMoment().isoWeekday(); // Number
---


Gets the [ISO day of the week](http://en.wikipedia.org/wiki/ISO_week_date) with `1` being Monday and `7` being Sunday.

```javascript
frozenMoment.build().isoWeekday(1).freeze().isoWeekday(); // Monday
frozenMoment.build().isoWeekday(7).freeze().isoWeekday(); // Sunday
```
