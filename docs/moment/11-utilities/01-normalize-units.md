---
title: Normalize Units
version: 2.3.0
signature: |
  frozenMoment.normalizeUnits(String);
---


Many of FrozenMoment's functions allow the caller to pass in aliases for unit enums. For example, all of the `get`s below are equivalent.

```javascript
var m = frozenMoment();
m.get('y');
m.get('year');
m.get('years');
```

If you're extending the library, you may want access to FrozenMoment's facilities for that in order to better align your functionality with FrozenMoment's.

```javascript
frozenMoment.normalizeUnits('y');      // 'year'
frozenMoment.normalizeUnits('Y');      // 'year'
frozenMoment.normalizeUnits('year');   // 'year'
frozenMoment.normalizeUnits('years');  // 'year'
frozenMoment.normalizeUnits('YeARS');  // 'year'
```
