---
title: Milliseconds
version: 1.6.0
signature: |
  frozenMoment.duration().milliseconds();
  frozenMoment.duration().asMilliseconds();
---


To get the number of milliseconds in a duration, use `frozenMoment.duration().milliseconds()`.

It will return a number between 0 and 999.

```javascript
frozenMoment.duration(500).milliseconds(); // 500
frozenMoment.duration(1500).milliseconds(); // 500
frozenMoment.duration(15000).milliseconds(); // 0
```

If you want the length of the duration in milliseconds, use `frozenMoment.duration().asMilliseconds()` instead.

```javascript
frozenMoment.duration(500).asMilliseconds(); // 500
frozenMoment.duration(1500).asMilliseconds(); // 1500
frozenMoment.duration(15000).asMilliseconds(); // 15000
```
