---
title: Is Daylight Saving Time
version: 1.2.0
signature: |
  frozenMoment().isDST();
---


`frozenMoment#isDST` checks if the current moment is in daylight savings time.

```javascript
frozenMoment([2011, 2, 12]).isDST(); // false, March 12 2011 is not DST
frozenMoment([2011, 2, 14]).isDST(); // true, March 14 2011 is DST
```
