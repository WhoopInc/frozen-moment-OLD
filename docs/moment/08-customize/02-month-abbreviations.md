---
title: Month Abbreviations
version: 1.0.0
signature: |
  frozenMoment.locale('en', {
      monthsShort : String[]
  });
  frozenMoment.locale('en', {
      monthsShort : Function
  });
---


`Locale#monthsShort` should normally be an array of month abbreviations.

```javascript
frozenMoment.locale('en', {
    monthsShort : [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
});
```

Like `Locale#months`, `Locale#monthsShort` can be a callback function.

```javascript
frozenMoment.locale('en', {
    monthsShort : function (momentToFormat, format) {
        if (/^MMMM/.test(format)) {
            return nominative[momentToFormat.month()];
        } else {
            return subjective[momentToFormat.month()];
        }
    }
});
```
