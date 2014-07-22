---
title: Month
version: 1.0.0
signature: |
  frozenMoment().month(Number|String);
  frozenMoment().months(Number|String);
---


Sets the month.

Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the year.

**Note**: Months are zero indexed, so January is month 0.

As of **2.1.0**, a month name is also supported. This is parsed in the moment's current locale.

```javascript
frozenMoment.build().month("January");
frozenMoment.build().month("Feb");
```

As of version **2.1.0**, if a moment changes months and the new month does not have enough days to keep the current day of month, the date will be clamped to the end of the target month.

```javascript
frozenMoment.build([2012, 0, 31]).month(1).freeze().format("YYYY-MM-DD"); // 2012-02-29
```
