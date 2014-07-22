---
title: Weekday Abbreviations
version: 1.0.0
signature: |
  frozenMoment.lang('en', {
      weekdaysShort : String[]
  });
  frozenMoment.lang('en', {
      weekdaysShort : Function
  });
---


`Language#weekdaysShort` should be an array of the weekdays abbreviations.

```javascript
frozenMoment.lang('en', {
    weekdaysShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
});
```

`Language#weekdaysShort` can be a callback function as well.

```javascript
frozenMoment.lang('en', {
    weekdaysShort : function (momentToFormat, format) {
        return weekdaysShort[momentToFormat.day()];
    }
});
```
