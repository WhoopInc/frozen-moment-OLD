---
title: Day of Week (Locale Aware)
version: 2.1.0
signature: |
  frozenMoment().weekday(); // Number
---


Gets the day of the week according to the locale.

If the locale assigns Monday as the first day of the week, `frozenMoment.build().weekday(0).freeze().weekday()` will be Monday.
If Sunday is the first day of the week, `frozenMoment.build().weekday(0).freeze().weekday()` will be Sunday.
