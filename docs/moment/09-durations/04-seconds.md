---
title: Seconds
version: 1.6.0
signature: |
  frozenMoment.duration().seconds();
  frozenMoment.duration().asSeconds();
---


To get the number of seconds in a duration, use `frozenMoment.duration().seconds()`.

It will return a number between 0 and 59.

```javascript
frozenMoment.duration(500).seconds(); // 0
frozenMoment.duration(1500).seconds(); // 1
frozenMoment.duration(15000).seconds(); // 15
```

If you want the length of the duration in seconds, use `frozenMoment.duration().asSeconds()` instead.

```javascript
frozenMoment.duration(500).asSeconds(); // 0.5
frozenMoment.duration(1500).asSeconds(); // 1.5
frozenMoment.duration(15000).asSeconds(); // 15
```
