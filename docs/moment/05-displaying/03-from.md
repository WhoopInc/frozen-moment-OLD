---
title: Time from X
version: 1.0.0
signature: |
  frozenMoment().from(FrozenMoment|String|Number|Date|Array);
  frozenMoment().from(FrozenMoment|String|Number|Date|Array, Boolean);
---


You may want to display a moment in relation to a time other than now. In that case, you can use `frozenMoment#from`.

```javascript
var a = frozenMoment([2007, 0, 29]);
var b = frozenMoment([2007, 0, 28]);
a.from(b) // "a day ago"
```

The first parameter is anything you can pass to `frozenMoment()` or an actual `FrozenMoment`.

```javascript
var a = frozenMoment([2007, 0, 29]);
var b = frozenMoment([2007, 0, 28]);
a.from(b);                     // "a day ago"
a.from([2007, 0, 28]);         // "a day ago"
a.from(new Date(2007, 0, 28)); // "a day ago"
a.from("1-28-2007");           // "a day ago"
```

Like `frozenMoment#fromNow`, passing `true` as the second parameter returns value without the suffix. This is useful wherever you need to have a human readable length of time.

```javascript
var start = frozenMoment([2007, 0, 5]);
var end = frozenMoment([2007, 0, 10]);
start.from(end);       // "in 5 days"
start.from(end, true); // "5 days"
```
