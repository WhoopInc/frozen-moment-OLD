---
title: Date of Month
version: 1.0.0
signature: |
  frozenMoment().date(Number);
  frozenMoment().dates(Number);
---


Sets the day of the month.

Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the months.

**Note:** `FrozenMoment.build#date` is for the date of the month, and `FrozenMoment.build#day` is for the day of the week.
