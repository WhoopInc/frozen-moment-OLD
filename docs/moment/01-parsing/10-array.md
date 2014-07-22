---
title: Array
version: 1.0.0
signature: |
  frozenMoment(Number[]);
  frozenMoment.build(Number[]);
---


You can create a FrozenMoment with an array of numbers that mirror the parameters passed to [new Date()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)

```javascript
[year, month, day, hour, minute, second, millisecond]
frozenMoment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM
```

Any value past the year is optional, and will default to the lowest possible number.

```javascript
frozenMoment([2010]); // January 1st
frozenMoment([2010, 6]); // July 1st
frozenMoment([2010, 6, 10]); // July 10th
```

Construction with an array will create a date in the current timezone. To create a date from an array at UTC, use `frozenMoment.utc(Number[])`.

```javascript
frozenMoment.utc([2010, 1, 14, 15, 25, 50, 125]);
```

**Note:** Because this mirrors the native Date parameters, the following parameters are all zero indexed: months, hours, minutes, seconds, and milliseconds. Years and days of the month are 1 indexed.

This is often the cause of frustration, especially with months, so take note!

If the date represented by the array does not exist, `frozenMoment#isValid` will return false.

```javascript
frozenMoment([2010, 13]).isValid(); // false (not a real month)
frozenMoment([2010, 10, 31]).isValid(); // false (not a real day)
frozenMoment([2010, 1, 29]).isValid(); // false (not a leap year)
```

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
