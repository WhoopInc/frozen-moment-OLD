---
title: Long Date Formats
version: 1.1.0
signature: |
  frozenMoment.locale('en', {
      longDateFormat : Object
  });
---


If it is specified, `Locale#longDateFormat` must be an object containing a key/value pair for the long date formats: `L LL LLL LLLL LT`. `LT` should be the time format, and is also used for `frozenMoment#calendar`.

```javascript
frozenMoment.locale('en', {
    longDateFormat : {
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        l: "M/D/YYYY",
        LL: "MMMM Do YYYY",
        ll: "MMM D YYYY",
        LLL: "MMMM Do YYYY LT",
        lll: "MMM D YYYY LT",
        LLLL: "dddd, MMMM Do YYYY LT",
        llll: "ddd, MMM D YYYY LT"
    }
});
```

If you omit the lowercase `l` format strings, they will be created automatically by replacing any long tokens in the uppercase `L` format strings with their corresponding short tokens.

```javascript
frozenMoment.locale('en', {
    longDateFormat : {
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM Do YYYY",
        LLL: "MMMM Do YYYY LT",
        LLLL: "dddd, MMMM Do YYYY LT"
    }
});
```
