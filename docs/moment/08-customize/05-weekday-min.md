---
title: Minimal Weekday Abbreviations
version: 1.7.0
signature: |
  frozenMoment.locale('en', {
      weekdaysMin : String[]
  });
  frozenMoment.locale('en', {
      weekdaysMin : Function
  });
---


`Locale#weekdaysMin` should normally be an array of two letter weekday abbreviations. These are used for things like calendar pickers, so they should be as small as possible.

```javascript
frozenMoment.locale('en', {
    weekdaysMin : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
});
```

`Locale#weekdaysMin` can also be a callback function.

```javascript
frozenMoment.locale('en', {
    weekdaysMin : function (momentToFormat, format) {
        return weekdaysMin[momentToFormat.day()];
    }
});
```
