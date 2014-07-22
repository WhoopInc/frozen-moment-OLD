---
title: Is Leap Year
version: 1.0.0
signature: |
  frozenMoment().isLeapYear();
---


`frozenMoment#isLeapYear` returns `true` if that year is a leap year, and `false` if it is not.

```javascript
frozenMoment([2000]).isLeapYear() // true
frozenMoment([2001]).isLeapYear() // false
frozenMoment([2100]).isLeapYear() // false
```
