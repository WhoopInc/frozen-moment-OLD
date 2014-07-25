---
title: Absolute Value
version: 3.0.0
signature: |
  frozenMoment.duration.build().abs();
---


Mutates the duration to be built to be the absolute value of the currently
specified duration.  That is, builders that build negative durations will now
build positive durations of the same length, and all other builders will not
change.

```javascript
frozenMoment.duration.build(3, 'days').abs();   // 3 days
frozenMoment.duration.build(-3, 'days').abs();  // 3 days
```
