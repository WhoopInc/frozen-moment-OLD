---
title: Timezone Offset
version: 1.2.0
signature: |
  frozenMoment.zone();
  frozenMoment.build().zone(Number|String);
---


Get the timezone offset in minutes.

```javascript
frozenMoment().zone(); // (60, 120, 240, etc.)
```

As of version **2.1.0**, it is possible to set the offset by passing in the number of minutes offset from GMT.

```javascript
frozenMoment.build().zone(120);
```

If the input is less than `16` and greater than `-16`, it will interpret your input as hours instead.

```javascript
// these are equivalent
frozenMoment.build().zone(480);
frozenMoment.build().zone(8);
```

It is also possible to set the zone from a string.

```javascript
frozenMoment.build().zone("-08:00");
```

`frozenMoment.build#zone` will search the string for the first match of `+00:00 +0000 -00:00 -0000`, so you can even pass an ISO8601 formatted string and the moment will be changed to that zone.

```javascript
frozenMoment.build().zone("2013-03-07T07:00:00-08:00");
```
