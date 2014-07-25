---
title: Set and Manipulate Durations
---


Duration objects can be thawed into builder objects.  These builders support basic manipulations on the specified duration, and can be frozen back into duration objects for formatting and queries.

```javascript
var a = frozenMoment.duration(2, "hours").thaw();
a.add(30, "minutes");
a.freeze().humanize();  // 2 hours, 30 minutes
```

If you don't already have an appropriate Duration, it's more efficient to create a duration builder directly:

```javascript
var b = frozenMoment.duration.build(2, "hours");
b.add(30, "minutes");
b.freeze().humanize();  // 2 hours, 30 minutes
```
