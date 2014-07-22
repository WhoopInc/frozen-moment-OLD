---
title: Quarter
version: 2.6.0
signature: |
  frozenMoment().quarter(Number);
---


Sets the quarter (1 to 4).

```javascript
frozenMoment('2013-01-01T00:00:00.000').quarter(2) // '2013-01-01T00:00:00.000'
frozenMoment('2013-02-05T05:06:07.000').quarter(2).format() // '2013-05-05T05:06:07-07:00'
```
