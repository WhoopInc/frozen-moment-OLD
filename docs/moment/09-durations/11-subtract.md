---
title: Subtract Time
version: 2.1.0
signature: |
  frozenMoment.duration().subtract(Number, String);
  frozenMoment.duration().subtract(Number);
  frozenMoment.duration().subtract(Duration);
  frozenMoment.duration().subtract(Object);
---


**Warning:** This mutator will move to a separate duration builder object prior to release.

Mutates the original duration by subtracting time.

```javascript
var a = frozenMoment.duration(3, 'd');
var b = frozenMoment.duration(2, 'd');
a.subtract(b).days(); // 1
```
