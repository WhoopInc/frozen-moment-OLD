---
title: Is a FrozenMoment
version: 1.5.0
signature: |
  frozenMoment.isMoment(obj);
---


To check if a variable is a moment object, use `frozenMoment.isMoment()`.

```javascript
frozenMoment.isMoment() // false
frozenMoment.isMoment(new Date()) // false
frozenMoment.isMoment(frozenMoment()) // true
```
