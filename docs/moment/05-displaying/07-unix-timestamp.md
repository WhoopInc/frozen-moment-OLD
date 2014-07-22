---
title: Unix Timestamp (seconds)
version: 1.6.0
signature: |
  frozenMoment().unix();
---


`frozenMoment#unix` outputs a Unix timestamp (the number of seconds since the Unix Epoch).

```javascript
frozenMoment(1318874398806).unix(); // 1318874398
```

This value is floored to the nearest second, and does not include a milliseconds component.
