---
title: Add Time
version: 2.1.0
signature: |
  frozenMoment.duration.build().add(Number, String);
  frozenMoment.duration.build().add(Number);
  frozenMoment.duration.build().add(Duration);
  frozenMoment.duration.build().add(Object);
---


Mutates the duration to be built by adding time.

```javascript
var a = frozenMoment.duration.build(1, 'd');
var b = frozenMoment.duration.build(2, 'd');
a.add(b).freeze().days();  // 3
```
