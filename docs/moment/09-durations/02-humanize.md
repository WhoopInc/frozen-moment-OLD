---
title: Humanize
version: 1.6.0
signature: |
  frozenMoment.duration().humanize();
---


Sometimes, you want all the goodness of `frozenMoment#from` but you don't want to have to create two moments, you just want to display a length of time.

Enter `frozenMoment.duration().humanize()`.

```javascript
frozenMoment.duration(1, "minutes").humanize(); // a minute
frozenMoment.duration(2, "minutes").humanize(); // 2 minutes
frozenMoment.duration(24, "hours").humanize();  // a day
```

By default, the return string is suffixless. If you want a suffix, pass in true as seen below.

```javascript
frozenMoment.duration(1, "minutes").humanize(true); // in a minute
```

For suffixes before now, pass in a negative number.

```javascript
frozenMoment.duration(-1, "minutes").humanize(true); // a minute ago
```
