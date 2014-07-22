---
title: Unix Offset (milliseconds)
version: 1.0.0
signature: |
  frozenMoment().valueOf();
  +frozenMoment();
---


`frozenMoment#valueOf` simply outputs the number of milliseconds since the Unix Epoch, just like `Date#valueOf`.

```javascript
frozenMoment(1318874398806).valueOf(); // 1318874398806
+frozenMoment(1318874398806); // 1318874398806
```

To get a Unix timestamp (the number of seconds since the epoch) from a `FrozenMoment`, use `frozenMoment#unix`.
