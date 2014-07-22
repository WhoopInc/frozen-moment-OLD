---
title: Add Time
version: 2.1.0
signature: |
  frozenMoment.duration().add(Number, String);
  frozenMoment.duration().add(Number);
  frozenMoment.duration().add(Duration);
  frozenMoment.duration().add(Object);
---


**Warning:** This mutator will move to a separate duration builder object prior to release.

Mutates the original duration by adding time.

```javascript
var a = frozenMoment.duration(1, 'd');
var b = frozenMoment.duration(2, 'd');
a.add(b).days(); // 3
```
