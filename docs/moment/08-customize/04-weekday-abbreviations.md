---
title: Weekday Abbreviations
version: 1.0.0
signature: |
  frozenMoment.locale('en', {
      weekdaysShort : String[]
  });
  frozenMoment.locale('en', {
      weekdaysShort : Function
  });
---


`Locale#weekdaysShort` should normally be an array of weekday abbreviations.

```javascript
frozenMoment.locale('en', {
    weekdaysShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
});
```

`Locale#weekdaysShort` can also be a callback function.

```javascript
frozenMoment.locale('en', {
    weekdaysShort : function (momentToFormat, format) {
        return weekdaysShort[momentToFormat.day()];
    }
});
```
