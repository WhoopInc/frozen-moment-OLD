---
title: Quarter
version: 2.6.0
signature: |
  frozenMoment().quarter(); // Number
---


Gets the quarter (1 to 4).

```javascript
frozenMoment('2013-01-01T00:00:00.000').quarter() // 1
frozenMoment('2013-04-01T00:00:00.000').subtract(1, 'ms').quarter() // 1
frozenMoment('2013-04-01T00:00:00.000').quarter() // 2
frozenMoment('2013-07-01T00:00:00.000').subtract(1, 'ms').quarter() // 2
frozenMoment('2013-07-01T00:00:00.000').quarter() // 3
frozenMoment('2013-10-01T00:00:00.000').subtract(1, 'ms').quarter() // 3
frozenMoment('2013-10-01T00:00:00.000').quarter() // 4
frozenMoment('2014-01-01T00:00:00.000').subtract(1, 'ms').quarter() // 4
```
