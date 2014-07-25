---
title: Get Unit of Time
version: 2.1.0
signature: |
  frozenMoment.duration().get(String);
---


As an alternate to `Duration#x()` getters, you can use `Duration#get('x')`. All the [shorthand keys from](#/manipulating/add/) `frozenMoment.build#add` apply here as well.

```javascript
duration.get('hours');
duration.get('minutes');
duration.get('seconds');
duration.get('milliseconds');
```
