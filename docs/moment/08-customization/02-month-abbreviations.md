---
title: Month Abbreviations
version: 1.0.0
signature: |
  frozenMoment.lang('en', {
      monthsShort : String[]
  });
  frozenMoment.lang('en', {
      monthsShort : Function
  });
---


`Language#monthsShort` should be an array of the month abbreviations.

```javascript
frozenMoment.lang('en', {
    monthsShort : [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
});
```

Like `Language#months`, `Language#monthsShort` can be a callback function as well.

```javascript
frozenMoment.lang('en', {
    monthsShort : function (momentToFormat, format) {
        if (/^MMMM/.test(format)) {
            return nominative[momentToFormat.month()];
        } else {
            return subjective[momentToFormat.month()];
        }
    }
});
```
