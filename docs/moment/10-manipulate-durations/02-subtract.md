---
title: Subtract Time
version: 2.1.0
signature: |
  frozenMoment.duration.build().subtract(Number, String);
  frozenMoment.duration.build().subtract(Number);
  frozenMoment.duration.build().subtract(Duration);
  frozenMoment.duration.build().subtract(Object);
---


Mutates the duration to be built by subtracting time.

```javascript
var a = frozenMoment.duration.build(3, 'd');
var b = frozenMoment.duration.build(2, 'd');
a.subtract(b).freeze().days();  // 1
```
