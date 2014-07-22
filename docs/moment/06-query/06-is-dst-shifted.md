---
title: Is DST Shifted
version: 2.3.0
signature: |
  frozenMoment('2013-03-10 2:30', 'YYYY-MM-DD HH:mm').isDSTShifted()
---


Another important piece of validation is to know if the date has been moved by a DST. For example, in most of the United States:

```javascript
frozenMoment('2013-03-10 2:30', 'YYYY-MM-DD HH:mm').format(); //=> '2013-03-10T01:30:00-05:00'
```

This is because daylight savings time shifts the time from 2:00 to 3:00, so 2:30 isn't a real time. The resulting time is browser-dependent, either adjusting the time forward or backwards. Use `frozenMoment#isDSTShifted` to test for this condition.

**Note:** before 2.3.0, FrozenMoment objects in this condition always returned `false` for `frozenMoment#isValid`; they now return `true`.
