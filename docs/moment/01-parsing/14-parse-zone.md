---
title: parseZone
version: 2.3.0
signature: |
  frozenMoment.build.parseZone(String)
---


FrozenMoment and MomentBuilder normally interprets input times as local times (or UTC times if `frozenMoment.utc()` is used). However, often the input string itself contains time zone information. `frozenMoment.build#parseZone` parses the time and then sets the zone according to the input string.

```javascript
frozenMoment.build.parseZone("2013-01-01T00:00:00-13:00").zone(); // 780
```

`frozenMoment.build.parseZone` is equivalent to parsing the string and using `frozenMoment.build#zone` to parse the zone.

```javascript
var s = "2013-01-01T00:00:00-13:00";
frozenMoment.build(s).zone(s);
```

**Note**: this method only works for a single string argument, not a string and format.
