---
title: Special Formats
version: 2.7.0
signature: |
  frozenMoment(String, frozenMoment.CUSTOM_FORMAT, [String], [Boolean]);
  frozenMoment.build(String, frozenMoment.CUSTOM_FORMAT, [String], [Boolean]);
  frozenMoment(String, [..., frozenMoment.ISO_8601, ...], [String], [Boolean]);
  frozenMoment.build(String, [..., frozenMoment.ISO_8601, ...], [String], [Boolean]);
---

[ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) is a standard for time and duration display. FrozenMoment already supports parsing iso-8601 strings, but this can be specified explicitly in the format/list of formats when constructing a frozenMoment.

To specify iso-8601 parsing use `frozenMoment.ISO_8601` constant. More formats will be added in the future.

Examples:

```javascript
frozenMoment("2010-01-01T05:06:07", frozenMoment.ISO_8601);
frozenMoment("2010-01-01T05:06:07", ["YYYY", frozenMoment.ISO_8601]);
```

This syntax can also be invoked as `frozenMoment.build()` to create a builder object instead of a frozenMoment object.  See `frozenMoment#thaw` for more information about builder objects.
