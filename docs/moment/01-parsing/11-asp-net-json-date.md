---
title: ASP.NET JSON Date
version: 1.3.0
signature: |
  frozenMoment(String);
  frozenMoment.build(String);
---


ASP.NET returns dates in JSON as `/Date(1198908717056)/` or `/Date(1198908717056-0700)/`

If a string that matches this format is passed in, it will be parsed correctly.

```javascript
frozenMoment("/Date(1198908717056-0700)/"); // December 28 2007 10:11 PM
```

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
